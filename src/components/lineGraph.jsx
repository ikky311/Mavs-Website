import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineGraph = ({ data }) => {
  const [selectedValue, setSelectedValue] = useState('PTS');

  const handleValueChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const reversedData = [...data].reverse(); // Flip the data array

  const filteredData = reversedData.filter((item) => item[selectedValue] !== null);

  return (
    <div>
      <h2>{data[0].name} Statistic Over Time</h2>
      <select value={selectedValue} onChange={handleValueChange}>
        <option value="PTS">Points</option>
        <option value="AST">Assists</option>
        <option value="REB">Rebounds</option>
        {/* Add more options for other values */}
      </select>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Season" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={selectedValue} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
