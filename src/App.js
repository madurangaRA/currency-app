import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './App.css';

function App() {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      const rowData = Object.entries(data.rates).map(([currency, rate]) => ({ currency, rate }));
      setRowData(rowData);
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };

  const columnDefs = [
    { headerName: 'Currency', field: 'currency' },
    { headerName: 'Rate', field: 'rate' },
  ];

  return (
    <div className="App">
      <h1>Currency Information</h1>
      <div className="table-container">
        <div className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
