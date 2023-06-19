import React, { useState } from 'react';

const ScoutCollapsible = ({ initialReports }) => {
  const [collapsibleComponents, setCollapsibleComponents] = useState(initialReports.scoutingReports);
  const [newReport, setNewReport] = useState('');
  const [newScout, setNewScout] = useState('');
  const [newGame, setNewGame] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleClick = (index) => {
    const updatedComponents = collapsibleComponents.map((component, i) => ({
      ...component,
      active: i === index ? !component.active : component.active,
    }));
    setCollapsibleComponents(updatedComponents);
  };

  const handleInputChange = (e) => {
    setNewReport(e.target.value);
  };

  const handleScoutChange = (e) => {
    setNewScout(e.target.value);
  };

  const handleGameChange = (e) => {
    setNewGame(e.target.value);
  };

  const handleAddReport = () => {
    if (editIndex !== null) {
      const updatedComponents = collapsibleComponents.map((component, index) => {
        if (index === editIndex) {
          return {
            ...component,
            report: newReport,
            scout: newScout,
            event: newGame,
          };
        }
        return component;
      });
      setCollapsibleComponents(updatedComponents);
      setNewReport('');
      setNewScout('');
      setNewGame('');
      setEditIndex(null);
    } else {
      const newIndex = collapsibleComponents.length;
      const currentDate = new Date().toISOString().split('T')[0];
      const newComponent = {
        index: newIndex,
        id: `${currentDate}_New Report`,
        date: currentDate,
        scout: newScout,
        dxId: '6514',
        player: 'Victor Oladipo',
        event: newGame,
        report: newReport,
        team: 'MIA',
        active: false,
      };
      setCollapsibleComponents([newComponent, ...collapsibleComponents]);
      setNewReport('');
      setNewScout('');
      setNewGame('');
    }
  };

  const handleEditReport = (index) => {
    const reportToEdit = collapsibleComponents[index];
    setNewReport(reportToEdit.report);
    setNewScout(reportToEdit.scout);
    setNewGame(reportToEdit.event);
    setEditIndex(index);
  };

  const handleDeleteReport = (index) => {
    const updatedComponents = collapsibleComponents.filter((_, i) => i !== index);
    setCollapsibleComponents(updatedComponents);
  };

  const formattedReports = collapsibleComponents.map((component) => ({
    ...component,
    date: component.date.split('T')[0],
  }));

  return (
    <div>
      {formattedReports.map((component, index) => (
        <div key={component.id}>
          <button onClick={() => handleClick(Math.abs(collapsibleComponents.length - 1 - component.index))} style={{ width: '1200px', marginBottom: '10px', marginRight: '10px', borderWidth: 2, borderColor: "black"}} >
            {component.date} Report Written By {component.scout} at {component.event}
          </button>
          <button onClick={() => handleEditReport(index)}  style={{ borderWidth: 2, borderColor: "black"}}>Edit</button>
          {component.active && <div>{component.report}</div>}
          {editIndex === index && <button onClick={() => handleDeleteReport(index)} style={{ borderWidth: 2, borderColor: "black", marginBottom: '10px'}}>Delete</button>}
        </div>
      ))}

      <div>
        <input type="text" value={newScout} onChange={handleScoutChange} placeholder="Enter Your Name" style={{width: '625px', height: '50px', fontSize: '18px', marginBottom: '10px', marginRight: '10px', borderWidth: 1, borderColor: "black"}}  />
        <input type="text" value={newGame} onChange={handleGameChange} placeholder="Enter Event" style={{width: '625px', height: '50px', fontSize: '18px', borderWidth: 1, borderColor: "black"}}/>
        <br />
        <textarea rows="5" cols="50" value={newReport} onChange={handleInputChange} placeholder="Write Report Here" style={{width: '1275px', height: '250px', fontSize: '20px', borderWidth: 1, borderColor: "black"}}/>
        <br />
        <button onClick={handleAddReport} style={{fontSize: '20px', borderWidth: 1, borderColor: "black", marginBottom: '100px'}}>{editIndex !== null ? 'Update Report' : 'Add Report'}</button>
      </div>
    </div>
  );
};

export default ScoutCollapsible;
