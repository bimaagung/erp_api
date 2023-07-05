import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { SiAddthis } from "react-icons/si";
import { AiOutlineMinusSquare } from "react-icons/ai";
import "../modals/styles/addTraningModal.css";
import { useSelector } from "react-redux";
import { DatePicker } from "rsuite";
import { familySelector } from "../../features/familySlice";

export const AddTraningModal = (props) => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    tanggal: "",
  });

  const formateDate = (value) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate;
  };

  const handleTanggal = (value, index) => {
    const date = formateDate(value);
    const updatedRows = [...rows];
    updatedRows[index].tanggal = date;
    setRows(updatedRows);
  };

  const [rows, setRows] = useState([form]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const loading = useSelector(familySelector.loading);

  const handleAddRow = () => {
    setRows([...rows, { ...form }]);
    setForm({ nama: "", tanggal: "" });
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
      <div className="add-traning">
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
          <Modal.Title>Data Pelatihan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {rows.map((row, index) => (
              <div className="row" key={index}>
                <div className="col-md-9">
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
                <div className="mb-3 position-relative">
                  <label
                    htmlFor={`tanggal_masuk${index}`}
                    className="form-label"
                  >
                    Tanggal:
                  </label>
                  <div>
                    <DatePicker
                      format="yyyy-MM-dd"
                      id={`tanggal${index}`}
                      name="tanggal"
                      onChange={(value) => handleTanggal(value, index)}
                    />
                  </div>
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
