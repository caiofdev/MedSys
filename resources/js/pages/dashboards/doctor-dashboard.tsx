import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {faCirclePlay, faClipboard,faFileMedical } from '@fortawesome/free-solid-svg-icons'
import DashboardCard from '@/components/dashboard-card';
import DashboardHeader from '@/components/dashboard-header';
import DashboardProfile from '@/components/dashboard-user-profile';
import DashboardCalendar from '@/components/dashboard-calendar';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/doctor-dashboard',
    },
];

interface DoctorDashboardProps {
    user: {
        name: string;
        avatar: string;
        role: string;
        crm: string;
        specialty: string;
    };
    appointments: {
        today: number;
        week: number;
        month: number;
    };
    upcoming_appointments: any[];
}

export default function DoctorDashboard({ user, appointments, upcoming_appointments }: DoctorDashboardProps) {
    return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Doctor Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-6 pr-10 pl-10 overflow-x-auto">
                <div className="flex flex-col gap-4 h-full">
                    <div className="grid grid-cols-3 gap-4">
                        <DashboardHeader userName={user.name} imgPath="/doctor-pic.png" />
                        <DashboardProfile userName={user.name} imgPath={user.avatar} type={user.role} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 grid grid-cols-3 gap-4 h-full">
                            <DashboardCard 
                                icon={faCirclePlay} 
                                title="Iniciar Atendimento"
                                color="198754"
                            />
                            <DashboardCard 
                                icon={faClipboard} 
                                title={`Consultas Hoje (${appointments.today})`} 
                                color="D63384"
                            />
                            <DashboardCard 
                                icon={faFileMedical} 
                                title={`Consultas Mês (${appointments.month})`} 
                                color="FFC107"
                            />
                        </div>
                        <DashboardCalendar title='Meu Calendário'/>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}