export interface Validatable {
  value: string | number; // The value of the input
  required?: boolean; // If the input is required
  minLength?: number; // The minimum length of the input (for strings)
  maxLength?: number; // The maximum length of the input (for strings)
  min?: number; // The minimum value of the input (for numbers)
  max?: number; // The maximum value of the input (for numbers)
}

export function validate(obj: Validatable): boolean {
  let isValid = true;

  if (obj.required) {
    isValid = isValid && obj.value.toString().trim().length > 0;
  }

  if (typeof obj.value === "string") {
    if (obj.minLength) {
      isValid = isValid && obj.value.length >= obj.minLength;
    }
    if (obj.maxLength) {
      isValid = isValid && obj.value.length <= obj.maxLength;
    }
  }

  if (typeof obj.value === "number") {
    if (obj.min) {
      isValid = isValid && obj.value >= obj.min;
    }
    if (obj.max) {
      isValid = isValid && obj.value <= obj.max;
    }
  }

  return isValid;
}
