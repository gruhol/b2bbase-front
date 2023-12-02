import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { CategoryService } from '../../company/category-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { Page } from '../../common/model/page';
import { CompanyCatalog } from '../dto/CompanyCatalog';
import { PageEvent } from '@angular/material/paginator';
import { CatalogService } from '../catalog-service';
import { CategoryCatalog } from '../dto/CategoryCatalog';
import { MatCheckboxChange } from '@angular/material/checkbox';

interface CategoryNode {
  name: string;
  id: number;
  slug: string;
  children?: CategoryNode[];
  selected?: boolean;
  indeterminate?: boolean;
  parent?: CategoryNode | null | undefined;
}

@Component({
  selector: 'app-company-catalog2',
  templateUrl: './company-catalog2.component.html',
  styleUrls: ['./company-catalog2.component.scss']
})
export class CompanyCatalog2Component {

  public treeControl = new NestedTreeControl<CategoryNode>((node) => node.children);
  public categoryDataSource = new MatTreeNestedDataSource<CategoryNode>();
  public searchString = '';
  public showOnlySelected = false;
  page!: Page<CompanyCatalog>;
  voivodeship!: Map<string, string>;
  voivodeshipCheckedList: string[] = [];
  public isEdiCooperation: boolean | undefined;
  public isApiCooperation: boolean | undefined;
  public isProductFileCooperation: boolean | undefined;

  constructor(
    private snackBar: MatSnackBar,
    private categoryService: CategoryService,
    private catalogService: CatalogService
  ) {
    this.catalogService.getCategory2()
      .pipe(map(node => this.mapCategoryResponsesToCategoryNode(node)))
      .subscribe(data => {
        this.categoryDataSource.data = data;
        for(let i = 0; i < this.categoryDataSource.data.length; i++) {
          this.setParent(this.categoryDataSource.data[i], null);
        }
      });
  }

  ngOnInit(): void {
    this.getCompanies()
    this.voivodeship = this.createVoivodeshipList();
  }

  getCompanies() {
    this.getCompanyPage(0, 5);    
  }

  private getCompanyPage(page: number, size: number) {
    this.catalogService.getCompany(page, size).subscribe(page => this.page = page);
  }

  onPageEvent(event: PageEvent) {
    this.getCompanyPage(event.pageIndex, event.pageSize);
  }

  createVoivodeshipList(): Map<string, string> {
    let voivodeshipMap = new Map<string, string>();
    voivodeshipMap.set("dolnoslaskie","dolnośląskie"),
    voivodeshipMap.set("kujawsko-pomorskie", "kujawsko-pomorskie"),
    voivodeshipMap.set("lubelskie", "lubelskie"),
    voivodeshipMap.set("lubuskie", "lubuskie"),
    voivodeshipMap.set("lodzkie", "łódzkie"),
    voivodeshipMap.set("malopolskie", "małopolskie"),
    voivodeshipMap.set("mazowieckie", "mazowieckie"),
    voivodeshipMap.set("opolskie", "opolskie"),
    voivodeshipMap.set("podkarpackie", "podkarpackie"),
    voivodeshipMap.set("podlaskie", "podlaskie"),
    voivodeshipMap.set("pomorskie", "pomorskie"),
    voivodeshipMap.set("slaskie", "śląskie"),
    voivodeshipMap.set("swietokrzyskie", "świętokrzyskie"),
    voivodeshipMap.set("warminsko-mazurskie", "warmińsko-mazurskie"),
    voivodeshipMap.set("wielkopolskie", "wielkopolskie"),
    voivodeshipMap.set("zachodniopomorskie", "zachodniopomorskie");
    return voivodeshipMap;
  }

  private mapCategoryResponsesToCategoryNode(category: CategoryCatalog[]): CategoryNode[] {
    return category.map(cat => {

      var category: CategoryNode = {
        name: cat.name,
        slug: cat.slug,
        id: cat.id,
        children: (cat.children) ? this.mapCategoryResponsesToCategoryNode(cat.children): [],
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

  tescik() {
    console.log(this.categoryDataSource);
    console.log(this.voivodeshipCheckedList);
    let selectCategory = this.categoryDataSource.data.reduce(
      (acc: number[], node: CategoryNode) =>
        acc.concat(
          this.treeControl
            .getDescendants(node)
            .filter(
              (node) =>
                (node.children == null || node.children.length === 0) &&
                node.selected &&
                !this.hideLeafNode(node)
            )
            .map((descendant) => descendant.id || 0)
        ),
      [] as number[]
    );
    console.log(selectCategory);
    console.log("Edi: " + this.isEdiCooperation);
    console.log("Api: " + this.isApiCooperation);
    console.log("File: " + this.isProductFileCooperation);
  }

  toggleVoivodeship(key: string, isChecked: boolean) {
    if (isChecked) {
      this.voivodeshipCheckedList.push(key);
    } else {
      const index = this.voivodeshipCheckedList.indexOf(key);
      if (index !== -1) {
        this.voivodeshipCheckedList.splice(index, 1);
      }
    }
  }

  toggleCooperation(fieldName: string, event: any) {
    if (fieldName === 'isEdiCooperation') this.isEdiCooperation = event.checked;
    if (fieldName === 'isApiCooperation') this.isApiCooperation = event.checked;
    if (fieldName === 'isProductFileCooperation') this.isProductFileCooperation = event.checked;
  }

}
