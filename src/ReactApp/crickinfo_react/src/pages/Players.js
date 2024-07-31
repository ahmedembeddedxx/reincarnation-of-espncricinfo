import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PopupsPlayer from '../popUpsPages/PopupsPlayer';

export default function Players() {
    const [players, setPlayers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/players')
            .then(response => {
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setPlayers(response.data);
                } else {
                    console.error('API response data is empty or not an array.');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const openPopupPage = (player) => {
        setSelectedPlayer(player);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedPlayer(null);
    };
    const renderCellValue = (value) => {
        return value ? value : 'N/A';
    };
    const filteredPlayers = players.filter(player =>
        player.PlayerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.PlayerRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.PlayerTeam.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h3>Player Data</h3>
            <input
                type="text"
                id="search"
                placeholder="Find Team..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <div id="FormTable">
                <table>
                    <thead>
                        <tr>
                            <th>Player Name</th>
                            <th>Player ID</th>
                            <th>Player Age</th>
                            <th>Player Role</th>
                            <th>Player Team</th>
                            <th>Player Matches</th>
                            <th>Player Runs</th>
                            <th>Player Wickets</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPlayers.map(player => (
                            <tr key={player.PlayerID}>
                                <td className="hover-on-data" onClick={() => openPopupPage(player)}>
                                {renderCellValue(player.PlayerName)}
                                </td>
                                <td>{renderCellValue(player.PlayerID)}</td>
                                <td>{renderCellValue(player.PlayerAge)}</td>
                                <td>{renderCellValue(player.PlayerRole)}</td>
                                <td>{renderCellValue(player.PlayerTeam)}</td>
                                <td>{renderCellValue(player.PlayerMatches)}</td>
                                <td>{renderCellValue(player.PlayerRuns)}</td>
                                <td>{renderCellValue(player.PlayerWickets)}</td>
                          </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <Popup
                open={isPopupOpen}
                onClose={closePopup}
                modal
                closeOnDocumentClick
                contentStyle={{
                    padding: '20px',
                    fontFamily: 'monospace',
                    width: '50%',
                    backgroundColor: 'var(--whitish)',
                    height: '600px',
                    display: 'grid',
                    borderRadius: '10px',
                    fontSize: 'large',
                    margin: '0 auto',
                    border: '3px solid black'
                }}
            >
                <div>
                    <button onClick={closePopup} id="exitButton">x</button>
                    {selectedPlayer && <PopupsPlayer player={selectedPlayer} />}
                </div>
            </Popup>


            <br />
            <br />
            <hr />
            <footer>
                <p>ESPNCricInfo Reincarnated</p>
                <p>Copyright 2024. All Rights Reserved.</p>
                <a href="https://github.com/ahmedembeddedx/the-reincarnation-of-espncricinfo/">
                    <img
                        src="https://cdn-icons-png.freepik.com/512/919/919847.png?ga=GA1.1.1925836337.1709750745&"
                        alt=""
                        height="40"
                    />
                </a>
            </footer>
        </div>
    );
}
