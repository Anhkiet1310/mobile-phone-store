import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function CircleChart() {
    const data = {
        labels: ['Hai shop', 'Thao Shop', 'Vy Shop', 'Others'],
        datasets: [
            {
                label: 'revenue',
                data: [41, 19, 15, 25], // Replace with your fake data
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Doughnut Chart',
            },
        },
    };

    return (
        <div className='mt-5 d-flex justify-content-center' style={{ height: '30%', width: '30%', marginLeft: '6em' }}>
            <Doughnut data={data} options={options} />
        </div>
    );
};
