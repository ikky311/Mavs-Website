import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import PlayerData from '../data/oladipo.json';

const SalaryTable = () => {
  const formatMoneyValue = (value) => {
    return value.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  };

  return (
    <div>
      <div>
        <Typography variant="h5" gutterBottom style={{fontWeight: 'bolded'}}>
          {PlayerData.bio[0].name} Salary Breakdown
        </Typography>

        <TableContainer component={Paper}>
          <Table style={{ width: '700px'}}> 
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b>Salary Year</b>
                </TableCell>
                <TableCell align="center">
                  <b>Option</b>
                </TableCell>
                <TableCell align="center">
                  <b>Base Compensation</b>
                </TableCell>
                <TableCell align="center">
                  <b>Likely Bonus</b>
                </TableCell>
                <TableCell align="center">
                  <b>Unlikely Bonus</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {PlayerData.contracts.map((contract, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{contract.salaryYear}</TableCell>
                  <TableCell align="center">{contract.optionLK}</TableCell>
                  <TableCell align="center">{formatMoneyValue(parseFloat(contract.currentBaseComp))}</TableCell>
                  <TableCell align="center">{formatMoneyValue(parseFloat(contract.likelyBonus))}</TableCell>
                  <TableCell align="center">{formatMoneyValue(parseFloat(contract.unlikelyBonus))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default SalaryTable;
