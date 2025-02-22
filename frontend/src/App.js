import React, { useEffect, useState } from 'react';
import { fetchData } from './api';
import Table from './components/Table'; // ✅ Corrected path

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      console.log('Fetched Data:', fetchedData); // Debugging
      setData(fetchedData);
    };

    getData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Data Dashboard</h1>

      <h2>Company Data</h2>
      {data.json_company_data && data.json_company_data.length > 0 ? (
        <Table data={data.json_company_data} />
      ) : (
        <p>No company data available.</p>
      )}

      <h2>Employee Data</h2>
      {data.json_employee_data && data.json_employee_data.length > 0 ? (
        <Table data={data.json_employee_data} />
      ) : (
        <p>No employee data available.</p>
      )}

      <h2>CSV Data</h2>
      {data.cleaned_csv && Object.keys(data.cleaned_csv).length > 0 ? (
        Object.entries(data.cleaned_csv).map(([key, records]) => (
          <div key={key}>
            <h3>{key}</h3>
            <Table data={records} />
          </div>
        ))
      ) : (
        <p>No CSV data available.</p>
      )}

      <h2>PDF Data</h2>
      {data.cleaned_pdf && Object.keys(data.cleaned_pdf).length > 0 ? (
        Object.entries(data.cleaned_pdf).map(([key, records]) => (
          <div key={key}>
            <h3>{key}</h3>
            <Table data={records} />
          </div>
        ))
      ) : (
        <p>No PDF data available.</p>
      )}

      <h2>PPTX Data</h2>
      {data.cleaned_pptx &&
      data.cleaned_pptx.pptx_tables &&
      Object.keys(data.cleaned_pptx.pptx_tables).length > 0 ? (
        Object.entries(data.cleaned_pptx.pptx_tables).map(([key, records]) => (
          <div key={key}>
            <h3>{key}</h3>
            <Table data={records} />
          </div>
        ))
      ) : (
        <p>No PPTX data available.</p>
      )}

      <h2>PPTX Slide Text</h2>
      {data.cleaned_pptx &&
      data.cleaned_pptx.pptx_text &&
      data.cleaned_pptx.pptx_text.length > 0 ? (
        <ul>
          {data.cleaned_pptx.pptx_text.map((slide, index) => (
            <li key={index}>
              <strong>Slide {slide.Slide}:</strong> {slide.Content}
            </li>
          ))}
        </ul>
      ) : (
        <p>No PPTX text available.</p>
      )}
    </div>
  );
}

export default App;
