import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

class Navbar extends Component {
    render() {
        return (
            <nav role="navigation">
                <ul className="main">
                    <li className="dashboard"><Link to="/dashboard">Dashboard</Link></li>
                    <li className="users"><Link to="/alljobs">All Jobs</Link></li>
                    <li className="write"><Link to="/postjob">Post Job</Link></li>
                    <li className="edit"><Link to="/editjob">Edit Job</Link></li>

                </ul>
            </nav>
        )
    }
}

export default Navbar
