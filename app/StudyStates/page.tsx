"use client"

import ChartComponent from "@/components/Chart";


const studyData = [3, 4, 5, 6, 2, 8, 4]; 

function App() {
  return (
    <div>
      <ChartComponent studyData={studyData} />
    </div>
  );
}

export default App;
