import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";


const VehicleManager = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState({
    id: "",
    number: "",
    model: "",
    brand: "",
    type: "",
    color: "",
    ownerName: "",
    registrationDate: "",
  });
  const [idToFetch, setIdToFetch] = useState("");
  const [fetchedVehicle, setFetchedVehicle] = useState(null);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

   const baseUrl = `${import.meta.env.VITE_API_URL}/vehicleapi`;


  useEffect(() => {
    fetchAllVehicles();
  }, []);

  const fetchAllVehicles = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`); 
      setVehicles(res.data);
    } catch (error) {
      setMessage("Failed to fetch vehicles.");
    }
  };

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in vehicle) {
      if (!vehicle[key] || vehicle[key].toString().trim() === "") {
        setMessage(`Please fill out the ${key} field.`); 
        return false;
      }
    }
    return true;
  };

  const addVehicle = async () => {
    if (!validateForm()) return;
    try {
      const payload = { ...vehicle, id: parseInt(vehicle.id) };
      await axios.post(`${baseUrl}/add`, payload);
      setMessage("Vehicle added successfully.");
      fetchAllVehicles();
      resetForm();
    } catch (error) {
      setMessage("Error adding vehicle.");
    }
  };

  const updateVehicle = async () => {
    if (!validateForm()) return;
    try {
      const payload = { ...vehicle, id: parseInt(vehicle.id) };
      await axios.put(`${baseUrl}/update`, payload); 
      setMessage("Vehicle updated successfully.");
      fetchAllVehicles();
      resetForm();
    } catch (error) {
      setMessage("Error updating vehicle.");
    }
  };

  const deleteVehicle = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`); 
      setMessage(res.data);
      fetchAllVehicles();
    } catch (error) {
      setMessage("Error deleting vehicle.");
    }
  };

  const getVehicleById = async () => {
    if (!idToFetch) return;
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`); 
      setFetchedVehicle(res.data);
      setMessage("");
    } catch (error) {
      setFetchedVehicle(null);
      setMessage("Vehicle not found.");
    }
  };

  const handleEdit = (v) => {
    setVehicle(v);
    setEditMode(true);
    setMessage(`Editing vehicle with ID ${v.id}`); 
  };

  const resetForm = () => {
    setVehicle({
      id: "",
      number: "",
      model: "",
      brand: "",
      type: "",
      color: "",
      ownerName: "",
      registrationDate: "",
    });
    setEditMode(false);
  };

  return (
    <div className="vehicle-container">
      {message && (
        <div
          className={`vehicle-message ${
            message.toLowerCase().includes("error") ||
            message.toLowerCase().includes("not")
              ? "error"
              : "success"
          }`}
        >
          {message}
        </div>
      )}

      <h2>Vehicle Management Dashboard</h2>

      {/* ===== Two Columns: Add/Edit | Fetch/Delete ===== */}
      <div className="vehicle-columns">
        {/* Left Column: Add/Edit */}
        <div className="vehicle-column">
          <div className="vehicle-form">
            <h3>{editMode ? "Edit Vehicle" : "Add New Vehicle"}</h3>
            <div className="vehicle-grid">
              <input
                type="number"
                name="id"
                placeholder="Vehicle ID"
                value={vehicle.id}
                onChange={handleChange}
                disabled={editMode} // optional: disable ID in edit mode
              />
              <input type="text" name="number" placeholder="Vehicle Number" value={vehicle.number} onChange={handleChange} />
              <input type="text" name="model" placeholder="Model" value={vehicle.model} onChange={handleChange} />
              <input type="text" name="brand" placeholder="Brand" value={vehicle.brand} onChange={handleChange} />
              <input type="text" name="type" placeholder="Type (Car/Bike)" value={vehicle.type} onChange={handleChange} />
              <input type="text" name="color" placeholder="Color" value={vehicle.color} onChange={handleChange} />
              <input type="text" name="ownerName" placeholder="Owner Name" value={vehicle.ownerName} onChange={handleChange} />
              <input type="text" name="registrationDate" placeholder="Registration Date" value={vehicle.registrationDate} onChange={handleChange} />
            </div>

            <div className="vehicle-btn-group">
              {!editMode ? (
                <button className="vehicle-btn btn-add" onClick={addVehicle}>Add Vehicle</button>
              ) : (
                <>
                  <button className="vehicle-btn btn-update" onClick={updateVehicle}>Update Vehicle</button>
                  <button className="vehicle-btn btn-cancel" onClick={resetForm}>Cancel</button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Fetch/Delete */}
        <div className="vehicle-column">
          <div className="vehicle-form fetch">
            <h3>Fetch Vehicle by ID</h3>
            <div className="vehicle-grid small">
              <input type="number" placeholder="Enter Vehicle ID" value={idToFetch} onChange={(e) => setIdToFetch(e.target.value)} />
              <button className="vehicle-btn btn-update" onClick={getVehicleById}>Fetch</button>
            </div>
            {fetchedVehicle && (
              <div className="vehicle-card">
                <h4>Vehicle Found:</h4>
                <pre>{JSON.stringify(fetchedVehicle, null, 2)}</pre>
                <button className="vehicle-btn btn-delete" onClick={() => deleteVehicle(fetchedVehicle.id)}>Delete</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== Vehicle Table ===== */}
      <div className="vehicle-form">
        <h3>All Vehicles</h3>
        {vehicles.length === 0 ? (
          <p>No vehicles found.</p>
        ) : (
          <table className="vehicle-table">
            <thead>
              <tr>
                {Object.keys(vehicle).map((key) => (
                  <th key={key}>{key}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id}>
                  {Object.keys(vehicle).map((key) => (
                    <td key={key}>{v[key]}</td>
                  ))}
                  <td>
                    <button className="vehicle-btn btn-update" onClick={() => handleEdit(v)}>Edit</button>
                    <button className="vehicle-btn btn-delete" onClick={() => deleteVehicle(v.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VehicleManager;
