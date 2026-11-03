import React from 'react';
import { createRoot } from 'react-dom/client';
import Booking from '../app/booking';
import '../app/globals.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><Booking/></React.StrictMode>);
