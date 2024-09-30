import { Component, OnInit } from '@angular/core';
import Ipage from '../../models/page.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  pages: Ipage[] = [];

  ngOnInit(): void {
    this.pages = [
      {
        id: 1,
        title: 'tareas',
        description: 'pagina de las tareas',
        link: '/tasks',
      },
      {
        id: 2,
        title: 'usuarios',
        description: 'pagina de los usuarios',
        link: '/users',
      },
    ];
  }
}
