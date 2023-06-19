import React from 'react';
import Teamstats from "../components/teamStats";
import PieChart from '../components/pieChart';
import Rating from '../components/rating';
import teamData from '../data/miamiHeat.json';
import CollapsibleTable from '../components/teamSalary';

const teamPage = () => {
  const filePath = "../data/miamiHeat.json";
  const fileName = filePath.split("/").pop().split(".")[0];
  const upper = fileName.charAt(0).toUpperCase() + fileName.slice(1);
  const formattedTitle = upper.replace(/([A-Z])/g, ' $1').trim();

  return (
    <div style={{ marginTop: "75px", marginLeft: "90px", display: "flex", flexDirection: "column" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>{formattedTitle} 2022-2023 Roster</h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(275px, 1fr))', gap: '20px' }}>
            <Rating teamData={teamData} stat={'OFF RTG'} title={'Offensive Rating'} />
            <Rating teamData={teamData} stat={'EFG%'} title={'Effective FG%'} />
            <Rating teamData={teamData} stat={'TO%'} title={'Turnover%'} />
            <Rating teamData={teamData} stat={'OFF REB%'} title={'Off Rebound%'} />
            <Rating teamData={teamData} stat={'FTA'} title={'FT Attempts'} />
            <Rating teamData={teamData} stat={'DEF RTG'} title={'Defensive Rating'} />
            <Rating teamData={teamData} stat={'OPP EFG%'} title={'OPP EFG%'} />
            <Rating teamData={teamData} stat={'TURNOVERS FORCED'} title={'Forced Turnovers'} />
            <Rating teamData={teamData} stat={'DREB%'} title={'Def Rebound%'} />
            <Rating teamData={teamData} stat={'FTA ALLOWED'} title={'FT Allowed'} />
          </div>
      <Teamstats teamData={teamData} />
      <div>
        <h2 style={{textAlign: "center"}}>Salary Cap Over the Next Years</h2>
        <PieChart teamData={teamData} />
        <CollapsibleTable/>
      </div>
    </div>
  );
};

export default teamPage;
