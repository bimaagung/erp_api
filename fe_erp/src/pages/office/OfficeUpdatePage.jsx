import React from 'react'
import FormUpdateKantorCabang from './components/FormUpdateKantorCabang'
import SideBar from '../../components/layouts/Sidebar'

const OfficeUpdatePage = () => {

const handleUpdateKantroCabang = (payload) => {
    console.log(payload)
}

  return (
    <SideBar>
        <FormUpdateKantorCabang onSubmit = {handleUpdateKantroCabang} />
    </SideBar>
  )
}

export default OfficeUpdatePage