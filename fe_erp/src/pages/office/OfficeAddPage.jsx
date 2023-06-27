import React from "react";
import SideBar from "../../components/layouts/Sidebar";
import FormAddKantorCabang from "./components/FormAddKantorCabang";
import { useDispatch, useSelector } from 'react-redux';
import { addOffice, officeSelector } from "../../features/officeSlice";
import { useNavigate } from "react-router-dom";


const OfficeAddPage = () => {
  const dispatch = useDispatch()
  const loading = useSelector(officeSelector.loading)
  const errorMessage = useSelector(officeSelector.errorMessage)
  const navigate = useNavigate()
  
  const handleSubmit = (payload) => {
    dispatch(addOffice(payload))
    if(!loading && !errorMessage) {
      navigate('/admin/kantor-cabang')
    }
  }
  return (
    <SideBar>
     <FormAddKantorCabang onSubmit = {handleSubmit}/>
    </SideBar>
  );
};

export default OfficeAddPage;
