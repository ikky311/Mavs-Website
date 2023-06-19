import React, { useState } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, FormControl, Select, MenuItem, Typography, } from '@mui/material';

const GameLogTable = ({ gameLog, playerName }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [seasonTypeFilter, setSeasonTypeFilter] = useState('');
  const [seasonFilter, setSeasonFilter] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeSeasonTypeFilter = (event) => {
    setSeasonTypeFilter(event.target.value);
    setPage(0);
  };

  const handleChangeSeasonFilter = (event) => {
    setSeasonFilter(event.target.value);
    setPage(0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const filteredData = gameLog.filter((game) => {
    if (seasonTypeFilter && game.seasonType.toLowerCase() !== seasonTypeFilter) {
      return false;
    }
    if (seasonFilter && game.season !== parseInt(seasonFilter)) {
      return false;
    }
    return true;
  });

  const slicedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const seasonTypeOptions = ['Regular', 'Playoff'];
  const seasonOptions = Array.from(new Set(gameLog.map((game) => game.season))).sort();

  return (
    <>
      <Typography variant="h5" gutterBottom>
      <span style={{ fontWeight: 'bold' }}> {playerName[0].name} Career Game Log </span>
      </Typography>

      <FormControl sx={{ minWidth: 120, marginBottom: '1rem' }}>
        <Select value={seasonTypeFilter} onChange={handleChangeSeasonTypeFilter} displayEmpty>
          <MenuItem value="">All Season Types</MenuItem>
          {seasonTypeOptions.map((option) => (
            <MenuItem key={option} value={option.toLowerCase()}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120, marginBottom: '1rem' }}>
        <Select value={seasonFilter} onChange={handleChangeSeasonFilter} displayEmpty>
          <MenuItem value="">All Seasons</MenuItem>
          {seasonOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Team</b></TableCell>
              <TableCell><b>Opponent</b></TableCell>
              <TableCell><b>Minutes Played</b></TableCell>
              <TableCell><b>Points</b></TableCell>
              <TableCell><b>Rebounds</b></TableCell>
              <TableCell><b>Assists</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData.map((game) => (
              <TableRow key={game.gameId}>
                <TableCell>{formatDate(game.date)}</TableCell>
                <TableCell>{game.team}</TableCell>
                <TableCell>{game.opponent}</TableCell>
                <TableCell>{game.timePlayed}</TableCell>
                <TableCell>{game.pts}</TableCell>
                <TableCell>{game.reb}</TableCell>
                <TableCell>{game.ast}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default GameLogTable;
