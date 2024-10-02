import { Pipe, PipeTransform } from '@angular/core';
import ITasks from 'src/app/models/tasks.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    items: ITasks[],
    filterTask: string,
    filterStatus: string
  ): ITasks[] {
    if (!items) return [];
    if (!filterTask && !filterStatus) return items;

    return items.filter((item) => {
      const textoCoincide = item.title
        .toLowerCase()
        .includes(filterTask.toLowerCase());

      const seleccionCoincide =
        (filterStatus === 'completado' && item.isCompleted) ||
        (filterStatus === 'pendiente' && !item.isCompleted) ||
        !filterStatus;

      return textoCoincide && seleccionCoincide;
    });
  }
}
