import React, { useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  employeeSelector,
  getEmployeeByid,
} from "../../../features/employeeSlice";
import { useParams } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";
import { AddEducationModal } from "../../../components/modals/AddEducationModal";
import "../styles/formAddFamily.css";

const mockPendidikan = [
  {
    nama: "Universita Komputer Indonesia",
    tingkat: "S1",
    tanggal_masuk: "2012",
  },
];

const FormAddEducationLevel = () => {
  const { id } = useParams();
  const employee = useSelector(employeeSelector.selectData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployeeByid(id));
  }, [dispatch, id]);

  const handleAddFamilySubmit = async (payload) => {
    try {
      for (let i = 0; i < payload.length; i++) {
        console.log(payload[i]);
      }
      dispatch(getEmployeeByid(id));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const handleDeleteEducation = async (educationId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // await dispatch(deleteFamily(educationId)).unwrap();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          dispatch(getEmployeeByid(id));
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
  return (
    <>
      <Card style={{ width: "100%", height: "auto" }}>
        <Card.Body>
          <div className="title-add-family">Data Pendidikan</div>
          <hr></hr>
          {mockPendidikan.map((o) => (
            <Table striped>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Tingkat</th>
                  <th>Tahun</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{o.nama}</td>
                  <td>{o.tingkat}</td>
                  <td>
                    {o.tanggal_masuk}{" "}
                    <TiDelete
                      color="red"
                      size={30}
                      onClick={() => handleDeleteEducation(o.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          ))}
          <AddEducationModal onSubmit={handleAddFamilySubmit} />
        </Card.Body>
      </Card>
    </>
  );
};

export default FormAddEducationLevel;
