import { type BreadcrumbItem } from '@/types';
import Table from '../../components/table-template';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tabela de Recepcionistas',
        href: '/receptionist-table',
    },
];

interface Receptionist {
    id: number;
    name: string;
    email: string;
}

interface ReceptionistProps {
    receptionists: Receptionist[];
}

const ReceptionistDataTest: ReceptionistProps = {
    receptionists: [
        { id: 1, name: 'Luiza Carvalho', email: 'luiza@email.com' },
        { id: 2, name: 'Carlos Mendes', email: 'carlos@email.com' },
        { id: 3, name: 'Ana Souza', email: 'ana@email.com' },
    ],
};

export default function receptionistTable(){
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Receptionist Table" />
            <Table users={ReceptionistDataTest.receptionists} />
        </AppLayout>
    );
}