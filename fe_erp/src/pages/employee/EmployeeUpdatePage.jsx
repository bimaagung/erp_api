import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { employeeSelector, updateEmployee } from "../../features/employeeSlice";
import SideBar from "../../components/layouts/Sidebar";
import FormUpdateEmployee from "./components/FormUpdateEmployee";
import FormAddEducationLevel from "./components/FormAddEducationLevel";
import FormAddFamily from "./components/FormAddFamily";
import FormAddExperience from "./components/FormAddExprience";
import FormAddTraning from "./components/FormAddTraning";

const EmployeeUpdatePage = () => {
  const loading = useSelector(employeeSelector.loading);
  const errorMessage = useSelector(employeeSelector.errorMessage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const updateKaryawan = (payload) => {
    dispatch(updateEmployee({ id: id, params: payload }));
  };

  const handleUpdateEmployee = (payload) => {
    const updateData = {};
    if (payload) {
      for (const key in payload) {
        const value = payload[key];
        if (key !== "" && value !== null && value !== "" && value !== undefined) {
          updateData[key] = value;
        }
      }
      updateKaryawan(updateData);

      if (!loading && !errorMessage) {
        navigate("/admin/karyawan");
      }
    }
  };

  return (
    <SideBar>
      <div>
        <Tabs defaultActiveKey="karyawan-form" id="justify-tab-example" className="mb-3" justify>
          <Tab eventKey="karyawan-form" title="Informasi Umum">
            <FormUpdateEmployee onSubmit={handleUpdateEmployee} />
          </Tab>
          <Tab eventKey="karyawan-pendidikan" title="Riwayat Pendidikan">
            <FormAddEducationLevel />
          </Tab>
          <Tab eventKey="karyawan-kerja" title="Riwayat Kerja">
            <FormAddExperience />
          </Tab>
          <Tab eventKey="karyawan-keluarga" title="Data Keluarga">
            <FormAddFamily />
          </Tab>
          <Tab eventKey="karyawan-pelatihan" title="Data Pelatihan">
            <FormAddTraning />
          </Tab>
        </Tabs>
      </div>
    </SideBar>
  );
};

export default EmployeeUpdatePage;
