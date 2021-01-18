import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io'
import { SidebarData } from './SidebarData'
import SubMenu from './SubMenu'
import AuthService from '../../Service/Auth-service';
import Logout from '../Logout'

function Sidebar(props) {
  const history = useHistory();
	const [sidebar, setSidebar] = useState(false)

	const showSidebar = () => setSidebar(!sidebar)

	const logoutListener = (e) => {
    e.preventDefault();
		AuthService.logout();
		props.setIsUserLoggedIn(false);
    history.push('/login');
	};

	return (
		<>
			<div className='navbar-top'>
					<Link to='#' className='navbar-top-menu-icon'>
							<FaIcons.FaBars onClick={showSidebar} color='white'/>
					</Link>
					<div className="navbar-top-end">
						{props.isUserLoggedIn && <Logout setIsUserLoggedIn={props.setIsUserLoggedIn}/>}
						{!props.isUserLoggedIn && 
						<Link to="/login" className="navbar-top-end-link">
							Login
						</Link>}
					</div>
			</div>
			<nav className={`sidebar-nav ${sidebar ? "open" : ""}`}>
				<div className='sidebar-nav-wrapper'>
					<Link to='#' className='navbar-top-menu-icon'>
						<IoIcons.IoIosArrowBack onClick={showSidebar} color='white'/>	
					</Link>
					{SidebarData.map((item, index) => {
						return <SubMenu item={item} key={index} />
					})}		
				</div>
			</nav>
		</>
	)
}

export default Sidebar
