import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { SiAddthis } from "react-icons/si";
import { AiOutlineMinusSquare } from "react-icons/ai";
import "../modals/styles/addFamilyModal.css";
import { useSelector } from "react-redux";
import { familySelector } from "../../features/familySlice";

export const AddFamilyModal = (props) => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    nik: "",
    status: "",
    pekerjaan: ""
  });
  const [rows, setRows] = useState([form]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const loading = useSelector(familySelector.loading);

  const handleAddRow = () => {
    setRows([...rows, { ...form }]);
    setForm({ nama: "", nik: "", status: "", pekerjaan: "" });
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };
  
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      props.onSubmit(rows);
      if (!loading) {
        handleClose();
      }
    };
  return (
    <>
      <div className="add-family">
        <h5>
          <SiAddthis
            color="#17a4e0"
            size={30}
            onClick={handleShow}
            style={{ cursor: "pointer" }}
          />
        </h5>
      </div>

      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Data Keluarga</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form> 
            {rows.map((row, index) => (
              <div className="row" key={index}>
                <div className="col-md-3">
                  <div className="mb-3">
                    <label htmlFor={`nik${index}`} className="form-label">
                      NIK:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`nik${index}`}
                      name="nik"
                      value={row.nik}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor={`nama${index}`} className="form-label">
                      Nama:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`nama${index}`}
                      name="nama"
                      value={row.nama}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="mb-3">
                    <label htmlFor={`status${index}`} className="form-label">
                      Status:
                    </label>
                    <select
                      id={`status${index}`}
                      className="form-select"
                      name="status"
                      value={row.status}
                      onChange={(e) => handleInputChange(e, index)}
                    >
                      <option value=""></option>
                      <option value="Ayah kandung">Ayah Kandung</option>
                      <option value="Ibu Kandung">Ibu Kandung</option>
                      <option value="Saudara Kandung">Saudara Kandung</option>
                      <option value="Lainya">Lainnya</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="mb-3">
                    <label
                      htmlFor={`pekerjaan${index}`}
                      className="form-label"
                    >
                      Pekerjaan:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`pekerjaan${index}`}
                      name="pekerjaan"
                      value={row.pekerjaan}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                </div>
                <div className="col-md-1">
                  <Button
                    variant="light"
                    onClick={() => handleRemoveRow(index)}
                  >
                    <AiOutlineMinusSquare />
                  </Button>
                </div>
              </div>
            ))}

          </Form>
          <Button variant="light" onClick={handleAddRow}>
            <SiAddthis />
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
