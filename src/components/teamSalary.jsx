import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import teamData from '../data/miamiHeat.json';

const MaterialUITable = () => {
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

  const groupedData = {};

  combinedData.forEach((item) => {
    const { position, cap1, cap2, cap3, cap4, cap5, cap6, cap7 } = item;

    // Filter positions to include only "PG", "SG", "SF", "PF", and "C"
    if (["PG", "SG", "SF", "PF", "C"].includes(position)) {
      if (!groupedData[position]) {
        groupedData[position] = {
          position,
          cap1: isNaN(cap1) ? 0 : cap1,
          cap2: isNaN(cap2) ? 0 : cap2,
          cap3: isNaN(cap3) ? 0 : cap3,
          cap4: isNaN(cap4) ? 0 : cap4,
          cap5: isNaN(cap5) ? 0 : cap5,
          cap6: isNaN(cap6) ? 0 : cap6,
          cap6: isNaN(cap7) ? 0 : cap7,
        };
      } else {
        groupedData[position].cap1 += isNaN(cap1) ? 0 : cap1;
        groupedData[position].cap2 += isNaN(cap2) ? 0 : cap2;
        groupedData[position].cap3 += isNaN(cap3) ? 0 : cap3;
        groupedData[position].cap4 += isNaN(cap4) ? 0 : cap4;
        groupedData[position].cap5 += isNaN(cap5) ? 0 : cap5;
        groupedData[position].cap6 += isNaN(cap6) ? 0 : cap6;
        groupedData[position].cap7 += isNaN(cap7) ? 0 : cap6;
      }
    }
  });

  const formatMoneyValue = (value) => {
    return value.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  };

  const orderedGroupedData = Object.values(groupedData).sort((a, b) => {
    // Define the order of positions here
    const positionOrder = ['PG', 'SG', 'SF', 'PF', 'C'];

    return positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position);
  });

  return (
    <TableContainer component={Paper} style={{ maxWidth: 800, marginLeft: 650, marginTop: -415 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>2022-2023</TableCell>
            <TableCell>2023-2024</TableCell>
            <TableCell>2024-2025</TableCell>
            <TableCell>2025-2026</TableCell>
            <TableCell>2026-2027</TableCell>
            <TableCell>2027-2028</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderedGroupedData.map((data) => (
            <TableRow key={data.position} sx={{ height: 70 }}>
              <TableCell>{data.position}</TableCell>
              <TableCell>{formatMoneyValue(parseFloat(data.cap1))}</TableCell>
              <TableCell>{formatMoneyValue(parseFloat(data.cap2))}</TableCell>
              <TableCell>{formatMoneyValue(parseFloat(data.cap3))}</TableCell>
              <TableCell>{formatMoneyValue(parseFloat(data.cap4))}</TableCell>
              <TableCell>{formatMoneyValue(parseFloat(data.cap5))}</TableCell>
              <TableCell>{formatMoneyValue(parseFloat(data.cap6))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialUITable;
