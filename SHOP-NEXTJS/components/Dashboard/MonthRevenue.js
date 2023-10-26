import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
export default function MonthRevenue() {
  const monthOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data:
            //  labels.map(() => [100,600,100,100,100,100,100]),
            [100,600,100,100,100,100,100],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          
        ],
      };

  return (
    <div>
      <Bar options={monthOptions} data={data} />;
    </div>
  );
}
