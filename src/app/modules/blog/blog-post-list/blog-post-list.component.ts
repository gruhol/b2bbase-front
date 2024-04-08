import { Component } from '@angular/core';
import { BlogService } from '../blog.service';
import { PageEvent } from '@angular/material/paginator';
import { BlogResponse } from '../dto/BlogResponse';
import { Page } from '../../common/model/page';
import { BlogCategory } from '../dto/BlogCategory';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrl: './blog-post-list.component.scss'
})
export class BlogPostListComponent {

  page?: Page<BlogResponse>;
  categories?: Array<BlogCategory>;
  categoryCheckedList: string[] = [];

  constructor(
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.getBlogPosts();
    this.getCategories();
  }

  getBlogPosts() {
    this.getCompanyPage(0, 10);    
  }

  private getCompanyPage(page: number, size: number) {
    this.blogService.getBlogPosts(page, size, this.categoryCheckedList)
    .subscribe(page => this.page = page);
  }

  onPageEvent(event: PageEvent) {
    this.getCompanyPage(event.pageIndex, event.pageSize);
  }

  private getCategories() {
    this.blogService.getBlogCategories()
      .subscribe(cat => this.categories = cat);
  }

  toggleCategory(key: string, isChecked: boolean) {
    if (isChecked) {
      this.categoryCheckedList.push(key);
    } else {
      const index = this.categoryCheckedList.indexOf(key);
      if (index !== -1) {
        this.categoryCheckedList.splice(index, 1);
      }
    }
  }

  filter(){
    this.blogService.getBlogPosts(0, 10, this.categoryCheckedList)
      .subscribe(page => this.page = page);
  }

}
