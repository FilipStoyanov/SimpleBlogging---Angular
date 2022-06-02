import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { LastBlogsComponent } from './last-blogs/last-blogs.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';



const routes: Routes = [
  {path: 'add', component: BlogComponent, canDeactivate: [CanDeactivateGuard]},
  {path: 'edit/:id', component: EditBlogComponent, canDeactivate: [CanDeactivateGuard]},
  {path: 'blog/:id', component: BlogViewComponent},
  {path: 'lastblogs', component: LastBlogsComponent},
  {path: 'home', component: BlogListComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    CanDeactivateGuard
  ]
})
export class AppRoutingModule { }
