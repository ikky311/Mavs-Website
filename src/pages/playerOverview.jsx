import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Tabs, Tab, Button } from '@mui/material';
import SliderChart from '../components/sliderChart';
import GameLogTable from '../components/gameLog';
import PlayerScout from './playerScout';
import SalaryTable from '../components/salaryTable';
import RadarChart from '../components/radarChart';
import "../components/grid.css"
import PlayerBio from '../components/playerBio';
import playerData from '../data/oladipo.json';
import LineGraph from '../components/lineGraph';



const PlayerProfile = () => {
  const { nbaId } = useParams();
  const player = playerData.bio.find((item) => item.nbaId === parseInt(nbaId));
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedTabLabel, setSelectedTabLabel] = useState('Overview');

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);

    // Update the selected tab label
    const tabLabels = ['Overview', 'Salary', 'Scouting'];
    setSelectedTabLabel(tabLabels[newValue]);
  };

  if (!player) {
    return (
      <div>
        Player is not yet implemented.
        <Link to="/" style={{ textDecoration: 'none', fontSize: '18px' }}>
          &#8592; Return to Home Page
        </Link>
      </div>
    );
  }
  const salaryStyle = {
    float: 'right',
    marginLeft: '600px', 
    marginTop: '-500px',
    width: '700px', 
    height: 'auto',
    overflow: 'auto', // Adds scrollbars 
  };

  const scoutingStyle = {
    marginLeft: '300px', 
    marginTop: '-600px',
    overflow: 'auto', // Adds scrollbars 
  };

  return (
    <div style={{ marginTop: "75px", marginLeft: '150px', marginRight: '150px'}}>
      <Link to="/" style={{ textDecoration: 'none', fontSize: '18px' }}>
        &#8592; Return to Home Page
      </Link>
      <h1>Player {selectedTabLabel}: {player.name}</h1>
      {player && (
        <div >
          <img src={player.photoUrl} alt={player.name} style={{ maxWidth: '200px', maxHeight: '200px', marginLeft: "50px" }} />
          <Tabs value={currentTab} onChange={handleTabChange} style={{maxWidth: '300px'}}>
            <Tab label="Overview" />
            <Tab label="Salary" />
            <Tab label="Scouting" />
          </Tabs>
          <PlayerBio />
          {currentTab === 0 && (
            <div>
              <RadarChart measurementsData={playerData.measurements}/>       
              <SliderChart PlayerData={playerData} playerName={player.name} />
              <LineGraph data={playerData.overviewPerGame}/>
              <GameLogTable gameLog={playerData.gameLog} playerName={playerData.bio} />
            </div>
          )}
          {currentTab === 1 && (
            <div style={salaryStyle}>
              <h3>Salary Information</h3>
              <SalaryTable/>
            </div>
          )}
          {currentTab === 2 && (
            <div style={scoutingStyle}>
              <PlayerScout PlayerData={playerData}/>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayerProfile;
