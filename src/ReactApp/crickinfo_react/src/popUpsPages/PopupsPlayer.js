import React from 'react';

const PopupsPlayer = ({ player }) => {
    // Function to replace null with "Null"
    const displayValue = (value) => {
        return value === null ? 'Null' : value;
    };

    return (
        <div className="popup-container" style={{ maxHeight: '530px', overflowY: 'auto' }}>
            <h2 style={{position: 'sticky'}} className='h2-container'>'{displayValue(player.PlayerName)}' Info</h2>
            <h2 className='h2-container'>Personal Info</h2>
            <table>
                <tbody>
                    <tr>
                        <td className='unique'><strong>Player ID</strong></td>
                        <td className='unique'>{displayValue(player.PlayerID)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Player Age</strong></td>
                        <td className='unique'>{displayValue(player.PlayerAge)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Player Role</strong></td>
                        <td className='unique'>{displayValue(player.PlayerRole)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Player Team</strong></td>
                        <td className='unique'>{displayValue(player.PlayerTeam)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Matches</strong></td>
                        <td className='unique'>{displayValue(player.PlayerMatches)}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <h2 className='h2-container'>Batting Stats</h2>
            <table>
                <tbody>
                    <tr>
                        <td className='unique'><strong>Runs</strong></td>
                        <td className='unique'>{displayValue(player.PlayerRuns)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Batting Average</strong></td>
                        <td className='unique'>{displayValue(player.BatAvg)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Batting Style</strong></td>
                        <td className='unique'>{displayValue(player.BatStyle)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Highest Score</strong></td>
                        <td className='unique'>{displayValue(player.HighestScore)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Bat Innings</strong></td>
                        <td className='unique'>{displayValue(player._BatInnings)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Batting Strike Rate</strong></td>
                        <td className='unique'>{displayValue(player._BatSR)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Hundreds</strong></td>
                        <td className='unique'>{displayValue(player._Hundreds)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Fifties</strong></td>
                        <td className='unique'>{displayValue(player._Fifties)}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <h2 className='h2-container'>Bowling Stats</h2>
            <table>
                <tbody>
                    <tr>
                        <td className='unique'><strong>Bowling Average</strong></td>
                        <td className='unique'>{displayValue(player._BowlAvg)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Bowling Style</strong></td>
                        <td className='unique'>{displayValue(player._BowlingStyle)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Bowl Runs</strong></td>
                        <td className='unique'>{displayValue(player._BowlRuns)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Best Bowling Figure</strong></td>
                        <td className='unique'>{displayValue(player._BBF)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Bowl Innings</strong></td>
                        <td className='unique'>{displayValue(player._BowlInnings)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Bowling Strike Rate</strong></td>
                        <td className='unique'>{displayValue(player._BowlSR)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Five Wicket Haul</strong></td>
                        <td className='unique'>{displayValue(player._FiveWickets)}</td>
                    </tr>
                    <tr>
                        <td className='unique'><strong>Ten Wicket Haul</strong></td>
                        <td className='unique'>{displayValue(player._TenWickets)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PopupsPlayer;
