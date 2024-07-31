import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Matches() {
  // State to store fetched matches data
  const [matchesData, setMatchesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch matches data from the API endpoint when the component mounts
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/matches')
        .then(response => {
            console.log('API response:', response.data); // Log the response data
            
            // Update the state with the fetched data
            setMatchesData(response.data);
        })
        .catch(error => {
            console.error('Error fetching matches data:', error);
        });
    }, []);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter matches based on search term
  const filteredMatches = matchesData.filter(match => 
    match.Team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.Team2.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.MatchDate.includes(searchTerm) ||
    match.MatchVenue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>Matches Data</h3>
      {/* Search input field */}
      <input
        type="text"
        id="search"
        placeholder="Find Matches..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div id="FormTable">
        <table>
          <thead>
            <tr>
              <th>Match ID</th>
              <th>Team 1</th>
              <th>Team 2</th>
              <th>Match Date</th>
              <th>Match Venue</th>
            </tr>
          </thead>
          <tbody>
            {/* Display filtered matches data */}
            {filteredMatches.map(match => (
              <tr key={match.MatchID}>
                <td>{match.MatchID}</td>
                <td>{match.Team1}</td>
                <td>{match.Team2}</td>
                <td>{match.MatchDate}</td>
                <td>{match.MatchVenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <hr />
      <footer>
        <p>ESPNCricInfo Reincarnated</p>
        <p>Copyright 2024. All Rights Reserved.</p>
        <a href="https://github.com/ahmedembeddedx/the-reincarnation-of-espncricinfo/">
          <img src="https://cdn-icons-png.freepik.com/512/919/919847.png?ga=GA1.1.1925836337.1709750745&" alt="" height="40" />
        </a>
      </footer>
    </div>
  );
}
