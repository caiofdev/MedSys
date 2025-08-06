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
import { ModalAppointment, ModalProvider } from '@/components/modals';
import {Dialog} from "@/components/ui/dialog"
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/receptionist-dashboard',
    },
];

interface ReceptionistDashboardProps {
    user: {
        id: number;
        cpf: string;
        photo: string;
        name: string;
        avatar: string;
        role: string;
        registration_number: string;
        email: string;
        phone: string;
    };
    daily_summary: {
        appointments_today: number;
        completed_today: number;
        pending_today: number;
        cancelled_today: number;
    };
    weekly_appointments: Array<{
        id: number;
        appointment_date: string;
        patient: {
            name: string;
        };
        doctor: {
            user: {
                name: string;
            };
        };
        status: string;
    }>;
}

export default function ReceptionistDashboard({ user, daily_summary, weekly_appointments }: ReceptionistDashboardProps) {
    const [open, setOpen] = useState(false);
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
                            <div onClick={() => setOpen(true)} className="cursor-pointer">
                                <DashboardCard 
                                    icon={faCalendar} 
                                    title={"Agendar Consulta"} 
                                    color="F46248"
                                />
                            </div>
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
                        <DashboardCalendar title="Consultas da Semana" appointments={weekly_appointments}/>
                    </div>
                </div>
            </div>
            <ModalProvider>
                <Dialog open={open} onOpenChange={setOpen} >
                    <ModalAppointment
                        receptionist={user}
                        patients={[
                            { id: 1, name: 'João Silva', cpf: '123.456.789-00', email: 'joao.silva@example.com', photo: '', phone: '123-456-7890' },
                            { id: 2, name: 'Maria Oliveira', cpf: '987.654.321-00', email: 'maria.oliveira@example.com', photo: '', phone: '987-654-3210' },
                        ]}
                        doctors={[
                            { id: 1, name: 'Dr. Carlos', cpf: '123.456.789-00', crm: '123456', email: 'dr.carlos@example.com', photo: '', phone: '123-456-7890' },
                            { id: 2, name: 'Dra. Ana', cpf: '987.654.321-00', crm: '654321', email: 'dra.ana@example.com', photo: '', phone: '987-654-3210' },
                        ]}
                    />
                </Dialog>
        </ModalProvider>
        </AppLayout>
    );
}
