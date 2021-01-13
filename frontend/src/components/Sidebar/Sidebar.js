import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io'
import { SidebarData } from './SidebarData'
import SubMenu from './SubMenu'

function Sidebar() {

	const [sidebar, setSidebar] = useState(false)

	const showSidebar = () => setSidebar(!sidebar)

	//chnage this based on user auth
	var userStatus = {
		name: 'Login',//"Logout"
		path: '/login'//"/logout"
	}
		return (
			<>
				<div className='navbar-top'>
						<Link to='#' className='navbar-top-menu-icon'>
								<FaIcons.FaBars onClick={showSidebar} color='white'/>
						</Link>
						<div className="navbar-top-end">
							<Link to={userStatus.path} className="navbar-top-end-link">
								{userStatus.name}
							</Link>
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
