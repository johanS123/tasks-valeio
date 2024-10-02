import { Component, OnInit } from '@angular/core';
declare var M: any; // Declarar M para acceder a los métodos de Materialize

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems);
  }
}
