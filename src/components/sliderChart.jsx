import React, { useState } from 'react';
import "./grid.css"
import { FormControl, Select, MenuItem, Button } from '@mui/material';


const SliderChart = ({ percent, title }) => {
  percent = parseInt(percent);
  const translateX = (percent / 100) * 70;


  let color;
  if (percent < 50) {
    const r = Math.round(44 + ((255 - 44) / 50) * percent);
    const g = Math.round(130 + ((255 - 130) / 50) * percent);
    const b = Math.round(201 + ((255 - 201) / 50) * percent);
    color = `rgba(${r}, ${g}, ${b}, 1)`;
  } else {
    const r = Math.round(255 - ((255 - 246) / 50) * (percent - 50));
    const g = Math.round(255 - ((255 - 71) / 50) * (percent - 50));
    const b = Math.round(255 - ((255 - 71) / 50) * (percent - 50));
    color = `rgba(${r}, ${g}, ${b}, 1)`;
  }

  return (
    <div>
      <svg width="100" height="40">
        <text
          x="50%" y="18%" dominantBaseline="middle" textAnchor="middle" fontSize="14px" fill="#000">
          {title}
        </text>
        <g transform="translate(15,0)">
          <line x1="0" x2="73" y1="26.666666666666668" y2="26.666666666666668" stroke="#9b9b9b" strokeWidth="3px" />
          <circle cx="0.365" cy="26.666666666666668" r="2" fill="#9b9b9b" stroke="#9b9b9b" />
          <circle cx="73.365" cy="26.666666666666668" r="2" fill="#9b9b9b" stroke="#9b9b9b" />
          <circle cx="36.5" cy="26.666666666666668" r="2" fill="#9b9b9b" stroke="#9b9b9b" />
          <g id="slider_percent_rank_hard_hit_percent" transform={`translate(${translateX}, 26.666666666666668)`} >
            <circle id="circle_percent_rank_hard_hit_percent" r="10" fill={color} stroke="#000" />
            <text id="text_percent_rank_hard_hit_percent" dy="4" textAnchor="middle" fill="#000" fontSize=".7rem" >
              {percent}
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

const RegularChart = ({ stat, title }) => {
  return (
    <div>
      <svg width="100" height="40">
        <text x="60%" y="18%" dominantBaseline="middle" textAnchor="middle" fontSize="14px" fill="#000">
          {title}
        </text>
        <g transform="translate(15,0)">
          <g id="slider_percent_rank_hard_hit_percent" transform={`15, 26.666666666666668)`}>
            <text id="text_percent_rank_hard_hit_percent" dx={"45"}  dy="38" textAnchor="middle" fill="#000" fontSize="1.3rem">
              {stat}
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

const GridContainer = ({ PlayerData, playerName }) => {
  const [seasonFilter, setSeasonFilter] = useState('');
  const [isSliderChartVisible, setIsSliderChartVisible] = useState(true);
  const handleChangeSeasonFilter = (event) => {
    setSeasonFilter(event.target.value);
  };
  const handleToggleSliderChart = () => {
    setIsSliderChartVisible(!isSliderChartVisible);
  };
  const seasonOptions = Array.from(new Set(PlayerData.overviewPerGame.map((game) => game.Season))).sort();

  const newPlayerData = [];
  for (let i = 0; i < (PlayerData.overviewPerGame.length-1); i++) {
    if(PlayerData.overviewPerGame[i].Season !== PlayerData.overviewPerGame[i+1].Season){
      newPlayerData.push(PlayerData.overviewPerGame[i])
    }
  }
  newPlayerData.push(PlayerData.overviewPerGame[PlayerData.overviewPerGame.length-1]);

 var index = newPlayerData.findIndex(game => game.Season === parseInt(seasonFilter)); 

  if(index < 0){
    index = 0;
  }

  const sliderData = [
    { percent: newPlayerData[index].PTS_percentile, title: 'Points' },
    { percent: newPlayerData[index].AST_percentile, title: 'Assists' },
    { percent: newPlayerData[index].REB_percentile, title: 'Rebounds' },
    { percent: newPlayerData[index]['EFF%_percentile'], title: 'Efficiency' },
    { percent: newPlayerData[index].BLK_percentile, title: 'Blocks' },
    { percent: newPlayerData[index].FTA_percentile, title: 'Free Throw' },
    { percent: newPlayerData[index].FTO_percentile, title: 'Forced TO' },
    { percent: newPlayerData[index]['3P%_percentile'], title: '3P%' },
    { percent: newPlayerData[index]['3PA_percentile'], title: '3PA' },
    { percent: newPlayerData[index]['AST:TOV_percentile'], title: 'AST:TO' },
    { percent: newPlayerData[index].MS_percentile, title: 'MS' },
    { percent: newPlayerData[index]['FT%_percentile'], title: 'FT%' },
    { percent: newPlayerData[index].OREB_percentile, title: 'OREB' },
    { percent: newPlayerData[index].DREB_percentile, title: 'DREB' },
    { percent: newPlayerData[index].STL_percentile, title: 'Steals' },
    { percent: newPlayerData[index].TOV_percentile, title: 'TOV%' },
  ];

  const regularData = [
    { percent: newPlayerData[index].PTS, title: 'Points' },
    { percent: newPlayerData[index].AST, title: 'Assists' },
    { percent: newPlayerData[index].REB, title: 'Rebounds' },
    { percent: newPlayerData[index]['EFF%'], title: 'Efficiency' },
    { percent: newPlayerData[index].BLK, title: 'Blocks' },
    { percent: newPlayerData[index].FTA, title: 'Free Throw' },
    { percent: newPlayerData[index].FTO, title: 'Forced TO' },
    { percent: newPlayerData[index]['3P%'], title: '3P%' },
    { percent: newPlayerData[index]['3PA'], title: '3PA' },
    { percent: newPlayerData[index]['AST:TOV'], title: 'AST:TO' },
    { percent: newPlayerData[index].MS, title: 'MS' },
    { percent: newPlayerData[index]['FT%'], title: 'FT%' },
    { percent: newPlayerData[index].OREB, title: 'OREB' },
    { percent: newPlayerData[index].DREB, title: 'DREB' },
    { percent: newPlayerData[index].STL, title: 'Steals' },
    { percent: newPlayerData[index].TOV, title: 'TOV%' },
  ];

  return (
    <div className="grid-container">
      <h3 className="grid-title">
        {playerName} {seasonFilter} {isSliderChartVisible ? 'Season Statistics' : 'League Percentiles'}
      </h3>
      <FormControl sx={{ minWidth: 120, marginBottom: '1rem' }}>
        <Select value={seasonFilter} onChange={handleChangeSeasonFilter} displayEmpty>
          <MenuItem value="">Select Year</MenuItem>
          {seasonOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleToggleSliderChart}>
        {isSliderChartVisible ? "See League Percentile": "See Season Statistics" }
      </Button>
      <div className="grid-row">
        {isSliderChartVisible ? (
          regularData.map((item, index) => (
            <div key={index} className="grid-item">
              <RegularChart stat={item.percent} title={item.title} />
            </div>
          ))
        ) : (
          sliderData.map((item, index) => (
            <div key={index} className="grid-item">
              <SliderChart percent={item.percent} title={item.title} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GridContainer;
