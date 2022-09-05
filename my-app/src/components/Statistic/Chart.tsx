import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartBar(props:any) {
  const datesASD = Object.entries(props.settings.optional.longTimeStatistic).map(([key, value]) => ({key,value}))
  const arrDates = datesASD.sort(
    (objA, objB) => new Date(objA.key).getTime() - new Date(objB.key).getTime(),
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          // This more specific font property overrides the global property
          font: {
              size: 20
          }
      }
      },
      title: {
        display: true,
        text: 'Количество новых слов за каждый день изучения',
        font: {
          size: '30',
          family: 'Arial, Helvetica, sans-serif',
          weight: 'bold'
        },
      },
    },
  };

  const labels = [...arrDates.map(item => item.key)];
  const countOfLearningWords = [...arrDates.map(item => (item.value as any).learnedWords)];
  const data = {
    labels,
    datasets: [
      {
        label: 'Количество слов',
        data: countOfLearningWords,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  
  return <Bar options={options as any} data={data as any} />;
}
