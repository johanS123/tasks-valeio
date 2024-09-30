import { Component, Input } from '@angular/core';
import Ipage from 'src/app/models/page.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
})
export class CardComponent {
  @Input({ required: true }) data!: Ipage;
}
