/* eslint-disable */
import React, { Component } from 'react'
import SessionStorageManager from '../../Config/SessionStorageManager';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './Header.css'

class Header extends Component {

    handleLogout = () => {
        SessionStorageManager.clearSessionStorage();
        window.location.reload()
    }

    render() {
        const { user } = this.props
        return (
            <Menu.Item
                style={{
                    float: 'right', display: 'flex',
                    justifyContent: "space-around",
                    alignItems: 'center', width: "180px"
                }}
            >
                <a>
                    <Icon
                        type="notification"
                        style={{ fontSize: 20, color: 'white' }}
                    />
                </a>
                <a>
                    <Icon
                        type="message"
                        style={{ fontSize: 20, color: 'white' }}
                    />
                </a>
                    </Menu.Item>
        )
        // return (
        //     <header role="banner">
        //         <h1>CMS News Articles</h1>
        //         <span>Nes Articles</span>
        //         <ul className="utilities">
        //             {user ? 
        //                  <div>
        //                 <li className="users">
        //                     <a href="#">{user.name}</a>
        //                 </li>

        //                 <li className="users">
        //                     <a href="#">{user.name}</a>
        //                 </li>
        //                 <li className="users">
        //                     <a href="#">{user.name}</a>
        //                 </li>
        //                 <li className="users">
        //                     <a href="#">{user.name}</a>
        //                 </li>
        //                 <li className="users">
        //                     <a href="#">{user.name}</a>
        //                 </li>
        //                 <li className="users">
        //                     <a href="#">{user.name}</a>
        //                 </li>
        //                 <li className="logout warn">
        //                     <a onClick={this.handleLogout}>Log Out</a>
        //                 </li>
        //             </div>
        //              : null}
        //         </ul>
        //     </header>
        // )
    }
}

export default Header
