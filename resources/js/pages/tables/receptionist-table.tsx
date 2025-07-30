import { type BreadcrumbItem } from '@/types';
import Table from '../../components/table-template';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import Pagination from '../../components/pagination';
import SearchBox from '../../components/ui/search-box';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tabela de Recepcionistas',
        href: '/receptionist-table',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    photo: string | null;
}

interface Receptionist {
    id: number;
    user_id: number;
    user: User;
}

interface PaginatedReceptionists {
    data: Receptionist[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: any[];
}

interface ReceptionistTableProps {
    receptionists: PaginatedReceptionists;
    filters: {
        search: string;
    };
}

export default function ReceptionistTable({ receptionists, filters }: ReceptionistTableProps) {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');

    const tableData = receptionists.data.map(receptionist => ({
        id: receptionist.id,
        name: receptionist.user.name,
        email: receptionist.user.email,
        phone: receptionist.user.phone,
        cpf: receptionist.user.cpf
    }));

    useEffect(() => {
        setSearchTerm(filters?.search || '');
    }, [filters?.search]);

    useEffect(() => {
        if (searchTerm !== (filters?.search || '')) {
            const delayedSearch = setTimeout(() => {
                router.get('/admin/receptionists', { search: searchTerm }, { 
                    preserveState: true,
                    preserveScroll: true 
                });
            }, 500);

            return () => clearTimeout(delayedSearch);
        }
    }, [searchTerm]);

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Receptionist Table" />
            <div className="flex flex-col space-y-6 justify-center mt-5">
                <div className='flex flex-row justify-between ml-30 mr-30'>
                    <SearchBox 
                        placeHolder="Buscar por nome do administrador..." 
                        value={searchTerm}
                        onChange={setSearchTerm}
                    />
                    <div className='flex items-center justify-center text-4xl hover:scale-110 hover:text-[#030d29e1] transition duration-200 cursor-pointer '>
                        <FontAwesomeIcon icon={faCirclePlus}/>
                    </div>
                </div>
                
                <Table users={tableData} />
                
                <Pagination 
                    links={receptionists.links}
                    currentPage={receptionists.current_page}
                    lastPage={receptionists.last_page}
                    total={receptionists.total}
                    perPage={receptionists.per_page}
                />
            </div>
        </AppLayout>
    );
}