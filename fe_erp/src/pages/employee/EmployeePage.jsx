import React from 'react'
import SideBar from '../../components/layouts/Sidebar'
import {SiAddthis} from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import EmployeeList from './components/EmployeeList'

const EmployeePage = () => {
  const navigate = useNavigate()
  const handleAddKaryawan = () => {
    navigate('/admin/add/karywan')
  }
  return (
    <SideBar>
    <div className='karyawan-head'>
      <div className='title-karyawan'>
        <p> <span style={{color: "#17a4e0"}} >Home</span>  / Karyawan</p>
      </div>
      <div className='add-karyawan'>
        <h5><span style={{opacity:"0.5", fontSize: "30px"}} >Karyawan</span> 
        <SiAddthis 
        color='#17a4e0' 
        size={30}
        onClick={handleAddKaryawan}
        style={{ cursor: 'pointer' }}
        />
        </h5>
      </div>
    </div>
    <EmployeeList />
  </SideBar>
  )
}

export default EmployeePage