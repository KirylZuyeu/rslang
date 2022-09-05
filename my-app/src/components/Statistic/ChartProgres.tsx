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

export default function ChartProgres(props:any) {
  
  const datesASD = Object.entries(props.settings.optional.longTimeStatistic).map(([key, value]) => ({key,value}))
  
  const arrDates = datesASD.sort(
    (objA, objB) => new Date(objA.key).getTime() - new Date(objB.key).getTime(),
  );
  const options: any = {
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
        text: 'Увеличение общего количества изученных слов за весь период обучения по дням',
        font: {
          size: '30',
          family: 'Arial, Helvetica, sans-serif',
          weight: 'bold'
        },
      },
    },
  };

  const labels = [...arrDates.map(item => item.key)];

  let prev:number;

  const countOfLearningWords = [...arrDates.map(item => (item.value as any).learnedWords)].map(item => {
    const val = item - (prev || 0);
    prev = item;
    item = val;
    return item > 0 ? item : 0;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Количество слов - прогресс',
        data: countOfLearningWords,
        backgroundColor: 'rgba(115, 59, 182, 0.5)',
      },
    ],
  };

  
  return <Bar options={options as any} data={data as any} />;
}
