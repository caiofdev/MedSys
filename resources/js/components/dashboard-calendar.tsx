import { useState } from "react";
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
        const fullDate = date;

        days.push({ dayNumber, weekDay, isToday, month, fullDate });
    }

    return days;
}

const appointments = [
    { appointment_date: new Date("2025-07-30T10:00:00"), title: "Consulta Luiza", color: "D63384" },
    { appointment_date: new Date("2025-07-30T12:00:00"), title: "Consulta Vitor", color: "0D6EFD" },
    { appointment_date: new Date("2025-08-01T16:00:00"), title: "Consulta Leticia", color: "FD7E14" },
];

const user = {
    id: "1",
    name: "Doctor",
    appointments: appointments.map(app => ({
        appointment_date: new Date(app.appointment_date),
        title: app.title,
        color: app.color
    }))
};

function isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
}

export default function DashboardCalendar({ title }: DashboardCalendarProps) {
    const weekDays = getCurrentWeekDays();
    const [selectedDay, setSelectedDay] = useState<Date | null>(new Date());

    const getAppointmentsForDay = (day: Date | null) => {
        if (!day) return [];
        
        return user.appointments.filter(appointment => 
            isSameDay(appointment.appointment_date, day)
        );
    };

    const handleDayClick = (date: Date) => {
        setSelectedDay(date);
    };

    const appointmentsToShow = getAppointmentsForDay(selectedDay);

    return (
        <div className="flex flex-col col-span-1 overflow-hidden rounded-xl" style={{ backgroundColor: '#C0C4CE' }}>
            <div className='flex flex-col justify-center h-full'>
                <div className='flex p-2 pl-3 rounded-xl justify-between' style={{ backgroundColor: '#030D29' }}>
                    <p className='flex text-xl text-white font-bold'>{title}</p>
                    <p className='flex text-xl text-white font-light'>{weekDays[0].month.toUpperCase()}</p>
                </div>
                <div className='flex flex-col justify-center items-center h-full w-full'>
                    <div className='flex w-full h-full gap-2 p-2 rounded-b-2xl'>
                        {weekDays.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-auto h-fit w-full">
                                <div 
                                    className="flex flex-col items-center gap-auto p-2 rounded-3xl cursor-pointer transition-colors" 
                                    onClick={() => handleDayClick(item.fullDate)}
                                    style={{ 
                                        backgroundColor: selectedDay && isSameDay(selectedDay, item.fullDate) 
                                            ? '#030D29' 
                                            : item.isToday 
                                            ? '#D3D3D3' 
                                            : 'transparent' 
                                    }}
                                >
                                    <span 
                                        className={`text-sm capitalize ${
                                            selectedDay && isSameDay(selectedDay, item.fullDate) ? 'text-white' : 'text-black'
                                        }`}
                                    >
                                        {item.weekDay}
                                    </span>
                                    <span 
                                        className={`text-2xl font-semibold ${
                                            selectedDay && isSameDay(selectedDay, item.fullDate) ? 'text-white' : 'text-black'
                                        }`}
                                    >
                                        {item.dayNumber}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className='flex flex-col w-full h-full justify-self-start justify-center gap-0 rounded-b-2xl border-t-1 border-b-1 p-2' style={{ backgroundColor: '#F7F2EB' }}>
                        {appointmentsToShow.length > 0 ? (
                            appointmentsToShow.map((appointment, index) => (
                                <DashboardAppointment
                                    key={index}
                                    time={appointment.appointment_date.toLocaleTimeString('pt-BR', { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                    })}
                                    title={appointment.title}
                                    color={appointment.color}
                                />
                            ))
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-gray-500">Nenhuma consulta agendada para este dia</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}