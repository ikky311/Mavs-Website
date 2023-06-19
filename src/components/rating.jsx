import React from 'react';

const RoundedBlock = ({ teamData, stat, title }) => {
  const teamStats = teamData.stats.find(
    (team) => team.team === teamData.team && team.seasonType === 'Regular'
  );
  const RtgRank = teamStats ? teamStats[stat + ' RANK'] : null;
  const Rtg = teamStats ? teamStats[stat] : null;

  var percent = (parseInt(RtgRank)/30)*100;

  let backgroundColor;
  if (percent < 50) {
    const r = Math.round(44 + ((255 - 44) / 50) * percent);
    const b = Math.round(130 + ((255 - 130) / 50) * percent);
    const g = Math.round(201 + ((255 - 201) / 50) * percent);
    backgroundColor = `rgba(${r}, ${g}, ${b}, 1)`;
  } else {
    const r = Math.round(255 - ((255 - 246) / 50) * (percent - 50));
    const g = Math.round(255 - ((255 - 71) / 50) * (percent - 50));
    const b = Math.round(255 - ((255 - 71) / 50) * (percent - 50));
    backgroundColor = `rgba(${r}, ${g}, ${b}, 1)`;
  }

  return (
    <div style={{ width: '275px', maxWidth: '275px', margin: '0 auto', background: backgroundColor, padding: '3px', borderRadius: '16px', textAlign: 'center', marginBottom: '30px' }}>
      <span>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '5px' }}>
          {title}
        </h3>
        <div style={{ display: 'flex', justifyContent: 'center', color: 'black' }}>
          <div style={{ marginRight: '60px' }}>
            <span style={{ fontSize: '18px' }}>Rank</span>
            <br />
            <span style={{ fontSize: '21px', fontWeight: 'bold' }}>
              {RtgRank}
            </span>
          </div>
          <div>
            <span style={{ fontSize: '18px' }}>Value</span>
            <br />
            <span style={{ fontSize: '21px', fontWeight: 'bold' }}>
              {Rtg}
            </span>
          </div>
        </div>
      </span>
    </div>
  );
};
export default RoundedBlock;