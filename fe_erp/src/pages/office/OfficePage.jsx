import React, { useEffect } from 'react'
import SideBar from '../../components/layouts/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getOfficeList, officeSelector } from '../../features/officeSlice'
import OfficeList from './components/OfficeList'

const OfficePage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOfficeList())
  }, [])


  return (
    <SideBar>
      < OfficeList />
    </SideBar>
  )
}

export default OfficePage