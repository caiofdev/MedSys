import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type DashboardCardProps = {
    icon: IconDefinition,
    title: string,
    color: string,
};

export default function DashboardCard( { icon, title, color }: DashboardCardProps ) {
    return (
        <div className=" flex flex-col overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border h-full justify-center items-center gap-3 cursor-pointer hover:shadow-2xl hover:scale-102" style={{ backgroundColor: '#F7F2EB' }}>
            <div className='flex flex-col justify-center items-center'>
                <FontAwesomeIcon icon={icon} style={{ color: `#${color}` }} className="text-6xl" /> 
            </div>
            <div className='flex flex-col justify-center items-center'>
                <p>{title}</p>
            </div>
        </div>
    );
}