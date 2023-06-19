import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#f02626', '#19b51c', '#1587a3', '#5015a3', '#8c0b77'];

function YourComponent({teamData}) {
  const [selectedCap, setSelectedCap] = useState('capTotal');
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const mergeArrays = () => {
      const { salaries, boxScorePerGame, depthChart } = teamData;
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

  // Replace null values in selected cap field with 0, delete data points with name "Total", and group data by position
  const groupedData = combinedData.reduce((acc, item) => {
    if (item.name === 'Total') {
      return acc; // Skip data points with name "Total"
    }

    if (!acc[item.position]) {
      acc[item.position] = {
        position: item.position,
        capTotal: 0,
        cap1: 0,
        cap2: 0,
        cap3: 0,
        cap4: 0,
        cap5: 0,
        cap6: 0,
        cap7: 0,
      };
    }

    acc[item.position][selectedCap] += item[selectedCap] || 0;

    return acc;
  }, {});

  // Convert the grouped data object into an array for the pie chart and filter out data points with values of 0
  const pieChartData = Object.values(groupedData).filter(item => item[selectedCap] > 0);

  const handleCapChange = (event) => {
    setSelectedCap(event.target.value);
  };

  // Format the cap values in USD format
  const formatCapValue = (value) => `$${value.toLocaleString()}`;

  return (
    <div>
      <div>
        <label htmlFor="capFilter">Select Cap:</label>
        <select id="capFilter" value={selectedCap} onChange={handleCapChange}>
          <option value="capTotal">Total Cap Over Years</option>
          <option value="cap1">2022-2023 Salary Cap Total</option>
          <option value="cap2">2023-2024 Salary Cap Total</option>
          <option value="cap3">2024-2025 Salary Cap Total</option>
          <option value="cap4">2025-2026 Salary Cap Total</option>
          <option value="cap5">2026-2027 Salary Cap Total</option>
          <option value="cap6">2027-2028 Salary Cap Total</option>
          <option value="cap7">2029-2030 Salary Cap Total</option>
        </select>
      </div>
      <PieChart width={600} height={400}>
        <Pie data={pieChartData}  dataKey={selectedCap} nameKey="position" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label={({ position, value }) => `${position}: ${formatCapValue(value)}`}>
          {pieChartData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatCapValue(value)} />
        <Legend />
      </PieChart>
    </div>
  );
}

export default YourComponent;
