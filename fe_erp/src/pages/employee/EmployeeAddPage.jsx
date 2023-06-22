import React from 'react'
import SideBar from '../../components/layouts/Sidebar'
import FormAddEmployee from './components/FormAddEmployee'
import { useDispatch, useSelector } from 'react-redux'
import { addEmployee, employeeSelector } from '../../features/employeeSlice'
import { useNavigate } from 'react-router-dom'

const EmployeeAddPage = () => {
const errorMessage = useSelector(employeeSelector.errorMessage)

const navigate = useNavigate()
const dispatch = useDispatch()
  const handleSubmit = (paylod) => {
    dispatch(addEmployee(paylod))
    if(errorMessage) {
      navigate('/admin/karyawan')
    }
  }


  return (
    <SideBar>
       <FormAddEmployee onSubmit = {handleSubmit}/>
    </SideBar>
  )
}

export default EmployeeAddPage