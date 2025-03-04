'use client';

import { format } from 'date-fns-tz';
import { getLocalTimezone } from '@/lib/timezone';

export function FormattedDate({ date }: { date: Date }) {
  const timezone = getLocalTimezone();
  return <>{format(date, 'yyyy-MM-dd HH:mm:ss', { timeZone: timezone })}</>;
}
