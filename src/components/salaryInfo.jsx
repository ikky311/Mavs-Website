import React from 'react'
import playerData from '../data/oladipo.json'
import { Grid } from '@mui/material';
import teamData from '../data/miamiHeat.json'



const SalaryInfo = () => {
    const boldBeforeColon = {
        fontWeight: 'bold',
      };

      const formatMoneyValue = (value) => {
        return value.toLocaleString(undefined, {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        });
      };
        
    const player = teamData.salaries.find((item) => item.name === playerData.bio[0].name);

    console.log(player.name)

  return (
    <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={5} sm={5} md={5} lg={3} style={{alignItems: 'center'}}> 
            <span style={boldBeforeColon}>Agent Name:</span> <br /> {playerData.bio[0].agent}
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={3}> 
            <span style={boldBeforeColon}>Contract length:</span> <br /> {playerData.contracts.length} years
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={3}> 
            <span style={boldBeforeColon}>Total Amount:</span> <br /> {formatMoneyValue(player.capTotal)} 
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={3}> 
            <span style={boldBeforeColon}>Free Agency Status</span> <br /> {formatMoneyValue(player.faStatus)} 
        </Grid>
    </Grid>
  )
}

export default SalaryInfo;