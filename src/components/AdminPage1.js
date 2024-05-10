import React, { useState, useRef, useEffect } from 'react';
import './AdminPage1.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom';



const AdminPage1 = () => {
  const navigate = useNavigate();

  const [selectedCell, setSelectedCell] = useState(null);
  const [newDriver, setNewDriver] = useState({
    idNo: '',
    name: '',
    vehicleType: '',
    plateNo: '',
    contactNo: '',
    seats: '',
    startDate: '',
    endDate: '',
  });
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [drivers, setDrivers] = useState([]); // State to store submitted drivers
  const [highlightedDays, setHighlightedDays] = useState({}); // State to store highlighted days
  const [selectedDriverIndex, setSelectedDriverIndex] = useState(-1); // State to store the index of the selected driver
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowAddDriverModal(false);
        setShowAddScheduleModal(false);
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
    setShowAddDriverModal(true);
  };

  const handleAddSchedule = () => {
    if (drivers.length === 0) {
      alert("There are no drivers to add a schedule for.");
      return;
    }
    setShowAddScheduleModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (showAddDriverModal) {
      // Add the new driver to the list of drivers
      setDrivers([...drivers, newDriver]);
      console.log('New driver added:', newDriver);
      // Clear the form fields after adding the driver
      setNewDriver({
        idNo: '',
        name: '',
        vehicleType: '',
        plateNo: '',
        contactNo: '',
        seats: '',
        startDate: '',
        endDate: '',
      });
      setShowAddDriverModal(false);
      // Highlight the row of the added driver
      setSelectedDriverIndex(drivers.length);
    } else if (showAddScheduleModal) {
      // Check if the selected driver exists
      const selectedDriver = drivers.find(driver => driver.name === newDriver.name);
      if (!selectedDriver) {
        alert("Selected driver does not exist.");
        return;
      }
      // Highlight the start and end days in the row of the selected driver
      const { startDate, endDate } = newDriver;
      const startDay = new Date(startDate).getDate();
      const endDay = new Date(endDate).getDate();
      const highlightedDaysArray = Array.from({ length: endDay - startDay + 1 }, (_, index) => startDay + index);
      setHighlightedDays({
        driverIndex: drivers.indexOf(selectedDriver),
        days: highlightedDaysArray,
      });
      setSelectedDriverIndex(drivers.indexOf(selectedDriver)); // Set the selected driver index
    }
    setShowAddScheduleModal(false); // Close the modal after submission
  };

  const handleSignout =() =>{
    signOut(auth).then(val=>{
      navigate('/')
    })
  }

  const currentDate = new Date();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const daysOfMonth = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  return (
    <div className="dashboardcontent">
      <div className="container center">
        <h2>SCHEDULE OF TRAVELS 2024</h2>
        <table className="drivers-table">
          <thead>
            <tr>
              <th style={{ width: '10%', textAlign: 'center' }}>ID No.</th>
              <th style={{ width: '50%', textAlign: 'center' }}>Driver's Name</th>
              <th style={{ width: '15%', textAlign: 'center' }}>Vehicle Type</th>
              <th style={{ width: '15%', textAlign: 'center' }}>Plate No.</th>
              <th style={{ width: '20%', textAlign: 'center' }}>Contact No.</th>
              <th style={{ width: '15%', textAlign: 'center' }}>No. of Seats</th>
              {daysOfMonth.map((day, index) => (
                <th
                  key={index + 1}
                  style={{
                    width: `${75 / daysInMonth}%`,
                    paddingLeft: '5px',
                    paddingRight: '5px',
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
              <tr key={index} className={selectedDriverIndex === index ? 'highlighted-row' : ''}>
                <td>{driver.idNo}</td>
                <td>{driver.name}</td>
                <td>{driver.vehicleType}</td>
                <td>{driver.plateNo}</td>
                <td>{driver.contactNo}</td>
                <td>{driver.seats}</td>
                {daysOfMonth.map((day, dayIndex) => (
                  <td
                    key={dayIndex}
                    style={{
                      backgroundColor: index === highlightedDays.driverIndex && highlightedDays.days.includes(day) ? 'lightblue' : 'transparent',
                    }}
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboardcontent">
        <button className="signout-btn" onClick={handleSignout}>Sign out</button>
      </div>

      <div className="add-driver">
        <button className='adddriverbtn' onClick={handleAddDriver}>Add Driver</button>
        <button onClick={handleAddSchedule}>Add Schedule</button>
         {showAddDriverModal && (
          <div className="modal-overlay">
            <div ref={modalRef} className="modal">
              <div className="modal-content">
                <form onSubmit={handleFormSubmit}>
                  <h2>Add New Driver</h2>
                  <input
                    type="text"
                    name="idNo"
                    value={newDriver.idNo}
                    onChange={handleInputChange}
                    placeholder="ID No."
                    required
                  />
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
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        )}
        {showAddScheduleModal && (
          <div className="modal-overlay">
            <div ref={modalRef} className="modal">
              <div className="modal-content">
                <form onSubmit={handleFormSubmit}>
                  <h2>Add New Schedule</h2>
                  <select
                    name="name"
                    value={newDriver.name}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Driver</option>
                    {drivers.map((driver, index) => (
                      <option key={index} value={driver.name}>{driver.name}</option>
                    ))}
                  </select>
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
