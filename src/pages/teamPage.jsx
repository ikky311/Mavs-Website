import React from 'react';
import Teamstats from "../components/teamStats";
import PieChart from '../components/pieChart';
import Rating from '../components/rating';
import teamData from '../data/miamiHeat.json';
import CollapsibleTable from '../components/teamSalary';
import { Grid } from '@mui/material';

const teamPage = () => {
  const filePath = "../data/miamiHeat.json";
  const fileName = filePath.split("/").pop().split(".")[0];
  const upper = fileName.charAt(0).toUpperCase() + fileName.slice(1);
  const formattedTitle = upper.replace(/([A-Z])/g, ' $1').trim();

  return (
    <body style={{ marginTop: "75px", marginLeft: '150px', marginRight: '150px', display: "flex", flexDirection: "column" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>{formattedTitle} 2022-2023 Roster</h1>
      <Grid container spacing={1}> 
        <Grid item xs={10} sm={5} md={5} lg={3}> 
          <Rating teamData={teamData} stat={'OFF RTG'} title={'Offensive Rating'} />
        </Grid>
        <Grid item xs={10} sm={5} md={5} lg={3}>
          <Rating teamData={teamData} stat={'EFG%'} title={'Effective FG%'} />
        </Grid>
        <Grid item xs={10} sm={5} md={5} lg={3}>
          <Rating teamData={teamData} stat={'TO%'} title={'Turnover%'} />
        </Grid>
        <Grid item xs={10} sm={5} md={5} lg={3}>
          <Rating teamData={teamData} stat={'OFF REB%'} title={'Off Rebound%'} />
        </Grid>
        <Grid item xs={10} sm={5} md={5} lg={3}>
          <Rating teamData={teamData} stat={'FTA'} title={'FT Attempts'} />
        </Grid>
        
        <Grid item xs={10} sm={5} md={5} lg={3}>
          <Rating teamData={teamData} stat={'DEF RTG'} title={'Defensive Rating'} />
        </Grid>
        <Grid item xs={10} sm={5} md={5} lg={3}>
          <Rating teamData={teamData} stat={'OPP EFG%'} title={'OPP EFG%'} />
        </Grid>
        <Grid item xs={10} sm={5} md={5} lg={3}>
          <Rating teamData={teamData} stat={'TURNOVERS FORCED'} title={'Forced Turnovers'} />
        </Grid>
        <Grid item xs={10} sm={5} md={5} lg={3}>
          <Rating teamData={teamData} stat={'DREB%'} title={'Def Rebound%'} />
        </Grid>
        <Grid item xs={10} sm={5} md={5} lg={3}>
          <Rating teamData={teamData} stat={'FTA ALLOWED'} title={'FT Allowed'} />
        </Grid>
      </Grid>
      <Teamstats teamData={teamData} />
      <span style={{marginLeft: '-100px'}}>
        <h2 style={{textAlign: "center"}}>Salary Cap Over the Next Years</h2>
        <PieChart teamData={teamData} />
        <CollapsibleTable/>
      </span>
    </body>
  );
};

export default teamPage;
