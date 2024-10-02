import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';

// Validación personalizada para verificar que haya al menos 1 habilidad
export function minOneSkill(control: AbstractControl): ValidationErrors | null {
  const formArray = control as FormArray;
  return formArray.length > 0 ? null : { minOneSkill: true };
}
