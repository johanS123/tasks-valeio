import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TaskCreateModalComponent } from 'src/app/features/task-management/components/task-create-modal/task-create-modal.component';
import { TaskService } from 'src/app/features/task-management/services/task.service';
import ITasks from 'src/app/models/tasks.model';

declare var M: any;

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass'],
})
export class TasksComponent implements AfterViewInit {
  tasks: ITasks[] = [];
  @ViewChild(TaskCreateModalComponent)
  modalComponent!: TaskCreateModalComponent; // Referencia al componente hijo
  filterTask: string = '';
  filterStatus: string = '';

  constructor(private taskService: TaskService) {
    this.getTasks();
  }

  ngAfterViewInit(): void {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }

  getTasks() {
    this.taskService.getTasks().subscribe((resp: any) => {
      this.tasks = resp.tasks;
    });
  }

  openModal(): void {
    this.modalComponent.openModal();
  }

  searchTask(event: any) {
    console.log('event', event);
  }

  isSaved(value: boolean) {
    if (value) {
      this.getTasks();
    }
  }
}
