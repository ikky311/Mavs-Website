import { useState, useEffect } from 'react';
import data from '../data/miamiHeat.json';

function YourComponent() {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const mergeArrays = () => {
      const { salaries, boxScorePerGame, depthChart } = data;
      const filteredPlayers = depthChart.flatMap(item => item.players.filter(player => player !== null));

      const combinedArray = boxScorePerGame.map((player) => {
        const salary = salaries.find((salary) => player.nbaId === salary.nbaId);
        const depth = filteredPlayers.find((item) => item.nbaId === player.nbaId);

        const combinedObj = { ...salary, ...player, ...depth };

        return combinedObj;
      });

      setCombinedData(combinedArray);
    };

    mergeArrays();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>GS</th>
            <th>Total Cap</th>
            <th>Unit</th>
            {/* Add table headers for other properties */}
          </tr>
        </thead>
        <tbody>
          {combinedData.map((item) => (
            <tr key={item.nbaId}>
              <td>{item.nbaId}</td>
              <td>{item.name}</td>
              <td>{item.gs}</td>
              <td>{item.capTotal}</td>
              <td>{item.unit}</td>
              {/* Display other properties in respective columns */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default YourComponent;
