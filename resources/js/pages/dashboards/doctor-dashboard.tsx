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

export default function DoctorDashboard() {
    return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Doctor Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-6 pr-10 pl-10 overflow-x-auto">
                <div className="flex flex-col gap-4 h-full">
                    <div className="grid grid-cols-3 gap-4">
                        <DashboardHeader userName="Caio Fernandes" imgPath="/doctor-pic.png" />
                        <DashboardProfile userName="Caio Fernandes" imgPath="/default-user.png" type='DOUTOR' />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 grid grid-cols-3 gap-4 h-full">
                            <DashboardCard icon={faCirclePlay} title="Iniciar Atendimento"color="198754"/>
                            <DashboardCard icon={faClipboard} title="Visualizar Prontuários" color="D63384"/>
                            <DashboardCard icon={faFileMedical} title="Solicitar Exames" color="FFC107"/>
                        </div>
                        <DashboardCalendar title='Meu Calendário'/>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
