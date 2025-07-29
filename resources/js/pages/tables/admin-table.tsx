import { type BreadcrumbItem } from '@/types';
import Table from '../../components/table-template';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tabela de Administradores',
        href: '/admin-table',
    },
];

interface Admin {
    id: number;
    name: string;
    email: string;
}

interface AdminProps {
    admins: Admin[];
}

const adminDataTest: AdminProps = {
    admins: [
        { id: 1, name: 'Luiza Carvalho', email: 'luiza@email.com' },
        { id: 2, name: 'Carlos Mendes', email: 'carlos@email.com' },
        { id: 3, name: 'Ana Souza', email: 'ana@email.com' },
    ],
};

export default function AdminTable(){
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Table" />
            <Table users={adminDataTest.admins} />
        </AppLayout>
    );
}