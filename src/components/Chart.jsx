/* eslint-disable react/prop-types */
// src/components/Chart.jsx

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ chartData }) => {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Candlestick Data",
        data: chartData.data,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default Chart;
