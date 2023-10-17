import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Component, ElementRef, ViewChild } from '@angular/core';

interface VehicleNode {
  name: string;
  id?: number;
  children?: VehicleNode[];
  selected?: boolean;
  indeterminate?: boolean;
  parent?: VehicleNode;
}

const TREE_DATA: VehicleNode[] = [
  {
    name: 'Infiniti',
    children: [
      { name: 'Pure AWD', id: 1 },
      { name: 'Luxe', id: 2 },
      { name: 'Pure AWD', id: 3 },
      { name: 'Luxe', id: 4 },
    ],
    id: 222,
  },
  {
    name: 'BMW',
    children: [
      { name: 'Coupé', id: 5 },
      { name: 'Gran Coupé', id: 6 },
      { name: 'Sedan', id: 7 },
      { name: 'PHEV', id: 8 },
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
    (node) => node.children || []
  );
  public dataSource = new MatTreeNestedDataSource<VehicleNode>();
  @ViewChild('outputDiv', { static: true })
  public outputDivRef!: ElementRef<HTMLParagraphElement>;
  public searchString = '';
  public showOnlySelected = false;

  constructor() {
    this.dataSource.data = TREE_DATA;
    this.dataSource.data.forEach(node => {
      this.setParent(node, null);
    });
  }

  public hasChild = (_: number, node: VehicleNode) =>
    !!(node.children && node.children.length > 0);

    private setParent(node: VehicleNode, parent: VehicleNode | null) {
      node.parent = parent!;
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

  public itemToggle(checked: boolean, node: VehicleNode) {
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
                (!node.children || node.children.length === 0) &&
                node.selected &&
                !this.hideLeafNode(node)
            )
            .map((descendant) => descendant.name)
        ),
      [] as string[]
    );

    this.outputDivRef.nativeElement.innerText =
      'Wybrałeś ' +
      (result.length > 0
        ? result.join(', ')
        : 'nic nie zostało wybrane') +
      '.';
  }

  public hideLeafNode(node: VehicleNode): boolean {
    return this.showOnlySelected && !node.selected
      ? true
      : !new RegExp(this.searchString, 'i').test(node.name);
  }

  public hideParentNode(node: VehicleNode): boolean {
    return this.treeControl
      .getDescendants(node)
      .filter((node) => !node.children || node.children.length === 0)
      .every((node) => this.hideLeafNode(node));
  }
}