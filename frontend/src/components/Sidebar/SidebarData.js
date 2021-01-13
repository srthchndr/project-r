import React from 'react'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'

export const SidebarData = [
  {
    title: 'Overview',
    path: '/overview',
    icon: <AiIcons.AiFillHome color='white'/>,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    subNav: [
      {
        title: 'Users',
        path: '/overview/users',
        icon: <IoIcons.IoIosPaper color='white'/>
      },
      {
        title: 'Revenue',
        path: '/overview/revenue',
        icon: <IoIcons.IoMdPaper color='white'/>
      }
    ]
  },
  {
    title: 'Reports',
    path: '/report/report1',
    icon: <AiIcons.AiFillHome color='white'/>,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    subNav: [
      {
        title: 'Report 1',
        path: '/report/report1',
        icon: <IoIcons.IoIosPaper color='white'/>
      },
      {
        title: 'Report 2',
        path: '/report/report2',
        icon: <IoIcons.IoMdPaper color='white'/>
      },
      {
        title: 'Report 3',
        path: '/report/report3',
        icon: <IoIcons.IoMdPaper color='white'/>
      }
    ]
  },
  {
    title: 'Product',
    path: '/product',
    icon: <AiIcons.AiFillHome color='white'/>,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />
  }
]