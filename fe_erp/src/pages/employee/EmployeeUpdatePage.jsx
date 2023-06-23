import React from "react";
import FormUpdateEmployee from "./components/FormUpdateEmployee";
import SideBar from "../../components/layouts/Sidebar";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateEmployee } from "../../features/employeeSlice";

const EmployeeUpdatePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleUpdateEmployee = (payload) => {
    console.log(payload);
    dispatch(updateEmployee({ id: id, params: payload }));
  };
  return (
    <SideBar>
      <FormUpdateEmployee onSubmit={handleUpdateEmployee} />
    </SideBar>
  );
};

export default EmployeeUpdatePage;
