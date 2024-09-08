import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Page } from '../../common/model/page';
import { CatalogService } from '../catalog-service';
import { CategoryCatalog } from '../dto/CategoryCatalog';
import { CompanyCatalog } from '../dto/CompanyCatalog';
import { CategoryExtended } from '../dto/CategoryExtended';

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
  selector: 'app-category-catalog',
  templateUrl: './category-catalog.component.html',
  styleUrl: './category-catalog.component.scss'
})
export class CategoryCatalogComponent {
  treeControl = new NestedTreeControl<CategoryNode>((node) => node.children);
  categoryDataSource = new MatTreeNestedDataSource<CategoryNode>();
  searchString = '';
  showOnlySelected = false;
  page?: Page<CompanyCatalog>;
  voivodeship!: Map<string, string>;
  voivodeshipCheckedList: string[] = [];
  isEdiCooperation: boolean | undefined;
  isApiCooperation: boolean | undefined;
  isProductFileCooperation: boolean | undefined;
  selectCategory: number[] = [];
  slug: string | undefined;
  category: CategoryExtended | undefined;
  PAGE_404: string = "/404";

  constructor(
    private catalogService: CatalogService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.catalogService.getCategory()
      .pipe(map(node => this.mapCategoryResponsesToCategoryNode(node)))
      .subscribe(data => {
        this.categoryDataSource.data = data;
        for(let i = 0; i < this.categoryDataSource.data.length; i++) {
          this.setParent(this.categoryDataSource.data[i], null);
        }
      });
  }

  ngOnInit(): void {
    this.slug = this.activatedRouter.snapshot.params['slug'];
    console.log(this.slug)
    this.getCompanies()
    this.voivodeship = this.createVoivodeshipList();
  }

  getCompanies() {
    this.getCompanyPage(this.slug, 0, 10);    
  }

  private getCompanyPage(slug: string | undefined, page: number, size: number) {
    this.catalogService.getCompaniesWithSlug(slug, page, size, this.voivodeshipCheckedList)
    .subscribe(result => {
      this.page = result.listCompany
      if (result.categoryExtended === undefined) {
        this.router.navigate([this.PAGE_404, {url: this.slug}]);
      } else {
        this.category = result.categoryExtended;
      }
    });
  }

  onPageEvent(event: PageEvent) {
    this.getCompanyPage(this.slug, event.pageIndex, event.pageSize);
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

  filter() {
    this.selectCategory = this.categoryDataSource.data.reduce(
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

    this.catalogService.getCompanies(0, 10, this.selectCategory, this.voivodeshipCheckedList, this.isEdiCooperation, this.isApiCooperation, this.isProductFileCooperation)
      .subscribe(page => this.page = page);
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
    if (fieldName === 'isEdiCooperation' && event.checked) { 
      this.isEdiCooperation = event.checked;
    } else {
      this.isEdiCooperation = undefined;
    }
    if (fieldName === 'isApiCooperation' && event.checked) {
      this.isApiCooperation = event.checked;
    } else {
      this.isApiCooperation = undefined;
    }
    if (fieldName === 'isProductFileCooperation' && event.checked) {
      this.isProductFileCooperation = event.checked;
    } else { 
      this.isProductFileCooperation = undefined;
    }
  }
}
