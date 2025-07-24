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

export default function AdminDashboard() {
    return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-6 pr-10 pl-10 overflow-x-auto">
                <div className="flex flex-col gap-4 h-full">
                    <div className="grid grid-cols-3 gap-4">
                        <DashboardHeader userName="Caio Fernandes" imgPath="/admin-pic.png" />
                        <DashboardProfile userName="Caio Fernandes" imgPath="/default-user.png" type='ADMINISTRADOR' />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 grid grid-cols-3 gap-4 h-50">
                            <DashboardCard icon={faShieldHalved} title="Administradores" color="0D6EFD"/>
                            <DashboardCard icon={faStethoscope} title="Doutores" color="198754"/>
                            <DashboardCard icon={faIdBadge} title="Recepcionistas" color="6F42C1"/>
                        </div>
                        <DashboardPieChart
                            title="Usuários do Sistema"
                            labels={['Administradores', 'Doutores', 'Recepcionistas']}
                            data={[2, 10, 5]}
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
