const MSK_OFFSET_MS = 3 * 60 * 60 * 1000;

export function moscowDayStart(dateStr: string): Date {
  const utcMidnight = new Date(`${dateStr}T00:00:00Z`);
  return new Date(utcMidnight.getTime() - MSK_OFFSET_MS);
}

export function moscowDayEnd(dateStr: string): Date {
  return new Date(moscowDayStart(dateStr).getTime() + 24 * 60 * 60 * 1000);
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
