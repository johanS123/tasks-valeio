import { Component, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import ITasks from 'src/app/models/tasks.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass'],
})
export class TaskListComponent {
  @Input({ required: false }) task!: ITasks;
}
