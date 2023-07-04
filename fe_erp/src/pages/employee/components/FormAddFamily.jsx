import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  employeeSelector,
  getEmployeeByid,
} from "../../../features/employeeSlice";
import { useParams } from "react-router-dom";
import "../styles/formAddFamily.css";
import { SiAddthis } from "react-icons/si";
import { AddFamilyModal } from "../../../components/modals/AddFamilyModal";

const FormAddFamily = () => {
  const { id } = useParams();
  const employee = useSelector(employeeSelector.selectData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployeeByid(id));
  }, [dispatch, id]);


  const [show, setShow] = useState(false);

  const handleAddFamily = () => {
    setShow(true)
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
                  <label htmlFor={`nik-${o.id}`} className="form-label">
                    NIK:
                  </label>
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
    <AddFamilyModal show = {show}/>
        
      </Card.Body>
    </Card>
    </>
  );
};

export default FormAddFamily;
