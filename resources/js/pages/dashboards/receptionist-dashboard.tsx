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

export default function ReceptionistDashboard() {
    return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Recepcionist Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-6 pr-10 pl-10 overflow-x-auto">
                <div className="flex flex-col gap-4 h-full">
                    <div className="grid grid-cols-3 gap-4">
                        <DashboardHeader userName="Caio Fernandes" imgPath="/recepcionist-pic.png" />
                        <DashboardProfile userName="Caio Fernandes" imgPath="/default-user.png" type='RECEPCIONISTA' />
                    </div>
                    <div className="grid grid-cols-3 gap-4 h-40">
                            <DashboardCard icon={faUsers} title={"Pacientes"} color="F46248"/>
                            <DashboardCard icon={faCalendar} title={"Agendar Consulta"} color="F46248"/>
                            <DashboardCard icon={faFileMedical} title={"Visualizar Consulta"} color='F46248' />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <DashboardSummary
                            title="Resumo do Dia"
                            labels={['Consultas do Dia', 'Atendidos', 'Faltas']}
                            data={[10, 8, 2]}
                        />
                        <DashboardCalendar title="Consultas das Semana"/>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
