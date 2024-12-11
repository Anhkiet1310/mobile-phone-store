import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ManagerPhone = () => {
    const [phones, setPhones] = useState([]);
    const [form, setForm] = useState({ name: '', price: '', brand: '' });
    const [editingId, setEditingId] = useState(null);
    const [isSidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };
  
       

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Add or update phone
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    // Delete phone
    const handleDelete = (id) => {
        console.log(id);
    };

    // Set form for editing
    const handleEdit = (phone) => {
        setForm(phone);
        setEditingId(phone.id);
    };

    const navigate = useNavigate();
    return (
    <div>
        <div className="dashboard-container">
      {/* Left Sidebar */}
      <div className={`left-sidebar ${isSidebarExpanded ? "expanded" : "collapsed"}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarExpanded ? "⟨" : "⟩"}
        </button>
        <h3 className="sidebar-title">Menu</h3>
        <ul className="sidebar-list">
          <li className="sidebar-item" onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li className="sidebar-item">Products</li>
        </ul>
      </div>

        <div className="dashboard-body" >
        <div className="container-fluid">
            <div className="row">
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Phone Manager</h1>
            <form onSubmit={handleSubmit} className="mb-6 space-y-4">
                <input 
                    type="text" 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    placeholder="Phone Name" 
                    className="input"
                    required 
                />
                <input 
                    type="number" 
                    name="price" 
                    value={form.price} 
                    onChange={handleChange} 
                    placeholder="Price" 
                    className="input"
                    required 
                />
                <input 
                    type="text" 
                    name="brand" 
                    value={form.brand} 
                    onChange={handleChange} 
                    placeholder="Brand" 
                    className="input"
                    required 
                />
                <button type="submit" className="btn">{editingId ? 'Update' : 'Add'}</button>
            </form>
            <table className="table-auto w-full border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Brand</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {phones.map(phone => (
                        <tr key={phone.id}>
                            <td className="border px-4 py-2">{phone.name}</td>
                            <td className="border px-4 py-2">{phone.price}</td>
                            <td className="border px-4 py-2">{phone.brand}</td>
                            <td className="border px-4 py-2 space-x-2">
                                <button onClick={() => handleEdit(phone)} className="btn">Edit</button>
                                <button onClick={() => handleDelete(phone.id)} className="btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            </div>
            </div>
        </div>
        </div>
        </div>
    );
};

export default ManagerPhone;
