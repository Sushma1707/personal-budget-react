import React, { useEffect, useState } from "react";
import axios from "axios";
import PieChartD3 from "./PieChartD3"; // Ensure the correct import path

const BudgetData = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/budget") // Ensure this URL is correct
      .then((response) => {
        console.log("API Response:", response.data); // ✅ Debug API response
        setDataSource(response.data.myBudget); // ✅ Extract `myBudget` array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading budget data...</p>;
  if (error) return <p>Error loading data.</p>;

  return <PieChartD3 dataSource={dataSource} />;
};

export default BudgetData;
