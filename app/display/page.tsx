'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/constants';

// Simple type for our form data
type FormEntry = {
  id: string;
  name: string;
  email: string;
  age: number;
  message: string;
};

export default function DisplayPage() {
  // Simple state variables
  const [entries, setEntries] = useState<FormEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingEntry, setEditingEntry] = useState<FormEntry | null>(null);

  // Simple function to get all entries
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/data`);
      setEntries(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  // Load data when page opens
  useEffect(() => {
    fetchData();
  }, []);

  // Simple function to delete an entry
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await axios.delete(`${API_URL}/data/${id}`);
        setEntries(entries.filter(entry => entry.id !== id));
      } catch (err) {
        setError('Failed to delete entry');
      }
    }
  };

  // Simple function to start editing
  const handleEdit = (entry: FormEntry) => {
    setEditingEntry(entry);
  };

  // Simple function to update an entry
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEntry) return;

    try {
      const response = await axios.put(
        `${API_URL}/data/${editingEntry.id}`,
        editingEntry
      );
      setEntries(entries.map(entry => 
        entry.id === editingEntry.id ? response.data.data : entry
      ));
      setEditingEntry(null);
    } catch (err) {
      setError('Failed to update entry');
    }
  };

  // Show loading message
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Show error message
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="table-container">
      <h1 className="table-title">Submitted Entries</h1>
      
      {/* Edit form */}
      {editingEntry && (
        <div className="form-container">
          <h2 className="form-title">Edit Entry</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                value={editingEntry.name}
                onChange={(e) => setEditingEntry({...editingEntry, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={editingEntry.email}
                onChange={(e) => setEditingEntry({...editingEntry, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-input"
                value={editingEntry.age}
                onChange={(e) => setEditingEntry({...editingEntry, age: Number(e.target.value)})}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-input"
                value={editingEntry.message}
                onChange={(e) => setEditingEntry({...editingEntry, message: e.target.value})}
                rows={4}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="submit-button">Update</button>
              <button 
                type="button" 
                className="submit-button" 
                style={{ marginTop: '10px', backgroundColor: '#dc3545' }}
                onClick={() => setEditingEntry(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Display entries in a table */}
      {entries.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.name}</td>
                <td>{entry.email}</td>
                <td>{entry.age}</td>
                <td>{entry.message}</td>
                <td>
                  <button 
                    className="action-button edit"
                    onClick={() => handleEdit(entry)}
                  >
                    Edit
                  </button>
                  <button 
                    className="action-button delete"
                    onClick={() => handleDelete(entry.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-state">
          <p>No entries found</p>
          <p>Be the first to submit a form!</p>
        </div>
      )}
    </div>
  );
} 