import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

type UserRole = 'admin' | 'doctor' | 'receptionist' | 'patient';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    userRole?: UserRole;
}

export default ({ children, breadcrumbs, userRole, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} userRole={userRole} {...props}>
        {children}
    </AppLayoutTemplate>
);
