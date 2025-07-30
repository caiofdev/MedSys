import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { faShieldHalved, faStethoscope, faIdBadge } from '@fortawesome/free-solid-svg-icons'
import DashboardCard from '@/components/dashboard-card';
import DashboardHeader from '@/components/dashboard-header';
import DashboardProfile from '@/components/dashboard-user-profile';
import DashboardPieChart from '@/components/dashboard-pie-charts';
import DashboardTotal from '@/components/dashboard-monthly-total';
import DashboardMonthlySales from '@/components/dashboard-monthly-sales';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin-dashboard',
    },
];

interface AdminDashboardProps {
    user: {
        name: string;
        avatar: string;
        role: string;
        is_master: boolean;
    };
    stats: {
        total_admins: number;
        total_doctors: number;
        total_receptionists: number;
        total_users: number;
    };
    recent_activities: any[];
}

export default function AdminDashboard({ user, stats, recent_activities }: AdminDashboardProps) {
    return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-6 pr-10 pl-10 overflow-x-auto">
                <div className="flex flex-col gap-4 h-full">
                    <div className="grid grid-cols-3 gap-4">
                        <DashboardHeader userName={user.name} imgPath="/admin-pic.png" />
                        <DashboardProfile userName={user.name} imgPath={user.avatar} type={user.role} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 grid grid-cols-3 gap-4 h-50">
                            <DashboardCard 
                                icon={faShieldHalved} 
                                title={"Administradores"} 
                                color="0D6EFD"
                                route="/admin/admins"
                            />
                            <DashboardCard 
                                icon={faStethoscope} 
                                title={"Doutores"} 
                                color="198754"
                                route="/admin/doctors"
                            />
                            <DashboardCard 
                                icon={faIdBadge} 
                                title={"Recepcionistas"} 
                                color="6F42C1"
                                route="/admin/receptionists"
                            />
                        </div>
                        <DashboardPieChart
                            title="Usuários do Sistema"
                            labels={['Administradores', 'Doutores', 'Recepcionistas']}
                            data={[stats.total_admins, stats.total_doctors, stats.total_receptionists]}
                            colors={['0D6EFD', '198754', '6F42C1']}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <DashboardTotal currentTotal={6000.99} previousTotal={9000}/>
                        <DashboardMonthlySales
                            title="Vendas Mensais"
                            labels={['Venda 1', 'Venda 2', 'Venda 3', 'Venda 4', 'Venda 5']}
                            data={[300, 450, 200, 580, 390]}
                            barColors={['03045e', '0077b6', '00b4d8', '90e0ef', '84bcda']}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}