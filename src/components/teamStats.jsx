import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Avatar, } from "@mui/material";
import { Link } from 'react-router-dom';


const TeamStats = ({teamData}) => {
  const [combinedData, setCombinedData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const mergeArrays = () => {
      const { salaries, boxScorePerGame, depthChart } = teamData;
      const filteredPlayers = depthChart.flatMap((item) =>
        item.players.filter((player) => player !== null)
      );

      const combinedArray = boxScorePerGame.map((player) => {
        const photoUrl = player.photoUrl;
        const salary = salaries.find((salary) => player.nbaId === salary.nbaId);
        const depth = filteredPlayers.find((item) => item.nbaId === player.nbaId);

        const combinedObj = { ...salary, ...player, ...depth };

        combinedObj.ppg = parseFloat(combinedObj.ppg, 10);
        combinedObj.unit = parseInt(combinedObj.unit, 10);

        return combinedObj;
      });

      setCombinedData(combinedArray);
    };

    mergeArrays();
  }, []);

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortDirection === "asc";
    const direction = isAsc ? "desc" : "asc";

    setSortBy(property);
    setSortDirection(direction);
    setCombinedData((prevCombinedData) =>
      [...prevCombinedData].sort((a, b) => {
        if (a[property] < b[property]) return isAsc ? 1 : -1;
        if (a[property] > b[property]) return isAsc ? -1 : 1;
        return 0;
      })
    );
  };

  const renderTableRows = () => {
    return combinedData.map((list) => {
      if (list.unit === null || isNaN(list.unit)) {
        return null; 
      }

  const formatMoneyValue = (value) => {
    return value.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  };
  
      return (
          <TableRow key={list.nbaId}>
            <TableCell align="center">
              <Avatar alt={list.name} src={list.photoUrl} /> 
            </TableCell>
            <TableCell align="center">
            <Link to={`/players/${list.nbaId}`}>{list.name}</Link> 
          </TableCell>
            <TableCell align="center">{list.age}</TableCell>
            <TableCell align="center">{list.position}</TableCell>
            <TableCell align="center">{list.mp}</TableCell>
            <TableCell align="center">{list.ppg}</TableCell>
            <TableCell align="center">{list.reb}</TableCell>
            <TableCell align="center">{list.ast}</TableCell>
            <TableCell align="center">{list.stl}</TableCell>
            <TableCell align="center">{list.tov}</TableCell>
            <TableCell align="center">{list['eFG%']}</TableCell>
            <TableCell align="center">{list['tp%']}</TableCell>
            <TableCell align="center">{list.tpa}</TableCell>
            <TableCell align="center">{formatMoneyValue(parseFloat(list.capTotal))}</TableCell>
          </TableRow>
      );
    });
  };
  const renderTableHeaderCell = (label, property) => {
    return (
      <TableCell align="center" sortDirection={sortBy === property ? sortDirection : false}>
        <TableSortLabel
          active={sortBy === property}
          direction={sortBy === property ? sortDirection : "asc"}
          onClick={() => handleSort(property)}
        >
         <b>{label}</b>
        </TableSortLabel>
      </TableCell>
    );
  };

  return (
    <div> 
      <TableContainer component={Paper} sx={{ maxHeight: "500px" }}>
        <Table aria-label="team stats" stickyHeader>
          <TableHead>
            <TableRow>
              {renderTableHeaderCell("Avatar")}
              {renderTableHeaderCell("Name", "name")}
              {renderTableHeaderCell("Age", "age")}
              {renderTableHeaderCell("Position", "position")}
              {renderTableHeaderCell("Minutes Played", "mp")}
              {renderTableHeaderCell("Points", "ppg")}
              {renderTableHeaderCell("Rebounds", "reb")}
              {renderTableHeaderCell("Assists", "ast")}
              {renderTableHeaderCell("Steals", "stl")}
              {renderTableHeaderCell("Turnover", "tov")}
              {renderTableHeaderCell("Effective FG%", "eFG%")}
              {renderTableHeaderCell("3P%", "tp%")}
              {renderTableHeaderCell("3PA", "tpa")}
              {renderTableHeaderCell("Total Salary", "capTotal")}
            </TableRow>
          </TableHead>
          <TableBody>{renderTableRows()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TeamStats;
