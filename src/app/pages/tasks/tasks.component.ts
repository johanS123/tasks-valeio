import { Component, ViewChild } from '@angular/core';
import { TaskCreateModalComponent } from 'src/app/features/task-management/components/task-create-modal/task-create-modal.component';
import { TaskService } from 'src/app/features/task-management/services/task.service';
import ITasks from 'src/app/models/tasks.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass'],
})
export class TasksComponent {
  tasks: ITasks[] = [];
  @ViewChild(TaskCreateModalComponent)
  modalComponent!: TaskCreateModalComponent; // Referencia al componente hijo

  constructor(private taskService: TaskService) {
    // this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe((resp: any) => {
      this.tasks = resp.tasks;
    });
  }

  openModal(): void {
    this.modalComponent.openModal();
  }

  // closeModal(): void {
  //   this.isModalOpen = false;
  // }
}
