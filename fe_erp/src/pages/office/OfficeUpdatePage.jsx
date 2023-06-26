import React from 'react'
import FormUpdateKantorCabang from './components/FormUpdateKantorCabang'
import SideBar from '../../components/layouts/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateOffice, officeSelector } from '../../features/officeSlice'
import { useNavigate, useParams } from 'react-router-dom'

const OfficeUpdatePage = () => {
  const loading = useSelector(officeSelector.loading)
  const errorMessage = useSelector(officeSelector.errorMessage)
  const navigate = useNavigate()
const dispatch = useDispatch()
const { id } = useParams()

const updateKantroCabang = (payload) => {
    dispatch(UpdateOffice({id: id, params: payload}))
    
}

const handleUpdateKantroCabang = (payload) => {
  const updateData = {}
  if (payload) {
    for (const key in payload) {
        const value = payload[key];
        if (key !== '' && value !== null && value !== "" && value !== undefined) {
            updateData[key] = value;
        }
    }
    updateKantroCabang(updateData);

    if (!loading && !errorMessage) {
      navigate('/admin/kantor-cabang')
    }
}
};

  return (
    <SideBar>
        <FormUpdateKantorCabang onSubmit = {handleUpdateKantroCabang} />
    </SideBar>
  )
}

export default OfficeUpdatePage