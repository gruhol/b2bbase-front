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
import { ImageService } from '../image-service.service';

interface CategoryNode {
  name: string;
  id?: number;
  children?: CategoryNode[];
  selected?: boolean;
  indeterminate?: boolean;
  parent?: CategoryNode | null | undefined;
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
  imageForm!: FormGroup;
  editDescriptionForm!: FormGroup;
  validationErrors = new Map<string, String>();
  errorMessage!: string;
  requiredFileTypes = "image/jpeg, image/png";
  logo: string | null = null;

  public treeControl = new NestedTreeControl<CategoryNode>((node) => node.children);
  public categoryDataSource = new MatTreeNestedDataSource<CategoryNode>();
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
    private categoryService: CategoryService,
    private imageService: ImageService
  ) {

    this.categoryService.getCategory()
      .pipe(map(node => this.mapCategoryResponsesToVehicleNodes(node)))
      .subscribe(data => {
        this.categoryDataSource.data = data;
        for(let i = 0; i < this.categoryDataSource.data.length; i++) {
          this.setParent(this.categoryDataSource.data[i], null);
        }
      });
  }

  createRegistrationFormControls() {
    this.description = new FormControl('');
  }

  getCompany() {
    this.companyService.getCompany()
      .subscribe(product => {
        this.mapFormValues(product);
        this.logo = product.logo;
      });
  }

  editAdditionalData() {

    let allselectCategory = this.categoryDataSource.data.reduce(
      (acc: number[], node: CategoryNode) => {
        const selectedDescendants = this.treeControl
          .getDescendants(node)
          .filter(
            (node) =>
              (node.children == null || node.children.length === 0) &&
              node.selected &&
              !this.hideLeafNode(node)
          );
        const categoryIds = selectedDescendants.map((descendant) => descendant.id || 0);
        const parentIds = selectedDescendants.map((descendant) => descendant.parent?.id || 0);
        return acc.concat(categoryIds, parentIds);
      },
      [] as number[]
    );
    let uniqueAllSelectCategory = Array.from(new Set(allselectCategory));


    if(this.editDescriptionForm.valid) {
      this.companyService.editAdditionalData({
        description: this.description.value,
        categories: uniqueAllSelectCategory,
        logo: this.logo
      } as AdditionalData)
      .subscribe({
        next: response => {
          if (response) {
            
            this.editDescriptionForm.setValue({
              description: response.description,
            });

            this.snackBar.open("Dane zostały zaktualizowane", '', { duration: 3000 });
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

    this.imageForm = this.formBuilder.group({
      file: ['']
    })
  }

  uploadFile() {
    let formData = new FormData();
    formData.append('file', this.imageForm.get('file')?.value);
    this.imageService.uploadImage(formData)
    .subscribe(result => this.logo = result.filename)
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imageForm.patchValue({
        file: event.target.files[0]
      })
    }
  }

  private mapFormValues(company: CompanyToEditDto): void {
    this.editDescriptionForm.setValue({
      description: company.description,
    });

    this.logo = company.logo;
  }

  private mapCategoryResponsesToVehicleNodes(categoryResponses: CategoryResponse[]): CategoryNode[] {
    return categoryResponses.map(categoryResponse => {

      var category: CategoryNode = {
        name: categoryResponse.name,
        id: categoryResponse.id,
        children: (categoryResponse.children) ? this.mapCategoryResponsesToVehicleNodes(categoryResponse.children): [],
        selected: categoryResponse.selected,
        indeterminate: (categoryResponse.children) ? categoryResponse.children.some(child => child.selected) : false
      };
      return category;
    });
  }

  public hasChild = (_: number, node: CategoryNode) =>
    !!node.children && node.children.length > 0;

  private setParent(node: CategoryNode, parent: CategoryNode | null) {
    node.parent = parent;
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

  itemToggle(checked: boolean, node: CategoryNode) {
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
      : new RegExp(this.searchString, 'i').test(node.name) === false;
  }

  public hideParentNode(node: CategoryNode): boolean {
    return this.treeControl
      .getDescendants(node)
      .filter((node) => node.children == null || node.children.length === 0)
      .every((node) => this.hideLeafNode(node));
  }
}
