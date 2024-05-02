import React, { useState } from 'react';
import './Dashboard.css'; 

const Dashboard = () => {
  const [selectedCell, setSelectedCell] = useState(null);

  const handleCellClick = (rowIndex, colIndex) => {
    setSelectedCell(`Clicked: Row ${rowIndex + 1}, Column ${colIndex + 1}`);
  };

  const generateCombinedTable = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDay = new Date(currentYear, currentMonth, 1).getDay();

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysInMonthArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    const driverHeaders = [
      'Driver Name',
      'Vehicle Type',
      'Plate No.',
      'Contact No.',
      'No. of Seats',
    ];

    const driversData = Array.from({ length: 20 }, (_, rowIndex) => [
      `Driver ${rowIndex + 1}`,
      'Sedan',
      `ABC${rowIndex + 1}`,
      `09265665891${rowIndex}`,
      4,
    ]);

    const tableRows = [];

    tableRows.push(
      <tr key={0}>
        {driverHeaders.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
        {daysInMonthArray.map((day, index) => (
          <th
            key={index + driverHeaders.length}
            onClick={() => handleCellClick(0, index + driverHeaders.length)}
            className={
              selectedCell ===
              `Clicked: Row 1, Column ${index + driverHeaders.length + 1}`
                ? 'selected'
                : ''
            }
          >
            {day}
            <br />
            {daysOfWeek[(startDay + index) % 7]}
          </th>
        ))}
      </tr>
    );

    for (let rowIndex = 1; rowIndex < 21; rowIndex++) {
      const cells = [];

      for (let colIndex = 0; colIndex < driverHeaders.length + daysInMonth; colIndex++) {
        const content =
          rowIndex === 0
            ? driverHeaders[colIndex]
            : colIndex < driverHeaders.length
            ? driversData[rowIndex - 1][colIndex]
            : '';

        cells.push(
          <td
            key={colIndex}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            className={
              selectedCell ===
              `Clicked: Row ${rowIndex + 1}, Column ${colIndex + 1}`
                ? 'selected'
                : ''
            }
          >
            {content}
          </td>
        );
      }

      tableRows.push(<tr key={rowIndex}>{cells}</tr>);
    }

    return (
      <div className='container'>
        <h2>SCHEDULE OF TRAVELS 2024</h2>
        <table border="1" className="combined-table">
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="dashboardcontent">
      {generateCombinedTable()}
      {selectedCell && <p>{selectedCell}</p>}
    </div>
  );
};

export default Dashboard;


