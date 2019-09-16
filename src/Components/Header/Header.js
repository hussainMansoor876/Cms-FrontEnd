/* eslint-disable */
import React, { Component } from 'react'
import SessionStorageManager from '../../Config/SessionStorageManager';
import './Header.css'

class Header extends Component {

    handleLogout = () => {
        SessionStorageManager.clearSessionStorage();
        window.location.reload()
    }

    render() {
        const { user } = this.props
        return (
            <header role="banner">
                <h1>Admin Panel</h1>
                <ul className="utilities">
                    {user ? 
                         <div>
                        <li className="users">
                            <a href="#">{user.name}</a>
                        </li>
                        <li className="logout warn">
                            <a onClick={this.handleLogout}>Log Out</a>
                        </li>
                    </div>
                     : null}
                </ul>
            </header>
        )
    }
}

export default Header
