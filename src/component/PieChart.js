import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData, compareOptions }) {
  return (
    <>
      {chartData.labels.length > 0 && (
        <>
          <div className="chart-container">
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
