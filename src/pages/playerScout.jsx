import React from 'react'
import ScoutCollapsible from '../components/scoutCollapsible'

const PlayerScout = ({PlayerData}) => {
    return (
        <div style={{marginTop: '-600px'}}>
          <h2>Scouting Reports</h2>
          <ScoutCollapsible initialReports={PlayerData} />
        </div>
      );
}

export default PlayerScout;