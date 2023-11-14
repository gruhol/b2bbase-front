import { Component, OnInit } from '@angular/core';
import { CompanyCatalog } from '../dto/CompanyCatalog';
import { CatalogServiceService } from '../catalog-service.service';
import { Page } from '../../common/model/page';
import { PageEvent } from '@angular/material/paginator';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface CompanyNode {
  name: string;
  children?: CompanyNode[];
}

const TREE_DATA: CompanyNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'}, 
      {name: 'Banana'}, 
      {name: 'Fruit loops'}
    ],
  },
  {
    name: 'Vegetables',
    children: [
      {name: 'Green',},
      {name: 'Orange'},
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

  constructor(private companyCatalogService: CatalogServiceService) { 
    this.dataSource.data = TREE_DATA;
  }
  
  ngOnInit(): void {
    this.getCompanies()
    this.voivodeship = this.createVoivodeshipList();
  }

  getCompanies() {
    this.getCompanyPage(0, 5);

    
  }

  private getCompanyPage(page: number, size: number) {
    this.companyCatalogService.getCompany(page, size).subscribe(page => this.page = page);
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

  private _transformer = (node: CompanyNode, level: number) => {
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
