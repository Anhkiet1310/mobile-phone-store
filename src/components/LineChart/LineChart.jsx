import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart(isAdmin = false) {
  const [chartData, setChartData] = useState(null);
  const token = localStorage.getItem("token");
  const shop_id = JSON.parse(atob(token.split(".")[1])).shop_id;

  useEffect(() => {
    const mockData = {
      weeks: [
        { week: "week1", totalRevenue: 0, orderCount: 0 },
        { week: "week2", totalRevenue: 0, orderCount: 0 },
        { week: "week3", totalRevenue: 0, orderCount: 0 },
        { week: "week4", totalRevenue: 0, orderCount: 0 },
        { week: "week5", totalRevenue: 0, orderCount: 0 },
      ],
    };

    const weeks = mockData.weeks.map((week) => week.week);
    let totalRevenue = isAdmin
      ? mockData.weeks.map((week) => week.totalRevenue * 0.05) // Scaled revenue
      : mockData.weeks.map((week) => week.totalRevenue);
    const orderCount = mockData.weeks.map((week) => week.orderCount);

    setChartData({
      labels: weeks,
      datasets: [
        {
          label: "Revenue",
          data: totalRevenue,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          yAxisID: "y-revenue",
        },
        {
          label: "Order",
          data: orderCount,
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderWidth: 2,
          yAxisID: "y-order",
        },
      ],
    });
  }, [isAdmin]);

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  return (
    <div
      className="mt-5 d-flex justify-content-center"
      style={{ height: "50%", width: "50%" }}
    >
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: "Weekly Revenue and Order Count",
            },
          },
          scales: {
            "y-revenue": {
              type: "linear",
              position: "left",
              title: {
                display: true,
                text: "Revenue",
              },
            },
            "y-order": {
              type: "linear",
              position: "right",
              title: {
                display: true,
                text: "Order",
              },
              min: 0, // Ensure the minimum value is 0
              max: Math.max(...chartData.datasets[1].data) + 5, // Add a buffer above the max order count
              grid: {
                drawOnChartArea: false, // Avoid grid lines overlap
              },
            },
          },
        }}
      />
    </div>
  );
}