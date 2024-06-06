import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  
  const filteredData = data.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.address.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='mt-3'>
      <h3>Fetch Data from jsonplaceholder public Api</h3>
      
      
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name, email, or city"
        value={searchQuery}
        onChange={handleSearch}
      />
      
      <table className='table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
