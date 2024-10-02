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
  isChecked: boolean = false;

  constructor(private taskService: TaskService) {}

  onCheckboxChange(event: any, item: ITasks) {
    this.isChecked = event.target.checked;
    item.isCompleted = this.isChecked;
    this.saveCheckboxState(item);
  }

  saveCheckboxState(item: ITasks) {
    this.taskService
      .updateTask(item, item.id)
      .subscribe((res) => console.log(res));
  }
}
