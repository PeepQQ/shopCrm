import { endOfDay, formatDate, startOfDay } from 'date-fns';
import { TZDate } from '@date-fns/tz';

export function moscowDayStart(date: string | Date): Date {
  return startOfDay(
    new TZDate(
      typeof date === 'string' ? date : formatDate(date, 'yyyy-MM-dd'),
      'Europe/Moscow',
    ),
  );
}

export function moscowDayEnd(date: string | Date): Date {
  return endOfDay(
    new TZDate(
      typeof date === 'string' ? date : formatDate(date, 'yyyy-MM-dd'),
      'Europe/Moscow',
    ),
  );
}

export function moscowDateString(d: Date): string {
  return d.toLocaleDateString('sv-SE', { timeZone: 'Europe/Moscow' });
}

export function moscowDayRange(dateStr: string): { gte: Date; lt: Date } {
  return {
    gte: moscowDayStart(dateStr),
    lt: moscowDayEnd(dateStr),
  };
}

export function moscowTodayRange(): { gte: Date; lt: Date } {
  return moscowDayRange(moscowDateString(new Date()));
}
