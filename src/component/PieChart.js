import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData, handleOptions, compareOptions }) {
  console.log(chartData.labels.length);
  return (
    <>
      {chartData.labels.length > 0 && (
        <>
          <div className="chart-container">
            <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
            <Pie
              data={chartData}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: `${compareOptions} Chart`,
                  },
                },
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
export default PieChart;
