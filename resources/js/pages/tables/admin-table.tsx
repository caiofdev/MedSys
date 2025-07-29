import { type BreadcrumbItem } from '@/types';
import Table from '../../components/table-template';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import Pagination from '../../components/pagination';
import SearchBox from '../../components/ui/search-box';
import { useState, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tabela de Administradores',
        href: '/admin-table',
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

interface Admin {
    id: number;
    is_master: boolean;
    user_id: number;
    user: User;
}

interface PaginatedAdmins {
    data: Admin[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: any[];
}

interface AdminTableProps {
    admins: PaginatedAdmins;
    filters: {
        search: string;
    };
}

export default function AdminTable({ admins, filters }: AdminTableProps) {
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');

    const tableData = admins.data.map(admin => ({
        id: admin.id,
        name: admin.user.name,
        email: admin.user.email,
        phone: admin.user.phone,
        is_master: admin.is_master ? 'Sim' : 'Não'
    }));

    useEffect(() => {
        setSearchTerm(filters?.search || '');
    }, [filters?.search]);

    useEffect(() => {
        if (searchTerm !== (filters?.search || '')) {
            const delayedSearch = setTimeout(() => {
                router.get('/admin/admins', { search: searchTerm }, { 
                    preserveState: true,
                    preserveScroll: true 
                });
            }, 500);

            return () => clearTimeout(delayedSearch);
        }
    }, [searchTerm]);

    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Table" />
            <div className="space-y-6">
                <SearchBox 
                    placeHolder="Buscar por nome do administrador..." 
                    value={searchTerm}
                    onChange={setSearchTerm}
                />
                
                <Table users={tableData} />
                
                <Pagination 
                    links={admins.links}
                    currentPage={admins.current_page}
                    lastPage={admins.last_page}
                    total={admins.total}
                    perPage={admins.per_page}
                />
            </div>
        </AppLayout>
    );
}