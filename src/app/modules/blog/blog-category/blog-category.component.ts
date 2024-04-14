import { Component } from '@angular/core';
import { BlogService } from '../blog.service';
import { BlogCategory } from '../dto/BlogCategory';
import { PageEvent } from '@angular/material/paginator';
import { BlogResponse } from '../dto/BlogResponse';
import { Page } from '../../common/model/page';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrl: './blog-category.component.scss'
})
export class BlogCategoryComponent {

  slug: string = '';
  page?: Page<BlogResponse>;
  categories?: Array<BlogCategory>;
  categoryCheckedList: string[] = [];

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.slug = params.get('slug') || ''; // Get slug from paramMap
      this.getBlogPosts();
      this.getCategories(); // Call getPage() whenever slug changes
    });
  }

  getBlogPosts() {
    this.getCompanyPage(0, 10);    
  }

  private getCompanyPage(page: number, size: number) {
    this.blogService.getBlogPostByCategoryName(this.slug, page, size)
    .subscribe(page => {
      this.page = page;
    });
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
