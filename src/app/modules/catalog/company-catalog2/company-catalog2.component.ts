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

interface CategoryNode {
  name: string;
  id?: number;
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

  constructor(
    private snackBar: MatSnackBar,
    private categoryService: CategoryService,
    private catalogService: CatalogService
  ) {
    this.catalogService.getCategory2()
      .pipe(map(node => this.mapCategoryResponsesToVehicleNodes(node)))
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
    voivodeshipMap.set("DS","dolnośląskie"),
    voivodeshipMap.set("KP", "kujawsko-pomorskie"),
    voivodeshipMap.set("LU", "lubelskie"),
    voivodeshipMap.set("LB", "lubuskie"),
    voivodeshipMap.set("LD", "łódzkie"),
    voivodeshipMap.set("MA", "małopolskie"),
    voivodeshipMap.set("MZ", "mazowieckie"),
    voivodeshipMap.set("OP", "opolskie"),
    voivodeshipMap.set("PK", "podkarpackie"),
    voivodeshipMap.set("PD", "podlaskie"),
    voivodeshipMap.set("PM", "pomorskie"),
    voivodeshipMap.set("SL", "śląskie"),
    voivodeshipMap.set("SK", "świętokrzyskie"),
    voivodeshipMap.set("WN", "warmińsko-mazurskie"),
    voivodeshipMap.set("WP", "wielkopolskie"),
    voivodeshipMap.set("ZP", "zachodniopomorskie");
    return voivodeshipMap;
  }

  private mapCategoryResponsesToVehicleNodes(category: CategoryCatalog[]): CategoryNode[] {
    return category.map(cat => {

      var category: CategoryNode = {
        name: cat.name,
        slug: cat.slug,
        id: cat.id,
        children: (cat.children) ? this.mapCategoryResponsesToVehicleNodes(cat.children): [],
        //selected: categoryResponse.selected,
        //indeterminate: (categoryResponse.children) ? categoryResponse.children.some(child => child.selected) : false
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
