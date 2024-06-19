import React from 'react';
import "./body.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../SIDESECTION/SideBar Section/Sidebar"
import img from '../../Assets/user (3).png'
import video2 from "../../Assets/voole/video.mp4";
import "../../Admindash2/Admindash2.css"
import Chart from 'react-apexcharts';

const Body = () => {


  const pieOptions = {
    labels: ['Hotels', 'Evenements', 'Destinations', 'Blogs', 'Offres', 'Utilisateurs'],
    responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' }}}]
  };
  const pieSeries = [120, 80, 50, 30, 70, 200];

  const barOptions = {
    chart: { id: 'basic-bar' },
    xaxis: { categories: ['Hotel A', 'Hotel B', 'Hotel C', 'Hotel D', 'Hotel E'] }
  };
  const barSeries = [{ name: 'Booking count', data: [150, 100, 75, 50, 25] }];

  const lineOptions = {
    chart: { id: 'basic-line' },
    xaxis: { categories: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05'] }
  };
  const lineSeries = [
    { name: 'Hotels', data: [4, 7, 2, 6, 8] },
    { name: 'Evenements', data: [5, 9, 4, 7, 3] },
    { name: 'Destinations', data: [3, 4, 6, 2, 5] }
  ];
  
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <div className="admindash2">
      <Sidebar />
      <div className="topSection">
        <div className="headerSection flex">
          <div className="title">
            <h1>Welcome to Oceana's World</h1>
            <p>Hello Admin , Welcome back </p>
          </div>
        </div>

        <div className="cardSection flex">
        <div className="rightCard">
  <div className="videoDiv">
    <video src={video2} autoPlay loop muted className="customVideo"></video>

    <div className="videoContent">
      <h1>Create and sell extraordinary</h1>
      <p>Remember that you are the world's travel king</p>
      <div className="buttons">
        <button className="btn transparent" onClick={navigateToHome}> Back to Home</button>
      </div>
    </div>
  </div>
</div>



        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      
        <Chart options={pieOptions} series={pieSeries} type="pie" width="380" />
        
       
        <Chart options={barOptions} series={barSeries} type="bar" width="500" />

       
        <Chart options={lineOptions} series={lineSeries} type="line" width="500" />
      </div>

       
      </div>
    </div>
  );
};

export default Body;
