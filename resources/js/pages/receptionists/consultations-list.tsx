import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import SearchBox from '@/components/ui/search-box';
import { faClock, faUser, faUserMd, faStethoscope, faCalendar, faCoins, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from '@/components/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/receptionist/dashboard',
    },
    {
        title: 'Lista de Consultas',
        href: '/receptionist/consultations-list',
    },
];

interface Consultation {
    id: number;
    symptoms: string;
    diagnosis: string;
    notes: string;
    created_at: string;
    appointment: {
        id: number;
        appointment_date: string;
        status: string;
        value: number;
        patient: {
            id: number;
            name: string;
            email: string;
            phone: string;
        };
        doctor: {
            id: number;
            user: {
                name: string;
                email: string;
            };
        };
        receptionist: {
            id: number;
            user: {
                name: string;
            };
        };
    };
}

interface ConsultationsListProps {
    consultations: {
        data: Consultation[];
        links: PaginationLink[];
        meta: any;
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
    filters: {
        search: string;
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

function getStatusBadge(status: string) {
    const statusMap = {
        scheduled: { text: 'Agendado', class: 'bg-blue-100 text-blue-800' },
        completed: { text: 'Concluído', class: 'bg-green-100 text-green-800' },
        canceled: { text: 'Cancelado', class: 'bg-red-100 text-red-800' },
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || { text: status, class: 'bg-gray-100 text-gray-800' };
    
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.class}`}>
            {statusInfo.text}
        </span>
    );
}

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export default function ConsultationsList({ consultations, filters }: ConsultationsListProps) {
    const [searchValue, setSearchValue] = useState(filters.search);

    useEffect(() => {
        setSearchValue(filters.search);
    }, [filters.search]);

    useEffect(() => {
        if (searchValue !== filters.search) {
            const delayedSearch = setTimeout(() => {
                router.get('/receptionist/consultations-list', { search: searchValue }, {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                });
            }, 300);

            return () => clearTimeout(delayedSearch);
        }
    }, [searchValue]);

    return (
        <AppLayout breadcrumbs={breadcrumbs} userRole='receptionist'>
            <Head title="Lista de Consultas" />
            
            <div className="flex flex-col ml-30 mr-30 items-center justify-center">
                <div className="w-full flex flex-col">
                    <div className="flex w-full justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-[#030D29]">Lista de Consultas</h1>
                        <div className="w-1/3">
                            <SearchBox
                                placeHolder="Buscar por paciente ou doutor..."
                                value={searchValue}
                                onChange={setSearchValue}
                            />
                        </div>
                    </div>

                    <table className="w-full text-left items-center">  
                        <thead>
                            <tr className="flex bg-[#030D29] text-white font-bold mb-2 rounded-md items-center justify-center">
                                <th className="w-full p-3">ID</th>
                                <th className="w-full p-3"> Paciente </th>
                                <th className="w-full p-3"> Doutor </th>
                                <th className="w-full p-3"> Data </th>
                                <th className="w-full p-3"> Valor </th>
                                <th className="w-full p-3 rounded-r-md text-center"> Status </th>
                            </tr>
                        </thead>
                        <tbody>
                            {consultations.data.length > 0 ? (
                                consultations.data.map((consultation) => (
                                    <tr key={consultation.id} className="flex bg-white shadow-sm rounded mb-2 hover:bg-gray-50 transition-colors">
                                        <td className="w-full p-3 rounded-l-md text-[#030D29]">
                                            {consultation.id}
                                        </td>
                                        <td className="w-full p-3">
                                            <div className="flex flex-col">
                                                <span className="text-[#030D29]">
                                                    {consultation.appointment.patient.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="w-full p-3">
                                            <span className="text-[#030D29]">
                                                {consultation.appointment.doctor.user.name}
                                            </span>
                                        </td>
                                        <td className="w-full p-3">
                                            <div className="flex flex-col">
                                                <span className="text-[#030D29]">
                                                    {formatDate(consultation.appointment.appointment_date)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="w-full p-3">
                                            <div className="flex flex-col">
                                                <span className="text-[#030D29]">
                                                    R$ {consultation.appointment.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="w-full p-3 rounded-r-md flex justify-center items-center">
                                            {getStatusBadge(consultation.appointment.status)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="flex bg-white shadow-sm rounded mb-2">
                                    <td colSpan={5} className="w-full p-8 text-center text-gray-500 rounded-md">
                                        {searchValue ? 
                                            `Nenhuma consulta encontrada para "${searchValue}"` : 
                                            'Nenhuma consulta encontrada'
                                        }
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Pagination
                        links={consultations.links}
                        currentPage={consultations.current_page}
                        lastPage={consultations.last_page}
                        total={consultations.total}
                        perPage={consultations.per_page}
                    />
                </div>
            </div>
        </AppLayout>
    );
}