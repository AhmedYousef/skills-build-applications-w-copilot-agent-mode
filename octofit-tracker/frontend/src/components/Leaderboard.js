import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : '/api/leaderboard/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        console.log('Leaderboard API endpoint:', endpoint);
        console.log('Fetched leaderboard:', results);
      });
  }, [endpoint]);

  return (
    <div className="card p-3 mb-4">
      <h2 className="text-primary mb-3">Leaderboard</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, idx) => (
            <tr key={idx}>
              <td>{entry.team}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
