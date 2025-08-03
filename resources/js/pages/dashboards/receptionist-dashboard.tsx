import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { faUsers, faCalendar, faFileMedical} from '@fortawesome/free-solid-svg-icons'
import DashboardCard from '@/components/dashboard-card';
import DashboardHeader from '@/components/dashboard-header';
import DashboardProfile from '@/components/dashboard-user-profile';
import DashboardCalendar from '@/components/dashboard-calendar';
import DashboardMonthlySales from '@/components/dashboard-monthly-sales';
import DashboardSummary from '@/components/dashboard-summary';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/receptionist-dashboard',
    },
];

interface ReceptionistDashboardProps {
    user: {
        name: string;
        avatar: string;
        role: string;
        registration_number: string;
    };
    daily_summary: {
        appointments_today: number;
        completed_today: number;
        pending_today: number;
        cancelled_today: number;
    };
    weekly_appointments: any[];
}

export default function ReceptionistDashboard({ user, daily_summary, weekly_appointments }: ReceptionistDashboardProps) {
    return (
    <AppLayout breadcrumbs={breadcrumbs} userRole="receptionist">
        <Head title="Recepcionist Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-6 pr-10 pl-10 overflow-x-auto">
                <div className="flex flex-col gap-4 h-full">
                    <div className="grid grid-cols-3 gap-4">
                        <DashboardHeader userName={user.name} imgPath="/recepcionist-pic.png" />
                        <DashboardProfile userName={user.name} imgPath={user.avatar} type={user.role} />
                    </div>
                    <div className="grid grid-cols-3 gap-4 h-40">
                            <DashboardCard 
                                icon={faUsers} 
                                title={"Pacientes"} 
                                color="F46248"
                                route="/receptionist/patients"
                            />
                            <DashboardCard 
                                icon={faCalendar} 
                                title={"Agendar Consulta"} 
                                color="F46248"
                                route="/"
                            />
                            <DashboardCard 
                                icon={faFileMedical} 
                                title={"Visualizar Consultas"} 
                                color='F46248'
                                route="/"
                            />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <DashboardSummary
                            title="Resumo do Dia"
                            labels={['Consultas do Dia', 'Atendidos', 'Cancelados']}
                            data={[daily_summary.appointments_today, daily_summary.completed_today, daily_summary.cancelled_today]}
                        />
                        <DashboardCalendar title="Consultas da Semana"/>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
