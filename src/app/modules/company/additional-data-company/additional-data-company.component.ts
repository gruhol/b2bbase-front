import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CompanyServiceService } from '../company-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyToEditDto } from '../add-company/dto/CompanyToEditDto';
import { AdditionalData } from '../add-company/dto/AdditionalData';
import { CategoryService } from '../category-service.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { CategoryResponse } from './dto/CategoryResponse';
import { map } from 'rxjs';

interface VehicleNode {
  name: string;
  id?: number;
  children?: VehicleNode[];
  selected?: boolean;
  indeterminate?: boolean;
  parent?: VehicleNode | null | undefined;
}

const TREE_DATA: VehicleNode[] = [
  {
    name: 'Infiniti',
    indeterminate: false,
    selected: false,
    children: [
      {
        name: 'G50',
        selected: false,
        indeterminate: false,
        children: [
          { name: 'Pure AWD', id: 1, indeterminate: false, selected: false },
          { name: 'Luxe', id: 2, indeterminate: false, selected: false },
        ],
      },
      {
        name: 'QX50',
        selected: false,
        indeterminate: false,
        children: [
          { name: 'Pure AWD', id: 3, indeterminate: false, selected: false },
          { name: 'Luxe', id: 4, indeterminate: false, selected: false },
        ],
      },
    ],
  },
  {
    name: 'BMW',
    selected: false,
    indeterminate: false,
    children: [
      {
        name: '2 Series',
        selected: false,
        children: [
          { name: 'Coupé', id: 5, indeterminate: false, selected: false },
          { name: 'Gran Coupé', id: 6, indeterminate: false, selected: false },
        ],
      },
      {
        name: '3 Series',
        selected: false,
        indeterminate: false,
        children: [
          { name: 'Sedan', id: 7, indeterminate: false, selected: false },
          { name: 'PHEV', id: 8, indeterminate: false, selected: false },
        ],
      },
    ],
  },
];

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

  public treeControl = new NestedTreeControl<VehicleNode>((node) => node.children);
  public dataSource = new MatTreeNestedDataSource<VehicleNode>();
  public dataSource2 = new MatTreeNestedDataSource<VehicleNode>();
  public searchString = '';
  public showOnlySelected = false;

  ngOnInit(): void {
    this.createRegistrationFormControls();
    this.getCompany();
    this.createForm();
  }

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyServiceService,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService
  ) {

    this.categoryService.getCategory()
      .pipe(map(node => this.mapCategoryResponsesToVehicleNodes(node)))
      .subscribe(data => {
        this.dataSource.data = data;
        for(let i = 0; i < this.dataSource.data.length; i++) {
          this.setParent(this.dataSource.data[i], null);
        }
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

    console.log(this.dataSource.data);
    console.log(this.dataSource2.data);

    let result = this.dataSource.data.reduce(
      (acc: string[], node: VehicleNode) =>
        acc.concat(
          this.treeControl
            .getDescendants(node)
            .filter(
              (node) =>
                (node.children == null || node.children.length === 0) &&
                node.selected &&
                !this.hideLeafNode(node)
            )
            .map((descendant) => descendant.name)
        ),
      [] as string[]
    );

    //console.log(result);

    if(this.editDescriptionForm.valid) {
      this.companyService.editAdditionalData({
        description: this.description.value,
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

  private mapCategoryResponsesToVehicleNodes(categoryResponses: CategoryResponse[]): VehicleNode[] {
    return categoryResponses.map(categoryResponse => {
      //var indeterminateaaa = (categoryResponse.children) ? categoryResponse.children.some(child => child.selected) : false;

      var vehicleNode: VehicleNode = {
        name: categoryResponse.name,
        id: categoryResponse.id,
        children: (categoryResponse.children) ? this.mapCategoryResponsesToVehicleNodes(categoryResponse.children): [],
      };
      return vehicleNode;
    });
  }

  public hasChild = (_: number, node: VehicleNode) =>
    !!node.children && node.children.length > 0;

  private setParent(node: VehicleNode, parent: VehicleNode | null) {
    node.parent = parent;
    if (node.children) {
      node.children.forEach((childNode) => {
        this.setParent(childNode, node);
      });
    }
  }

  private checkAllParents(node: VehicleNode) {
    if (node.parent) {
      const descendants = this.treeControl.getDescendants(node.parent);
      node.parent.selected = descendants.every((child) => child.selected);
      node.parent.indeterminate = descendants.some((child) => child.selected);
      this.checkAllParents(node.parent);
    }
  }

  itemToggle(checked: boolean, node: VehicleNode) {
    node.selected = checked;
    if (node.children) {
      node.children.forEach((child) => {
        this.itemToggle(checked, child);
      });
    }
    this.checkAllParents(node);
  }

  public hideLeafNode(node: VehicleNode): boolean {
    return this.showOnlySelected && !node.selected
      ? true
      : new RegExp(this.searchString, 'i').test(node.name) === false;
  }

  public hideParentNode(node: VehicleNode): boolean {
    return this.treeControl
      .getDescendants(node)
      .filter((node) => node.children == null || node.children.length === 0)
      .every((node) => this.hideLeafNode(node));
  }
}
