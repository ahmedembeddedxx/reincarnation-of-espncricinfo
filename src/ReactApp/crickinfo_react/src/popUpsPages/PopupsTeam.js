import React from 'react';

const PopupsTeam = ({ team }) => {
    // Function to replace null values with "Null"
    const displayValue = (value) => {
        return value === null ? 'Null' : value;
    };

    return (
        <div className="popup-team-container">
            <h2 className='h2-container'>{displayValue(team.TeamName)} Details</h2>
            <table>
                <tbody>
                    <tr>
                        <td className="unique"><strong>Team ID</strong></td>
                        <td className="unique">{displayValue(team.TeamID)}</td>
                    </tr>
                    <tr>
                        <td className="unique"><strong>Home Ground ID</strong></td>
                        <td className="unique">{displayValue(team.HomeGroundID)}</td>
                    </tr>
                    <tr>
                        <td className="unique"><strong>Abbreviation</strong></td>
                        <td className="unique">{displayValue(team.Abbreviation)}</td>
                    </tr>
                    <tr>
                        <td className="unique"><strong>Nickname</strong></td>
                        <td className="unique">{displayValue(team.Nickname)}</td>
                    </tr>
                    <tr>
                        <td className="unique"><strong>Upcoming Fixture</strong></td>
                        <td className="unique">{displayValue(team.UpcomingFixtureID)}</td>
                    </tr>
                    <tr>
                        <td className="unique"><strong>Upcoming Series</strong></td>
                        <td className="unique">{displayValue(team.UpcomingSeriesID)}</td>
                    </tr>
                    <tr>
                        <td className="unique"><strong>Wins</strong></td>
                        <td className="unique">{displayValue(team.Wins)}</td>
                    </tr>
                    <tr>
                        <td className="unique"><strong>Draws</strong></td>
                        <td className="unique">{displayValue(team.Draws)}</td>
                    </tr>
                    <tr>
                        <td className="unique"><strong>Losses</strong></td>
                        <td className="unique">{displayValue(team.Losses)}</td>
                    </tr>
                    <tr>
                        <td className="unique"><strong>Ranking Points</strong></td>
                        <td className="unique">{displayValue(team.RankingPoints)}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
};

export default PopupsTeam;
