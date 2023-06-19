import React from "react";
import SideBar from "../../components/layouts/Sidebar";
import FormAddKantorCabang from "./components/FormAddKantorCabang";


const handleSubmit = (payload) => {
  console.log(payload)
}

const OfficeAddPage = () => {
  return (
    <SideBar>
     <FormAddKantorCabang onSubmit = {handleSubmit}/>
    </SideBar>
  );
};

export default OfficeAddPage;
