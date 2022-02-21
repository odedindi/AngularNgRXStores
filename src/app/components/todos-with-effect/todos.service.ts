import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import type { Todo } from '../../types/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  private options = {
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  };
  public addTodo = (title: Todo['title']) =>
    this.http.post<Todo>(
      this.baseUrl,
      JSON.stringify({ userId: 1, title, completed: false }),
      this.options
    );

  public getAll = () => this.http.get<Todo[]>(this.baseUrl);
  public getAllByUserId = (userId?: number) =>
    this.http.get<Todo[]>(`${this.baseUrl}?userId=${userId ?? 1}`);

  public toggleTodo = ({ completed, id }: Todo) =>
    this.http.patch<Todo>(
      `${this.baseUrl}/${id}`,
      JSON.stringify({ completed }),
      this.options
    );

  public removeTodo = (id: Todo['id']) =>
    this.http.delete<{}>(`${this.baseUrl}/${id}`);

  public updateTodo = (todo: Todo) =>
    this.http.put<Todo>(
      `${this.baseUrl}/${todo.id}`,
      JSON.stringify(todo),
      this.options
    );
}
