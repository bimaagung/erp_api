import React, { useEffect } from "react";
import FormUpdateEmployee from "./components/FormUpdateEmployee";
import SideBar from "../../components/layouts/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { employeeSelector, getEmployeeByid, updateEmployee } from "../../features/employeeSlice";

const EmployeeUpdatePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const updateKaryawan = (payload) => {
    dispatch(updateEmployee({ id: id, params: payload }));
  }

// const dataKaryawan = useSelector(employeeSelector.selectData)

// useEffect(() => {
// dispatch(getEmployeeByid(id))
// }, [])

  const handleUpdateEmployee = (payload) => {
    // console.log(payload);
    const updateData = {}
    if (payload) {
      for (const key in payload) {
          const value = payload[key];
          if (key !== '' && value !== null && value !== "" && value !== undefined) {
              updateData[key] = value;
          }
      }
      console.log(updateData)
      updateKaryawan(updateData);
  }
  };
  return (
    <SideBar>
      <FormUpdateEmployee onSubmit={handleUpdateEmployee} />
    </SideBar>
  );
};

export default EmployeeUpdatePage;
