import { type BreadcrumbItem } from '@/types';
import Table from '../../components/table-template';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tabela de Doutores',
        href: '/doctor-table',
    },
];

interface Doctor {
    id: number;
    name: string;
    email: string;
}

interface DoctorProps {
    doctors: Doctor[];
}

const doctorDataTest: DoctorProps = {
    doctors: [
        { id: 1, name: 'Luiza Carvalho', email: 'luiza@email.com' },
        { id: 2, name: 'Carlos Mendes', email: 'carlos@email.com' },
        { id: 3, name: 'Ana Souza', email: 'ana@email.com' },
    ],
};

export default function DoctorTable(){
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Table" />
            <Table users={doctorDataTest.doctors} />
        </AppLayout>
    );
}