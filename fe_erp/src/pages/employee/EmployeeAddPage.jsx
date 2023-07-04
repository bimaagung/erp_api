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
        <FormAddEmployee onSubmit={handleSubmit} />
    </SideBar>
  );
};

export default EmployeeAddPage;
