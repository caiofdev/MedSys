import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type BarChartProps = {
    title: string;
    labels: string[];
    data: number[];
    barColors: string[];
};

export default function DashboardMonthlySales({ title, labels, data, barColors }: BarChartProps) {
    const chartData = {
        labels,
        datasets: [
        {
            label: 'Vendas',
            data,
            backgroundColor: barColors.map(barColors => `#${barColors}`),
        },
        ],
    };

const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        x: {
            ticks: {
                color: 'gray',
                font: {
                    weight: 'bold',
                },
            },
            grid: {
                display: false,
            },
        },
        y: {
            ticks: {
                display: false,
            },
            grid: {
                display: false,       
            },
            border: {
                display: false,
            },  
        },
    },
};

    return (
        <div className="flex flex-col col-span-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border h-60" style={{ backgroundColor: '#F7F2EB' }}>
            <div className='flex flex-col justify-center'>
                <div className='flex p-2 pl-3 rounded-xl h-full' style={{ backgroundColor: '#030D29' }}>
                    <p className='text-xl text-white font-bold'>{title}</p>
                </div>
                <div className='flex flex-col h-full justify-center items-center'>
                    <div className='h-full p-4'>
                        <Bar data={chartData} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
}
