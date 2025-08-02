import { type BreadcrumbItem } from '@/types';
import Table from '../../components/table-template';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import Pagination from '../../components/pagination';
import SearchBox from '../../components/ui/search-box';
import { useState, useEffect } from 'react';

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
    gender: string;
    birth_date: string;
    emergency_contact: string;
    medical_history?: string;
}

interface PaginatedPatients {
    data: Patient[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: any[];
}

interface PatientTableProps {
    patients: PaginatedPatients;
    filters: {
        search: string;
    };
}

export default function PatientTable({ patients, filters }: PatientTableProps) {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');

    const tableData = patients.data.map(patient => ({
        id: patient.id,
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        cpf: patient.cpf,
        photo: undefined
    }));

    useEffect(() => {
        setSearchTerm(filters?.search || '');
    }, [filters?.search]);

    useEffect(() => {
        if (searchTerm !== (filters?.search || '')) {
            const delayedSearch = setTimeout(() => {
                router.get('/patient-table', { search: searchTerm }, { 
                    preserveState: true,
                    preserveScroll: true 
                });
            }, 500);

            return () => clearTimeout(delayedSearch);
        }
    }, [searchTerm]);

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Patient Table" />
            <div className="flex flex-col space-y-6 justify-center mt-5">
                <div className='flex flex-row justify-between ml-30 mr-30'>
                    <SearchBox 
                        placeHolder="Buscar por nome do administrador..." 
                        value={searchTerm}
                        onChange={setSearchTerm}
                    />
                </div>
                
                <Table users={tableData} type='patient'/>
                
                <Pagination 
                    links={patients.links}
                    currentPage={patients.current_page}
                    lastPage={patients.last_page}
                    total={patients.total}
                    perPage={patients.per_page}
                />
            </div>
        </AppLayout>
    );
}