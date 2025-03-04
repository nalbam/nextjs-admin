'use client';

import { useEffect, useState } from 'react';
import { getProductName } from './actions';

export function BreadcrumbLabel({ segment }: { segment: string }) {
  const [label, setLabel] = useState(segment);

  useEffect(() => {
    getProductName(segment).then(setLabel);
  }, [segment]);

  return <>{label}</>;
}
