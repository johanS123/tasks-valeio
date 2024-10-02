import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import Ipage from 'src/app/models/page.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
  standalone: true,
  imports: [RouterModule],
})
export class CardComponent {
  @Input({ required: true }) data!: Ipage;
}
