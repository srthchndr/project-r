import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SubMenu({ item }) {

  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav)

  return(
    <>
      {item.subNav &&
        <div className='sidebar-link' onClick={item.subNav && showSubnav}>
          <div>
            {item.icon}
            <span className='sidebar-link-label'>{item.title}</span>
          </div>
          <div>
            {
              item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null
            }
          </div>
        </div>
      }
      {!item.subNav &&
        <Link className='sidebar-link' to={item.path} onClick={item.subNav && showSubnav}>
          <div>
            {item.icon}
            <span className='sidebar-link-label'>{item.title}</span>
          </div>
        </Link>
      }
      {subnav && item.subNav.map((item, index) => {
        return (
          <Link className='submenu sidebar-link' to={item.path} key={index}>
            <div>
              {item.icon}
              <span className='sidebar-link-label'>{item.title}</span>
            </div>
            {/* <div>
              {
                item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed : null
              }
            </div> */}
          </Link>
        )
      })

      }
    </>
  )
}

export default SubMenu;