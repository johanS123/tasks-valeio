import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import ITasks from 'src/app/models/tasks.model';
import { minOneRecord } from 'src/app/core/validators/min-one-record.validator';
import { TaskService } from '../../services/task.service';
import { AlertsService } from '../../../../core/services/alerts.service';
import { noDuplicadosValidator } from 'src/app/core/validators/no-duplicados.validator';

declare var M: any; // Declarar M para acceder a los métodos de Materialize

@Component({
  selector: 'app-task-create-modal',
  templateUrl: './task-create-modal.component.html',
  styleUrls: ['./task-create-modal.component.sass'],
  providers: [DatePipe],
})
export class TaskCreateModalComponent implements AfterViewInit {
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @Output('isSaved') isSaved = new EventEmitter<boolean>();

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private taskService: TaskService,
    private alertsService: AlertsService
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
      persons: this.fb.array([], minOneRecord),
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
      name: [
        '',
        [Validators.required, Validators.minLength(5), noDuplicadosValidator],
      ],
      age: ['', [Validators.required, Validators.min(18), Validators.max(80)]],
      skills: this.fb.array([], minOneRecord),
    });

    this.persons.push(personForm);
  }

  removePerson(index: number): void {
    this.persons.removeAt(index);
  }

  addSkill(personIndex: number): void {
    const skillControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?!\s).*/),
    ]);
    this.skills(personIndex).push(skillControl);
  }

  removeSkill(personIndex: number, skillIndex: number): void {
    this.skills(personIndex).removeAt(skillIndex);
  }

  clearForm() {
    this.form.reset();
    this.persons.clear();
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

    this.taskService.addTask(body).subscribe(
      (res: any) => {
        if (res.status == 201) {
          this.isSaved.emit(true);
          this.closeBtn.nativeElement.click();
          this.alertsService.showAlert(
            'Tarea Creada',
            'la tarea se creo exitosamente!!.'
          );
        }
      },
      (err) => {
        this.alertsService.showAlert(
          'Error de Creación',
          'la tarea no se pudo crear, intente mas tarde!!'
        );
        this.isSaved.emit(false);
        console.error('Error: ', err);
      }
    );
  }

  closeModal() {
    this.clearForm();
  }

  // Método para obtener errores
  obtenerErrores(personIndex: number): string {
    const errores = this.form.get('persons')?.errors;
    if (errores && errores[personIndex].duplicados) {
      return 'Hay valores duplicados en el formulario.';
    }
    return '';
  }
}
