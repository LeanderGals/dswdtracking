import React, { useState, useRef, useEffect } from 'react';
import './AdminPage1.css';

const AdminPage1 = () => {
  const [selectedCell, setSelectedCell] = useState(null);
  const [newDriver, setNewDriver] = useState({
    name: '',
    vehicleType: '',
    plateNo: '',
    contactNo: '',
    seats: '',
    startDate: '',
    endDate: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [drivers, setDrivers] = useState([]); // State to store submitted drivers
  const [highlightedDays, setHighlightedDays] = useState([]); // State to store highlighted days
  const [highlightedRowIndex, setHighlightedRowIndex] = useState(-1); // State to store the index of the highlighted row
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCellClick = (rowIndex, colIndex) => {
    setSelectedCell(`Clicked: Row ${rowIndex + 1}, Column ${colIndex + 1}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDriver((prevState) => ({
      ...prevState,
      [name]: name === 'seats' ? parseInt(value) : value, // Parse seats as integer
    }));
  };

  const handleAddDriver = () => {
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add the new driver to the list of drivers
    setDrivers([...drivers, newDriver]);
    console.log('New driver added:', newDriver);
    // Clear the form fields after adding the driver
    setNewDriver({
      name: '',
      vehicleType: '',
      plateNo: '',
      contactNo: '',
      seats: '',
      startDate: '',
      endDate: '',
    });
    setShowModal(false); // Close the modal after submission

    // Highlight the row of the added driver
    setHighlightedRowIndex(drivers.length);
    
    // Highlight the start and end days
    const { startDate, endDate } = newDriver;
    const startDay = new Date(startDate).getDate();
    const endDay = new Date(endDate).getDate();
    const highlightedDaysArray = Array.from({ length: endDay - startDay + 1 }, (_, index) => startDay + index);
    setHighlightedDays(highlightedDaysArray);
  };

  const currentDate = new Date();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const daysOfMonth = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  return (
    <div className="dashboardcontent">
      <div className="container">
        <h2>SCHEDULE OF TRAVELS 2024</h2>
        <table className="drivers-table">
          <thead>
            <tr>
              <th style={{ width: '15%', paddingLeft: '10px', paddingRight: '10px' }}>Driver's Name</th>
              <th style={{ width: '15%', paddingLeft: '10px', paddingRight: '10px' }}>Vehicle Type</th>
              <th style={{ width: '15%', paddingLeft: '10px', paddingRight: '10px' }}>Plate No.</th>
              <th style={{ width: '15%', paddingLeft: '10px', paddingRight: '10px' }}>Contact No.</th>
              <th style={{ width: '10%', paddingLeft: '5px', paddingRight: '5px' }}>No. of Seats</th>
              {daysOfMonth.map((day, index) => (
                <th
                  key={index + 1}
                  style={{
                    width: `${75 / daysInMonth}%`,
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    backgroundColor: highlightedDays.includes(day) ? 'lightblue' : 'transparent',
                  }}
                  onClick={() => handleCellClick(0, index + 1)}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={index} className={highlightedRowIndex === index ? 'highlighted-row' : ''}>
                <td>{driver.name}</td>
                <td>{driver.vehicleType}</td>
                <td>{driver.plateNo}</td>
                <td>{driver.contactNo}</td>
                <td>{driver.seats}</td>
                {daysOfMonth.map((_, index) => (
                  <td key={index + 1}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="add-driver">
        <button onClick={handleAddDriver}>Add Driver</button>
        {showModal && (
          <div className="modal-overlay">
            <div ref={modalRef} className="modal">
              <div className="modal-content">
                <form onSubmit={handleFormSubmit}>
                  <h2>Add New Driver</h2>
                  <input
                    type="text"
                    name="name"
                    value={newDriver.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                  />
                  <input
                    type="text"
                    name="vehicleType"
                    value={newDriver.vehicleType}
                    onChange={handleInputChange}
                    placeholder="Vehicle Type"
                    required
                  />
                  <input
                    type="text"
                    name="plateNo"
                    value={newDriver.plateNo}
                    onChange={handleInputChange}
                    placeholder="Plate No."
                    required
                  />
                  <input
                    type="number"
                    name="contactNo"
                    value={newDriver.contactNo}
                    onChange={handleInputChange}
                    placeholder="Contact No."
                    required
                  />
                  <input
                    type="number"
                    name="seats"
                    value={newDriver.seats}
                    onChange={handleInputChange}
                    placeholder="No. of Seats"
                    required
                  />
                  <input
                    type="date"
                    name="startDate"
                    value={newDriver.startDate}
                    onChange={handleInputChange}
                    placeholder="Start Date"
                    required
                  />
                  <input
                    type="date"
                    name="endDate"
                    value={newDriver.endDate}
                    onChange={handleInputChange}
                    placeholder="End Date"
                    required
                  />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedCell && <p>{selectedCell}</p>}
    </div>
  );
};

export default AdminPage1;
