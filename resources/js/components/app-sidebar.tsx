// Exemplo alternativo - versão dinâmica que varia por tipo de usuário

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, UserCheck, Stethoscope, Shield, Calendar, FileText, Settings, ClipboardList, Activity, User, Bell, Play, ClipboardPlus } from 'lucide-react';
import AppLogo from './app-logo';

type UserRole = 'admin' | 'doctor' | 'receptionist' | 'patient';

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Admins',
        href: '/admin/admins',
        icon: Shield,
    },
    {
        title: 'Médicos',
        href: '/admin/doctors',
        icon: Stethoscope,
    },
    {
        title: 'Recepcionistas',
        href: '/admin/receptionists',
        icon: UserCheck,
    },
];

const doctorNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/doctor-dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Iniciar Atendimento',
        href: '/doctor/appointments',
        icon: Play,
    },
    {
        title: 'Prontuários',
        href: '/doctor/medical-records',
        icon: ClipboardList,
    },
    {
        title: 'Solicitar xExames',
        href: '/doctor/exams',
        icon: Activity,
    },
];

const receptionistNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/receptionist-dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Pacientes',
        href: '/receptionist/patients',
        icon: Users,
    },
    {
        title: 'Agendamentos',
        href: '/receptionist/appointments',
        icon: Calendar,
    },

    {
        title: 'Consultas',
        href: '/receptionist/appointments',
        icon: ClipboardPlus,
    },
    
];


function getNavItemsByRole(userRole: UserRole): NavItem[] {
    switch (userRole) {
        case 'admin':
            return adminNavItems;
        case 'doctor':
            return doctorNavItems;
        case 'receptionist':
            return receptionistNavItems;
        default:
            return adminNavItems; // fallback
    }
}

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

interface AppSidebarProps {
    userRole: UserRole;
}

export function AppSidebar({ userRole }: AppSidebarProps) {
    const navItems = getNavItemsByRole(userRole);
    
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>
            
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
