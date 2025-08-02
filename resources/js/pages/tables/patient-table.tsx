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
    cpf: string;
    phone: string;
    photo: string | undefined;
}

interface PatientProps {
    patients: Patient[];
}

const patientDataTest: PatientProps = {
    patients: [
        { id: 1, name: 'Luiza Carvalho', email: 'luiza@email.com', cpf: '123.456.789-00', phone: '(11) 98765-4321', photo: undefined },
        { id: 2, name: 'Carlos Mendes', email: 'carlos@email.com', cpf: '987.654.321-00', phone: '(11) 91234-5678', photo: undefined },
        { id: 3, name: 'Ana Souza', email: 'ana@email.com', cpf: '456.789.123-00', phone: '(11) 99876-5432', photo: undefined },
    ],
};

export default function PatientTable(){
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Patient Table" />
            <Table users={patientDataTest.patients} type='patient'/>
        </AppLayout>
    );
}