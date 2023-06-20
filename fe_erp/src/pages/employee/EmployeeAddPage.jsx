import React from 'react'
import SideBar from '../../components/layouts/Sidebar'
import FormAddEmployee from './components/FormAddEmployee'
import { useDispatch } from 'react-redux'
import { addEmployee } from '../../features/employeeSlice'

const EmployeeAddPage = () => {
const dispatch = useDispatch()
  const handleSubmit = (paylod) => {
    console.log(paylod)
    dispatch(addEmployee(paylod))
  }


  return (
    <SideBar>
       <FormAddEmployee onSubmit = {handleSubmit}/>
    </SideBar>
  )
}

export default EmployeeAddPage