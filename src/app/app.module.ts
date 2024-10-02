import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { UsersComponent } from './pages/users/users.component';
import { TaskManagementModule } from './features/task-management/task-management.module';
import { TaskCreateModalComponent } from './features/task-management/components/task-create-modal/task-create-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { HeaderComponent } from './layouts/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TasksComponent,
    UsersComponent,
    TaskCreateModalComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TaskManagementModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
