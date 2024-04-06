import { Component } from '@angular/core';
import { BlogService } from '../blog.service';
import { PageEvent } from '@angular/material/paginator';
import { BlogResponse } from '../dto/BlogResponse';
import { Page } from '../../common/model/page';

@Component({
  selector: 'app-blog-post-list',
  standalone: true,
  imports: [],
  templateUrl: './blog-post-list.component.html',
  styleUrl: './blog-post-list.component.scss'
})
export class BlogPostListComponent {

  page?: Page<BlogResponse>;
  selectCategory: number[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.getBlogPosts()
  }

  getBlogPosts() {
    this.getCompanyPage(0, 10);    
  }

  private getCompanyPage(page: number, size: number) {
    this.blogService.getBlogPosts(page, size, this.selectCategory).subscribe(page => this.page = page);
  }

  onPageEvent(event: PageEvent) {
    this.getCompanyPage(event.pageIndex, event.pageSize);
  }

}
