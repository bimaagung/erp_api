import SideBar from "../../components/layouts/Sidebar";
import FormAddEmployee from "./components/FormAddEmployee";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../features/employeeSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Tab, Tabs } from "react-bootstrap";
const EmployeeAddPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (payload) => {
    try {
      await dispatch(addEmployee(payload)).unwrap();
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
          navigate("/admin/karyawan");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error) {
      Swal.fire("error", error?.meta?.message, "error");
    }
  };

  return (
    <SideBar>
      <div>
        <Tabs
          defaultActiveKey="karyawan-form"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="karyawan-form" title="Informasi Umum">
            <FormAddEmployee onSubmit={handleSubmit} />
          </Tab>
          <Tab eventKey="karyawan-pendidikan" title="Riwayat Pendidikan">
            <h1>Riwayat Pendidikan</h1>
          </Tab>
          <Tab eventKey="karyawan-kerja" title="Riwayat Kerja">
            <h1>Riwayat</h1>
          </Tab>
          <Tab eventKey="karyawan-keluarga" title="Data Keluarga">
            <h1>Data Keluarga</h1>
          </Tab>
          <Tab eventKey="karyawan-pelatihan" title="Data Pelatihan">
            <h1>Data Pelatihan</h1>
          </Tab>
        </Tabs>
      </div>
    </SideBar>
  );
};

export default EmployeeAddPage;
