'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { BreadcrumbLabel } from './breadcrumb-label';

const pathLabels: Record<string, string> = {
  products: 'Products',
  orders: 'Orders',
  customers: 'Customers',
  analytics: 'Analytics',
  settings: 'Settings'
};

function BreadcrumbSegment({ segment, href, isLast }: { segment: string; href: string; isLast: boolean }) {
  const label = pathLabels[segment] || segment;
  return (
    <>
      <BreadcrumbItem>
        {isLast ? (
          <BreadcrumbPage>
            <BreadcrumbLabel segment={label} />
          </BreadcrumbPage>
        ) : (
          <BreadcrumbLink asChild>
            <Link href={href}>
              <BreadcrumbLabel segment={label} />
            </Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
      {!isLast && <BreadcrumbSeparator />}
    </>
  );
}

export default function DashboardBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const items = segments.map((segment: string, index: number) => (
    <BreadcrumbSegment
      key={segment}
      segment={segment}
      href={`/${segments.slice(0, index + 1).join('/')}`}
      isLast={index === segments.length - 1}
    />
  ));

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.length > 0 && <BreadcrumbSeparator />}
        {items}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
