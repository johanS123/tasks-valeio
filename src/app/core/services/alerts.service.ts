import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor() {}

  // Método para mostrar una alerta básica
  showAlert(title: string, text: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'info',
      confirmButtonText: 'Aceptar',
    });
  }

  // Método para mostrar una alerta de confirmación
  showConfirm(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'No, cancelar',
    });
  }

  // Método para mostrar alertas personalizadas
  showCustomAlert(options: any) {
    return Swal.fire(options);
  }
}
