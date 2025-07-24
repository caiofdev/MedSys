import { useEffect, useState } from 'react';

export default function LocalDateTime() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <span className='flex items-center gap-2'>
            <div>{date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })} </div>
            <p> - </p>
            <div>
                {date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
            </div>
        </span>
    );
}