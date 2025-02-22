import React, { useEffect, useState } from 'react';
import { fetchData } from '../api'; // ✅ Use fetchData instead

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      const result = await fetchData(); // ✅ Use fetchData
      setData(result);
    }
    loadData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Processed Data Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
