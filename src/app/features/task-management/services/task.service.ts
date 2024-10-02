import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ITasks from 'src/app/models/tasks.model';

const dominio = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(`${dominio}/api/tasks`);
  }

  addTask(body: ITasks) {
    return this.http.post(`${dominio}/api/tasks`, body);
  }
}
