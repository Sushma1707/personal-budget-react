import React, { useState , useEffect} from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';
import HomePage from './HomePage/Homepage';
import Footer from './Footer/Footer';
import PieChart from './PieChart/PieChart';


import axios from 'axios';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import PieChartD3 from './PieChart/PieChartD3';
ChartJS.register(ArcElement, Tooltip, Legend);

function App() {

  const [dataSource,setDataSource] = useState({
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#ffcd56",
          "#ff6384",
          "#36a2eb",
          "#fd6b19",
          "#83FF33",
          "#F633FF",
          "#FF3333",
          "#03366f"
        ],
      },
    ],
    labels: []
  })
  const [dataSourceNew,setDataSourceNew] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/myBudget')
      .then((res) => {
        setDataSourceNew(res.data.myBudget);
        setDataSource({
          datasets: [
            {
              data: res.data.myBudget.map((v)=>v.budget),
              backgroundColor: [
                "#ffcd56",
                "#ff6384",
                "#36a2eb",
                "#fd6b19",
                "#83FF33",
                "#F633FF",
                "#FF3333",
                "#03366f"
              ],
            },
          ],
          labels: res.data.myBudget.map((v)=>v.title)
        })
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <Router>
      <Menu />
      <Hero />
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <center>
        <PieChart dataSource={dataSource} />
        <PieChartD3 dataSource={dataSourceNew}/>
        </center>
      </div>

      <Footer />
    </Router>
  );
}

export default App;