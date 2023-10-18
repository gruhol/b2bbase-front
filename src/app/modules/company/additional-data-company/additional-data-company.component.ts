import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CompanyServiceService } from '../company-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyToEditDto } from '../add-company/dto/CompanyToEditDto';
import { AdditionalData } from '../add-company/dto/AdditionalData';
import { CategoryService } from '../category-service.service';
import { map } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { CategoryResponse } from './dto/CategoryResponse';

interface CategoryNode {
  name: string;
  id?: number;
  children?: CategoryNode[];
  selected?: boolean;
  indeterminate?: boolean;
  parent?: CategoryNode;
}
@Component({
  selector: 'app-additional-data-company',
  templateUrl: './additional-data-company.component.html',
  styleUrls: ['./additional-data-company.component.scss']
})
export class AdditionalDataCompanyComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '200px',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarHiddenButtons: [
      [
        'subscript',
        'superscript',
        'heading',
        'fontName'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'insertImage',
        'insertVideo',
      ]
    ]
  }
  
  description!: FormControl;
  editDescriptionForm!: FormGroup;
  validationErrors = new Map<string, String>();
  errorMessage!: string;

  public treeControl = new NestedTreeControl<CategoryNode>(
    (node) => node.children || []
  );
  public dataSource = new MatTreeNestedDataSource<CategoryNode>();
  public searchString = '';
  public showOnlySelected = false;
  result!: number[];

  ngOnInit(): void {
    this.createRegistrationFormControls();
    this.getCompany();
    this.createForm();
  }

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyServiceService,
    private snackBar: MatSnackBar,
    private http: CategoryService
  ) {
    this.http.getCategory()
    .pipe(map((categoryResponses: CategoryResponse[]) => {
        return this.mapCategoryResponsesToVehicleNodes(categoryResponses);
      }))
    .subscribe((dd: CategoryNode[]) =>this.dataSource.data = dd)

    this.dataSource.data.forEach(node => {
      this.setParent(node, null);
    });
  }

  createRegistrationFormControls() {
    this.description = new FormControl('');
  }


  getCompany() {
    this.companyService.getCompany()
      .subscribe(product => this.mapFormValues(product)
      );
  }

  editAdditionalData() {
    if(this.editDescriptionForm.valid) {

      this.result = this.dataSource.data.reduce(
        (acc: number[], node: CategoryNode) =>
          acc.concat(
            this.treeControl
              .getDescendants(node)
              .filter(
                (node) =>
                  (!node.children || node.children.length === 0) &&
                  node.selected &&
                  !this.hideLeafNode(node)
              )
              .map((descendant) => descendant.id || 0)
          ),
        [] as number[]
      );

      this.companyService.editAdditionalData({
        description: this.description.value,
        category: this.result
      } as AdditionalData)
      .subscribe({
        next: response => {
          if (response) {
            
            this.editDescriptionForm.setValue({
              description: response.description,
            });

            this.snackBar.open("Opis został zaktualizowany", '', { duration: 3000 });
          }
        },
        error: err => {
          if (typeof(err.error.fields) === 'object') {
            for (const errorfield of Object.keys(err.error.fields)) {
              this.validationErrors.set(errorfield, err.error.fields[errorfield]);
            }
          } else if( typeof(err.error.message) === 'string') {
            this.errorMessage = err.error.message;
          }
        }
      });
    }
  }

  createForm() {
    this.editDescriptionForm = this.formBuilder.group({
      description: this.description,
    })
  }

  private mapFormValues(company: CompanyToEditDto): void {
    this.editDescriptionForm.setValue({
      description: company.description,
    });
  }

  public hasChild = (_: number, node: CategoryNode) =>
    !!(node.children && node.children.length > 0);

  private setParent(node: CategoryNode, parent: CategoryNode | null) {
    node.parent = parent!;
    if (node.children) {
      node.children.forEach((childNode) => {
        this.setParent(childNode, node);
      });
    }
  }

  private checkAllParents(node: CategoryNode) {
    if (node.parent) {
      const descendants = this.treeControl.getDescendants(node.parent);
      node.parent.selected = descendants.every((child) => child.selected);
      node.parent.indeterminate = descendants.some((child) => child.selected);
      this.checkAllParents(node.parent);
    }
  }

  public itemToggle(checked: boolean, node: CategoryNode) {
    node.selected = checked;
    if (node.children) {
      node.children.forEach((child) => {
        this.itemToggle(checked, child);
      });
    }
    this.checkAllParents(node);
  }

  public hideLeafNode(node: CategoryNode): boolean {
    return this.showOnlySelected && !node.selected
      ? true
      : !new RegExp(this.searchString, 'i').test(node.name);
  }

  public hideParentNode(node: CategoryNode): boolean {
    return this.treeControl
      .getDescendants(node)
      .filter((node) => !node.children || node.children.length === 0)
      .every((node) => this.hideLeafNode(node));
  }

  private mapCategoryResponsesToVehicleNodes(categoryResponses: CategoryResponse[]): CategoryNode[] {
    return categoryResponses.map(categoryResponse => {
      const vehicleNode: CategoryNode = {
        name: categoryResponse.name,
        id: categoryResponse.id,
        children: this.mapCategoryResponsesToVehicleNodes(categoryResponse.children || [])
      };
      return vehicleNode;
    });
  }

}
