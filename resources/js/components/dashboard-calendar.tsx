import DashboardAppointment from "./dashboard-appointment";

type DashboardCalendarProps = {
    title: string;
}

function getCurrentWeekDays() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const days = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + mondayOffset + i);

        const dayNumber = date.getDate();
        const weekDay = date.toLocaleDateString('pt-BR', { weekday: 'short' });
        const month = date.toLocaleDateString('pt-BR', { month: 'short' });
        const isToday = date.toDateString() === today.toDateString();

        days.push({ dayNumber, weekDay, isToday, month});
    }

    return days;
}


export default function DashboardCalendar({ title }: DashboardCalendarProps) {
    const weekDays = getCurrentWeekDays();
    return (
        <div className="flex flex-col col-span-1 overflow-hidden rounded-xl" style={{ backgroundColor: '#C0C4CE' }}>
            <div className='flex flex-col justify-center h-full'>
                <div className='flex p-2 pl-3 rounded-xl justify-between' style={{ backgroundColor: '#030D29' }}>
                    <p className='flex text-xl text-white font-bold'>{title}</p>
                    <p className='flex text-xl text-white font-ligth'>{weekDays[0].month.toUpperCase()}</p>
                </div>
                <div className='flex flex-col justify-center items-center h-full w-full'>
                    <div className='flex w-full h-full gap-2 p-2 rounded-b-2xl'>
                        {weekDays.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-auto h-fit w-full">
                                <div className="flex flex-col items-center gap-auto p-2 rounded-3xl cursor-pointer">
                                    <span className="text-sm capitalize">{item.weekDay}</span>
                                    <span className="text-2xl font-semibold">{item.dayNumber}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col w-full h-full justify-self-start justify-center gap-0 rounded-b-2xl border-t-1 border-b-1'style={{ backgroundColor: '#F7F2EB' }}>
                        <DashboardAppointment time="10:00" title="Consulta Luiza" color="D63384" />
                        <DashboardAppointment time="12:00" title="Consulta Vitor" color="0D6EFD" />
                        <DashboardAppointment time="16:00" title="Consulta Leticia" color="FD7E14" />
                    </div>
                </div>
            </div>
        </div>
    );
}