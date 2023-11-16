import { AfterContentInit, Component, OnInit } from '@angular/core';
import { CompanyCatalog } from '../dto/CompanyCatalog';
import { CatalogService } from '../catalog-service';
import { Page } from '../../common/model/page';
import { PageEvent } from '@angular/material/paginator';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CategoryToCatalog } from '../dto/categoryToCatalog';

interface CompanyNode {
  name: string;
  slug: string;
  children?: CompanyNode[];
}

const TREE_DATA: CompanyNode[] = [
  {
    name: 'Fruit',
    slug: 'fruit',
    children: [
      {name: 'Apple', slug: 'apple'}, 
      {name: 'Banana', slug: 'banana'}, 
      {name: 'Fruit loops', slug: 'fruit-loops'}
    ],
  },
  {
    name: 'Vegetables', slug: 'vegetables',
    children: [
      {name: 'Green', slug: 'green'},
      {name: 'Orange', slug: 'orange'},
    ],
  },
];

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-company-catalog',
  templateUrl: './company-catalog.component.html',
  styleUrls: ['./company-catalog.component.scss']
})
export class CompanyCatalogComponent implements OnInit {

  voivodeship!: Map<string, string>;
  page!: Page<CompanyCatalog>;

  constructor(private catalogService: CatalogService) { 
    this.dataSource.data = TREE_DATA;
    console.log(this.dataSource.data)
    this.catalogService.getCategory().subscribe(cat => this.dataSource.data = cat)
    console.log(this.dataSource.data)
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

  private _transformer = (node: CategoryToCatalog, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);



  hasChild = (_: number, node: FlatNode) => node.expandable;

}
