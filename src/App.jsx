import React from 'react';
import Header from './components/header';
import { ThemeProvider } from '@mui/material';
import customtheme from "./components/theme";
import TeamPage from "./pages/teamPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerProfile from './pages/playerOverview';



const App = () => {
  return (
    <ThemeProvider theme={customtheme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<TeamPage />} />
          <Route path="/players/:nbaId" element={<PlayerProfile />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App