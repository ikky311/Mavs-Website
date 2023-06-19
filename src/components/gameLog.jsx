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
              <TableCell align="center"><b>Date</b></TableCell>
              <TableCell align="center"><b>Team</b></TableCell>
              <TableCell align="center"><b>Opponent</b></TableCell>
              <TableCell align="center"><b>Minutes Played</b></TableCell>
              <TableCell align="center"><b>Points</b></TableCell>
              <TableCell align="center"><b>Rebounds</b></TableCell>
              <TableCell align="center"><b>Assists</b></TableCell>
              <TableCell align="center"><b>Steals</b></TableCell>
              <TableCell align="center"><b>Blocks</b></TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData.map((game) => (
              <TableRow key={game.gameId}>
                <TableCell align="center">{formatDate(game.date)}</TableCell>
                <TableCell align="center">{game.team}</TableCell>
                <TableCell align="center">{game.opponent}</TableCell>
                <TableCell align="center">{game.timePlayed}</TableCell>
                <TableCell align="center">{game.pts}</TableCell>
                <TableCell align="center">{game.reb}</TableCell>
                <TableCell align="center">{game.ast}</TableCell>
                <TableCell align="center">{game.stl}</TableCell>
                <TableCell align="center">{game.blk}</TableCell>
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
