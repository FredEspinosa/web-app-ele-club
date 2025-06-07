import { useMemo } from 'react';

export function useEventOrServiceForm(methods, type) {
  const { watch } = methods;
  const isFree = watch('price') === 'free';

  return useMemo(() => ({
    onSubmit: (data) => console.log('Submitted', data),
    showCost: !isFree,
    showDateRange: type === 'event',
    showSchedule: type === 'service',
    showIncludes: type === 'service'
  }), [isFree, type]);
}