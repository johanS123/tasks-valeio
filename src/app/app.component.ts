import { Component } from '@angular/core';
import { HeaderComponent } from './layouts/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'tasks-manager-velaio';
}
