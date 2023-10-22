import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

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
    children: [
      {
        name: 'G50',
        children: [
          { name: 'Pure AWD', id: 1 },
          { name: 'Luxe', id: 2 },
        ],
      },
      {
        name: 'QX50',
        children: [
          { name: 'Pure AWD', id: 3 },
          { name: 'Luxe', id: 4 },
        ],
      },
    ],
  },
  {
    name: 'BMW',
    children: [
      {
        name: '2 Series',
        children: [
          { name: 'Coupé', id: 5 },
          { name: 'Gran Coupé', id: 6 },
        ],
      },
      {
        name: '3 Series',
        children: [
          { name: 'Sedan', id: 7 },
          { name: 'PHEV', id: 8 },
        ],
      },
    ],
  },
];

@Component({
  selector: 'tree-nested-overview-example',
  templateUrl: 'test-tree.component.html',
  styleUrls: ['test-tree.component.scss'],
})
export class TestTreeComponent {
  public treeControl = new NestedTreeControl<VehicleNode>(
    (node) => node.children
  );
  public dataSource = new MatTreeNestedDataSource<VehicleNode>();
  public searchString = '';
  public showOnlySelected = false;

  constructor() {
    this.dataSource.data = TREE_DATA;
    console.log(this.dataSource.data[0]);

    let value = this.dataSource.data.find((e) => !!e);

    console.log(value);
    console.log(this.dataSource.data.shift());
    console.log(this.dataSource.data);
    for(let i = 0; i < this.dataSource.data.length; i++) {
      this.setParent(this.dataSource.data[i], null);
    }
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

  public submit() {
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

    console.log(result);
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

