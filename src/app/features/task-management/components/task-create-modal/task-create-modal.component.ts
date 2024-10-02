import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import ITasks from 'src/app/models/tasks.model';
import { minOneSkill } from 'src/app/validators/min-one-skill.validator';
import { TaskService } from '../../services/task.service';

declare var M: any; // Declarar M para acceder a los métodos de Materialize

@Component({
  selector: 'app-task-create-modal',
  templateUrl: './task-create-modal.component.html',
  styleUrls: ['./task-create-modal.component.sass'],
  providers: [DatePipe],
})
export class TaskCreateModalComponent implements AfterViewInit {
  @ViewChild('skillsInput') skillsInput!: ElementRef;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private taskService: TaskService
  ) {
    this.formBuilder();
  }

  ngAfterViewInit() {
    // Inicializar el modal cuando el componente se inicializa
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);

    const options = {
      onSelect: (date: any) => {
        this.form.get('deadline')?.setValue(date);
      },
      format: 'yyyy-mm-dd',
      i18n: {
        months: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        monthsShort: [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic',
        ],
        weekdays: [
          'Domingo',
          'Lunes',
          'Martes',
          'Miércoles',
          'Jueves',
          'Viernes',
          'Sábado',
        ],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        today: 'Hoy',
        clear: 'Limpiar',
        close: 'Cerrar',
        done: 'Listo',
      },
    };

    const datepicker = M.Datepicker.init(
      document.querySelector('.datepicker'),
      options
    );
  }

  formBuilder() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      persons: this.fb.array([]),
    });

    // Añadir una persona por defecto al inicializar
    this.addPerson();
  }

  get persons(): FormArray {
    return this.form.get('persons') as FormArray;
  }

  skills(personIndex: number): FormArray {
    return this.persons.at(personIndex).get('skills') as FormArray;
  }

  addPerson(): void {
    const personForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(80)]],
      skills: this.fb.array([], minOneSkill),
    });

    this.persons.push(personForm);
  }

  removePerson(index: number): void {
    this.persons.removeAt(index);
  }

  addSkill(personIndex: number): void {
    const skillControl = new FormControl('', Validators.required);
    this.skills(personIndex).push(skillControl);
  }

  removeSkill(personIndex: number, skillIndex: number): void {
    this.skills(personIndex).removeAt(skillIndex);
  }

  clearForm() {
    this.form.patchValue({
      title: '',
      deadline: '',
    });
  }

  removeChip(chip: string): void {
    const chipsArray = this.form.get('skills')?.value;
    const index = chipsArray.indexOf(chip);

    if (index >= 0) {
      chipsArray.splice(index, 1);
      this.form.get('skills')?.setValue(chipsArray);
    }
  }

  validateSendForm(): boolean | undefined {
    return (
      this.form.invalid &&
      this.persons.invalid &&
      !this.persons.get('skills')?.invalid
    );
  }

  openModal() {
    const elem = document.querySelector('.modal');
    const instance = M.Modal.getInstance(elem);
    instance.open();
  }

  createTask(): void {
    let { deadline, ...rest } = this.form.value;
    const rawDeadline = deadline;
    const dateFormated = this.datePipe.transform(rawDeadline, 'yyyy-MM-dd');

    let body: ITasks = rest;
    body.deadline = dateFormated == null ? '' : dateFormated;

    this.taskService.addTask(body).subscribe((res) => console.log('res', res));
  }

  closeModal() {
    this.clearForm();
  }
}
