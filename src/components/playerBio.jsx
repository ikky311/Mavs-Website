import React from 'react'
import playerData from '../data/oladipo.json'

const playerBio = () => {
    const formattedDate = new Date(playerData.bio[0].birthDate).toLocaleDateString();
    const originalDate = new Date(formattedDate);
    originalDate.setDate(originalDate.getDate() + 1);

    const updatedDate = originalDate.toLocaleDateString();

    const boldBeforeColon = {
        fontWeight: 'bold',
      };

  return (
    <span style={{width: 'auto'}}>
      <p>
        <span style={boldBeforeColon}>Name:</span> {playerData.bio[0].name}
        <br />
        <span style={boldBeforeColon}>Age:</span> {playerData.overviewPerGame[0].age}
        <br />
        <span style={boldBeforeColon}>Birthdate:</span> {updatedDate}
        <br />
        <span style={boldBeforeColon}>Nationality:</span> {playerData.bio[0].homeCountry}
        <br />
        <span style={boldBeforeColon}>Position:</span> {playerData.bio[0].position}
        <br />
        <span style={boldBeforeColon}>Height:</span> {playerData.bio[0].height}
        <br />
        <span style={boldBeforeColon}>Weight:</span> {playerData.bio[0].weight}
        <br />
        <span style={boldBeforeColon}>Jersey Number:</span> {playerData.bio[0].jerseyNum}
        <br />
        <span style={boldBeforeColon}>Years in League:</span> {playerData.bio[0].yearsPro}
        <br />
        <span style={boldBeforeColon}>Drafted Year:</span> {playerData.bio[0].draftYear}
        <br />
        <span style={boldBeforeColon}>Picked in Draft:</span> Round {playerData.bio[0].round} Pick {playerData.bio[0].pick}
        <br />
        <span style={boldBeforeColon}>College:</span> {playerData.bio[0].dxCollege}
        <br />
        <span style={boldBeforeColon}>Highschool:</span> {playerData.bio[0].highSchool}, {playerData.bio[0].highSchoolState}
        <br />
        <span style={boldBeforeColon}>Hometown:</span> {playerData.bio[0].homeTown}, {playerData.bio[0].homeState}
      </p>
    </span>
  )
}

export default playerBio