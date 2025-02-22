import React, { useState } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from '@mui/material';

const Table = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  // Define columns dynamically based on keys in data
  const columns = React.useMemo(
    () =>
      Object.keys(data[0]).map((key) => ({
        Header: key,
        accessor: key,
      })),
    [data]
  );

  // State for search filter
  const [filterInput, setFilterInput] = useState('');

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
    state: { pageIndex },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    useGlobalFilter, // Enables search functionality
    usePagination // Enables pagination
  );

  // Handle search input change
  const handleFilterChange = (e) => {
    setFilterInput(e.target.value);
    setGlobalFilter(e.target.value);
  };

  return (
    <TableContainer component={Paper}>
      {/* Search Bar */}
      <div style={{ padding: '10px' }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={filterInput}
          onChange={handleFilterChange}
        />
      </div>

      {/* Table */}
      <MuiTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </MuiTable>

      {/* Pagination Controls */}
      <div style={{ padding: '10px', textAlign: 'center' }}>
        <Button
          onClick={previousPage}
          disabled={!canPreviousPage}
          variant="contained"
        >
          Previous
        </Button>
        <span style={{ margin: '0 10px' }}> Page {pageIndex + 1} </span>
        <Button onClick={nextPage} disabled={!canNextPage} variant="contained">
          Next
        </Button>
      </div>
    </TableContainer>
  );
};

export default Table;
