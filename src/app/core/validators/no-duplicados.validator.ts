import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noDuplicadosValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const items = control.value;

    // Obtener los valores de la propiedad específica
    const valores = items.map((item: any) => item['name']);
    const duplicados = valores.filter(
      (valor: any, index: number) => valores.indexOf(valor) !== index
    );

    return duplicados.length > 0 ? { duplicados: true } : null;
  };
}
