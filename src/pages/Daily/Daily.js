import React from 'react'
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router';
import './Daily.css'
export default function Daily() {
    const navigate = useNavigate();

    const onDatePick = (data) => {
        const d = new Date(data)
        navigate(`/daily/${d.getTime()}`)
    }

    return (
        <div className="daily">
            <Calendar
                onChange={onDatePick}
            />
        </div>
    )
}
