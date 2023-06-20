import React from 'react'
import SideBar from '../../components/layouts/Sidebar'
import FormAddEmployee from './components/FormAddEmployee'

const EmployeeAddPage = () => {

  const handleSubmit = (paylod) => {
    console.log(paylod)
  }


  return (
    <SideBar>
       <FormAddEmployee onSubmit = {handleSubmit}/>
    </SideBar>
  )
}

export default EmployeeAddPage