import { type BreadcrumbItem } from '@/types';
import Table from '../../components/table-template';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tabela de Pacientes',
        href: '/patient-table',
    },
];

interface Patient {
    id: number;
    name: string;
    email: string;
}

interface PatientProps {
    patients: Patient[];
}

const patientDataTest: PatientProps = {
    patients: [
        { id: 1, name: 'Luiza Carvalho', email: 'luiza@email.com' },
        { id: 2, name: 'Carlos Mendes', email: 'carlos@email.com' },
        { id: 3, name: 'Ana Souza', email: 'ana@email.com' },
    ],
};

export default function PatientTable(){
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Patient Table" />
            <Table users={patientDataTest.patients} />
        </AppLayout>
    );
}