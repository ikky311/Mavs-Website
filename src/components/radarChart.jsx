import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const CustomTooltip = ({playerName, playerPos, active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p>{playerName}: {data.datapoint1}</p>
          <p>Average {playerPos} : {data.datapoint2}</p>
        </div>
      );
    }
    return null;
  };

const Radarplot = ({ measurementsData }) => {
  const data = [
    {
        subject: 'Wingspan',
        data1: measurementsData[0].wingspan / 86.25 * 100,
        datapoint1: measurementsData[0].wingspan,
        data2: 77.75 / 86.25 * 100,
        datapoint2: 77.75,
      },
    {
      subject: 'Height',
      data1: measurementsData[0].heightNoShoes / 78.25 * 100,
      datapoint1: measurementsData[0].heightNoShoes,
      data2: 73.25 / 78.25 * 100,
      datapoint2: 73.25,
    },
    {
        subject: 'Agility',
        data1: measurementsData[0].agility / 12.01 * 100,
        datapoint1: measurementsData[0].agility,
        data2: 11.2 / 12.01 * 100,
        datapoint2: 11.2 
    },
    {
        subject: 'Max Vertical',
        data1: measurementsData[0].maxVertical / 48 * 100,
        datapoint1: measurementsData[0].maxVertical,
        data2: 35.7 / 48.0 * 100,
        datapoint2: 35.7,
      },
    {
        subject: 'Weight',
        data1: measurementsData[0].weight / 229 * 100,
        datapoint1: measurementsData[0].weight,
        data2: 188 / 229 * 100,
        datapoint2: 188,
    },
  ];
  return (
    <div style={{ marginTop: "-550px", marginLeft: "250px" }}>
      <h3 style={{ marginTop: "-550px", marginLeft: "175px" }}>{measurementsData[0].name} vs. Average {measurementsData[0].position}</h3>
      <ResponsiveContainer width= "50%" height={500}>
        <RadarChart cx="50%" cy="50%" outerRadius="90%" data={data} >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name={measurementsData[0].name} dataKey="data1" stroke="#8884d8" fill="#bdddff" fillOpacity={0.2} />
          <Radar name={`Average ${measurementsData[0].position} in NBA`} dataKey="data2" stroke="#82ca9d" fill="#ddfade" fillOpacity={0.2} />
          <Legend wrapperStyle={{ position: "absolute", top: "95%", left: "50%", transform: "translate(-50%, -50%)",}} />
          <Tooltip content={<CustomTooltip playerName={measurementsData[0].name} playerPos={measurementsData[0].position} />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Radarplot;
