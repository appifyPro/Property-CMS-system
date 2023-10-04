import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CAvatar, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import {  cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import  './AppHeaderDropdown.css'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const logOutFun = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0 applyCursor" placement="bottom-end">
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2 " />
          Profile
        </CDropdownItem>
        <CDropdownItem
          onClick={() => {
            logOutFun()
          }}
        >
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
