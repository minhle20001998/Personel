import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router'
import './MainLayout.css'
export default function MainLayouts() {
    return (
        <>
            <Navbar></Navbar>
            <div className="main-outlet">
                <Outlet />
            </div>
        </>
    )
}
