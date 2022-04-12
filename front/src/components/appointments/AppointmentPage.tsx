import React from 'react';
import { Link } from 'react-router-dom';


const AppointmentsPage = () => {
    return (
        <div>
            <h1>Appointments</h1>
            <Link to='appointments/new'> New app</Link>
            <AppointmentsTable/>
        </div>
    )
}