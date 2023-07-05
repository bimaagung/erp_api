import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  employeeSelector,
  getEmployeeByid,
} from "../../../features/employeeSlice";
import { useParams } from "react-router-dom";
import "../styles/formAddFamily.css";
import { AddFamilyModal } from "../../../components/modals/AddFamilyModal";
import { addFamily, deleteFamily } from "../../../features/familySlice";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";

const FormAddFamily = () => {
  const { id } = useParams();
  const employee = useSelector(employeeSelector.selectData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployeeByid(id));
  }, [dispatch, id]);

  const handleAddFamilySubmit = async (payload) => {
    try {
      await dispatch(addFamily({ id: id, params: payload })).unwrap();
      dispatch(getEmployeeByid(id));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDeleteFamily = async (familyId) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(deleteFamily(familyId)).unwrap();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
          )
          dispatch(getEmployeeByid(id));
        }
      })
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <>
      <Card style={{ width: "100%", height: "auto" }}>
        <Card.Body>
          <div className="title-add-family">Form Keluarga</div>
          <hr></hr>
          {employee?.informasi_keluarga?.map((o) => (
            <div className="data-family" key={o.id}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor={`nama-${o.id}`} className="form-label">
                      Nama:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`nama-${o.id}`}
                      value={o.nama}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-8">
                        <label htmlFor={`nik-${o.id}`} className="form-label">
                          NIK:
                        </label>
                      </div>
                      <div className="col-md-4">
                        <div className="delete-family-button">
                          <TiDelete
                            color="red"
                            size={30}
                            onClick={() => handleDeleteFamily(o.id)}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id={`nik-${o.id}`}
                      value={o.nik}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor={`status-${o.id}`} className="form-label">
                      Status:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`status-${o.id}`}
                      value={o.status}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor={`pekerjaan-${o.id}`} className="form-label">
                      Pekerjaan:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`pekerjaan-${o.id}`}
                      value={o.pekerjaan}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <AddFamilyModal onSubmit={handleAddFamilySubmit} />
        </Card.Body>
      </Card>
    </>
  );
};

export default FormAddFamily;
