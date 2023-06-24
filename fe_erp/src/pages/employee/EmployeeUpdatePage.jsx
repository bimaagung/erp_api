import React from "react";
import FormUpdateEmployee from "./components/FormUpdateEmployee";
import SideBar from "../../components/layouts/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { employeeSelector, updateEmployee } from "../../features/employeeSlice";

const EmployeeUpdatePage = () => {
  const loading = useSelector(employeeSelector.loading)
  const errorMessage = useSelector(employeeSelector.errorMessage)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const updateKaryawan = (payload) => {
    dispatch(updateEmployee({ id: id, params: payload }));
  }

  const handleUpdateEmployee = (payload) => {
    const updateData = {}
    if (payload) {
      for (const key in payload) {
          const value = payload[key];
          if (key !== '' && value !== null && value !== "" && value !== undefined) {
              updateData[key] = value;
          }
      }
      updateKaryawan(updateData);

      if (!loading && !errorMessage) {
        navigate('/admin/karyawan')
      }
  }
  };
  return (
    <SideBar>
      <FormUpdateEmployee onSubmit={handleUpdateEmployee} />
    </SideBar>
  );
};

export default EmployeeUpdatePage;
