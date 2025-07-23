type DashboardTotalProps = {
    currentTotal: number;
    previousTotal: number;
}

const formatoBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export default function DashboardTotal( {currentTotal, previousTotal}: DashboardTotalProps ) {
    const difference = currentTotal- previousTotal;
    const change = (difference / previousTotal) * 100;
    const sign = change >= 0 ? '+' : '';
    const result = `${sign}${change.toFixed(2)}%`;
    return (
        <div className="flex flex-col col-span-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border" style={{ backgroundColor: '#F7F2EB' }}>
            <div className='flex flex-col justify-center h-full'>
                <div className='flex p-2 pl-3 rounded-xl' style={{ backgroundColor: '#030D29' }}>
                    <p className='text-xl text-white font-bold'>Total Mensal</p>
                </div>
                <div className='flex flex-col justify-center items-center h-full'>
                    <div className='flex w-fit'>
                        <p className='text-5xl'>{formatoBRL.format(currentTotal)}</p>
                    </div>
                    <div className='flex flex-col w-fit justify-self-start gap-0'>
                        <p className='font-light' 
                        style={{ color: change >= 0 ? 'green' : 'red' }}>
                            {`${result} vs. mês anterior`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}