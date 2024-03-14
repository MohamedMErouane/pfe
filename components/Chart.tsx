import { useEffect } from "react";
import Chart from "chart.js";
import styles from '../styles/styles.module.css';

interface ChartComponentProps {
  studyData: number[];
}

function ChartComponent({ studyData }: ChartComponentProps) {
  useEffect(() => {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
          data: studyData,
          label: "Study Hours",
          borderColor: "#3e95cd",
          backgroundColor: "#7bb6dd",
          fill: false,
        }]
      },
    });

    canvas.style.width = "100%";
    canvas.style.height = "auto";
    
    return () => {
      myChart.destroy();
    };
  }, [studyData]);

  return (
    <>
      <h1 className={`w-[110px] mx-auto mt-10 text-xl font-semibold capitalize ${styles.title}`}>Study States</h1>
      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className='border border-gray-400 pt-0 rounded-xl w-full h-fit my-auto shadow-xl'>
          <canvas id='myChart'></canvas>
        </div>
      </div>
    </>
  );
}

export default ChartComponent;
