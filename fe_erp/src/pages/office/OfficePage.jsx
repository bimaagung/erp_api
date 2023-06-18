import React, { useEffect } from 'react'
import SideBar from '../../components/layouts/Sidebar'
import { useDispatch } from 'react-redux'
import { getOfficeList } from '../../features/officeSlice'
import OfficeList from './components/OfficeList'
import {SiAddthis} from 'react-icons/si'
import { useNavigate } from 'react-router-dom'

const OfficePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOfficeList())
  }, [])

  const handleAddKantroCabang = () => {
    navigate('/admin/add/kantor-cabang')
  }

  return (
    <SideBar>
      <div className='kantor-cabang-head'>
        <div className='title-kantor-cabang'>
          <p> <span style={{color: "#17a4e0"}} >Home</span>  / Cabang</p>
        </div>
        <div className='add-kantor-cabang'>
          <h5><span style={{opacity:"0.5", fontSize: "30px"}} >Cabang</span> 
          <SiAddthis 
          color='#17a4e0' 
          size={30}
          onClick={handleAddKantroCabang}
          style={{ cursor: 'pointer' }}
          />
          </h5>
        </div>
      </div>
      < OfficeList />
    </SideBar>
  )
}

export default OfficePage