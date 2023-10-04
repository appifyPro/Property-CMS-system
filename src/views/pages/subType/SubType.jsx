

import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import ListSubType from '../../../components/subTypes/SubTypes'



const ListType = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <ListSubType/>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default ListType
