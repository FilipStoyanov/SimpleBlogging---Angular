import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Blog } from '../interfaces/interfaces';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';


const API_BASE_URL = 'http://localhost:9000/api/blogs';
@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor(private http: HttpClient) {  }

  getAll(): Observable<Blog[]> {
     return this.http.get<Blog[]>(`${API_BASE_URL}`);
  }
  getById(id: string): Observable<Blog> {
    return this.http.get<Blog>(API_BASE_URL + `/${id}`);
  }
  addBlog(blog: Blog): Observable<Blog> {
    const body = JSON.stringify(blog);
    const headers = { 'content-type': 'application/json'};
    return this.http.post<Blog>(API_BASE_URL, body, {headers});
  }
  removeBlog(blog: Blog): Observable<Blog> {
    return this.http.delete<Blog>(API_BASE_URL + `/${blog.id}`);
  }
  updateBlog(id: string, blog: Blog): Observable<Blog>{
    const body = JSON.stringify(blog);
    const headers = { 'content-type': 'application/json'};
    if(id){
      return this.http.put<Blog>(API_BASE_URL + `/${id}`, body, {headers});
    }else{
      return of();
    }
  }
}
