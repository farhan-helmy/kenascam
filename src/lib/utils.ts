import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import DOMPurify from 'dompurify';

interface SanitizedObject {
  [key: string]: string | number | boolean | null | undefined;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sanitizeObject = (obj: SanitizedObject): SanitizedObject => {
  const sanitizedObj: SanitizedObject = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === 'string') {
        sanitizedObj[key] = DOMPurify.sanitize(value);
      } else {
        sanitizedObj[key] = value;
      }
    }
  }
  return sanitizedObj;
};
