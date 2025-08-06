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
import DashboardMonthlyComparison from '@/components/dashboard-monthly-comparison';

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
    completed_consultations: {
        labels: string[];
        data: number[];
        total_value: number;
    };
    monthly_revenue: {
        current_month: {
            revenue: number;
            consultations_count: number;
            month_name: string;
            formatted_revenue: string;
        };
        previous_month: {
            revenue: number;
            consultations_count: number;
            month_name: string;
            formatted_revenue: string;
        };
        comparison: {
            revenue_difference: number;
            revenue_growth_percentage: number;
            consultations_difference: number;
            formatted_difference: string;
        };
        chart_data: number[];
        chart_labels: string[];
    };
}

export default function AdminDashboard({ 
    user, 
    stats, 
    recent_activities, 
    completed_consultations, 
    monthly_revenue 
}: AdminDashboardProps) {
    return (
    <AppLayout breadcrumbs={breadcrumbs} userRole="admin">
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
                        <DashboardTotal 
                            currentTotal={monthly_revenue?.current_month?.revenue || 0} 
                            previousTotal={monthly_revenue?.previous_month?.revenue || 0}
                        />
                        <DashboardMonthlySales
                            title="Últimas Vendas"
                            labels={completed_consultations?.labels || ['Sem dados']}
                            data={completed_consultations?.data || [0]}
                            barColors={['03045e', '0077b6', '00b4d8', '90e0ef', '84bcda']}
                            currency={true}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}