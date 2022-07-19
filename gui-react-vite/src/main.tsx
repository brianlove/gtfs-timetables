import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import App from './App'
import './index.css'

import Stations from './routes/stations';
import TrainDetail from './routes/train-detail';
import TrainRoutes from './routes/routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/routes" element={<TrainRoutes />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/train">
          <Route path=":trainId" element={<TrainDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
