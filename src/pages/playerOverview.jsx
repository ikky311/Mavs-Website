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
import SalaryInfo from '../components/salaryInfo';

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

  return (
    <div style={{ marginTop: "75px", marginLeft: '150px', marginRight: '150px', backgroundColor: 'white'}}>
      <Link to="/" style={{ textDecoration: 'none', fontSize: '18px' }}>
        &#8592; Return to Home Page
      </Link>
      <h1>Player {selectedTabLabel}: {player.name}</h1>
      {player && (
        <div>
          <img src={player.photoUrl} alt={player.name} style={{ maxWidth: '200px', maxHeight: '200px', marginLeft: "50px" }} />
          <Tabs value={currentTab} onChange={handleTabChange} style={{maxWidth: '300px'}}>
            <Tab label="Overview" />
            <Tab label="Salary" />
            <Tab label="Scouting" />
          </Tabs>
          <div className="player-info-container">
            <div className="player-bio-container">
              <PlayerBio playerData={playerData}/>
            </div>
              {currentTab === 0 && (
                <div style={{background: 'white'}}>
                  <RadarChart measurementsData={playerData.measurements}/>       
                  <SliderChart PlayerData={playerData} playerName={player.name} />
                  <LineGraph data={playerData.overviewPerGame}/>
                  <GameLogTable gameLog={playerData.gameLog} playerName={playerData.bio} />
                </div>
              )}
              {currentTab === 1 && (
                <div className="player-features-container">
                  <div >
                    <h2>Salary Information</h2>
                    <SalaryInfo />
                    <SalaryTable/>
                  </div>
                </div>
              )}
              {currentTab === 2 && (
                <div className="player-features-container">
                  <PlayerScout PlayerData={playerData}/>
                </div>
              )}
            </div>
          
        </div>
      )}
    </div>
  );  
};

export default PlayerProfile;
