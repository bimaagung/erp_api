import React from 'react'
import FormUpdateKantorCabang from './components/FormUpdateKantorCabang'
import SideBar from '../../components/layouts/Sidebar'
import { useDispatch } from 'react-redux'
import { UpdateOffice } from '../../features/officeSlice'
import { useParams } from 'react-router-dom'

const OfficeUpdatePage = () => {
const dispatch = useDispatch()
const { id } = useParams()

const handleUpdateKantroCabang = (payload) => {
    dispatch(UpdateOffice({id: id, params: payload}))
    
}

  return (
    <SideBar>
        <FormUpdateKantorCabang onSubmit = {handleUpdateKantroCabang} />
    </SideBar>
  )
}

export default OfficeUpdatePage