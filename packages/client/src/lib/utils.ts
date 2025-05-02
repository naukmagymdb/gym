import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createTextFieldSchema(field: {
  required?: boolean | string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  type?: string;
}) {
  let schema = z.string();

  const requiredMessage =
    typeof field.required === 'string'
      ? field.required
      : 'This field is required';

  if (field.required) {
    schema = schema.min(1, { message: requiredMessage });
  }

  if (field.minLength) {
    schema = schema.min(field.minLength.value, {
      message: field.minLength.message,
    });
  }

  if (field.maxLength) {
    schema = schema.max(field.maxLength.value, {
      message: field.maxLength.message,
    });
  }

  if (field.pattern) {
    schema = schema.regex(field.pattern.value, {
      message: field.pattern.message,
    });
  }

  if (field.type === 'email') {
    return z.union([
      z.string().email({ message: 'Invalid email address' }),
      z.literal(''),
    ]);
  }

  if (!field.required) {
    return schema.optional();
  }

  return schema;
}

export function createSelectFieldSchema(field: {
  required?: boolean | string;
}) {
  let schema = z.string();

  const requiredMessage =
    typeof field.required === 'string'
      ? field.required
      : 'This field is required';

  if (field.required) {
    schema = schema.min(1, { message: requiredMessage });
  }

  if (!field.required) {
    return schema.optional();
  }

  return schema;
}
