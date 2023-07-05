import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { SiAddthis } from "react-icons/si";
import { AiOutlineMinusSquare } from "react-icons/ai";
import "../modals/styles/addEducationModal.css";
import { DatePicker } from "rsuite";
export const AddExperienceModal = (props) => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    tingkat: "",
    tipe: "",
    alamat: "",
    tanggal_masuk: "",
    tanggal_keluar: "",
  });

  const formateDate = (value) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate;
  };

  const handleTanggalMasuk = (value, index) => {
    const date = formateDate(value);
    const updatedRows = [...rows];
    updatedRows[index].tanggal_masuk = date;
    setRows(updatedRows);
  };

  const handleTanggalKeluar = (value, index) => {
    const date = formateDate(value);
    const updatedRows = [...rows];
    updatedRows[index].tanggal_keluar = date;
    setRows(updatedRows);
  };

  const [rows, setRows] = useState([form]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddRow = () => {
    setRows([...rows, { ...form }]);
    setForm({ nama: "", tingkat: "", tanggal_masuk: "" });
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
    handleClose();
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
          <Modal.Title>Data Riwayat Kerja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {rows.map((row, index) => (
              <div className="row" key={index}>
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
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor={`tingkat${index}`} className="form-label">
                      Posisi:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`posisi${index}`}
                      name="posisi"
                      value={row.posisi}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor={`tipe${index}`} className="form-label">
                      Tipe:
                    </label>
                    <select
                      id={`tipe${index}`}
                      className="form-select"
                      name="tipe"
                      value={row.tipe}
                      onChange={(e) => handleInputChange(e, index)}
                    >
                      <option value=""></option>
                      <option value="Kontrak">Kontrak</option>
                      <option value="Tetap">Tetap</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-7">
                    <div className="mb-3">
                      <label htmlFor={`alamat${index}`} className="form-label">
                        Alamat:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={`alamat${index}`}
                        name="alamat"
                        value={row.alamat}
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
                      Tanggal Masuk:
                    </label>
                    <div>
                      <DatePicker
                        format="yyyy-MM-dd"
                        id={`tanggal_masuk${index}`}
                        name="tanggal_masuk"
                        onChange={(value) => handleTanggalMasuk(value, index)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="mb-3 position-relative">
                    <label
                      htmlFor={`tanggal_keluar${index}`}
                      className="form-label"
                    >
                      Tanggal Keluar:
                    </label>
                    <div>
                      <DatePicker
                        format="yyyy-MM-dd"
                        id={`tanggal_keluar${index}`}
                        name="tanggal_keluar"
                        onChange={(value) => handleTanggalKeluar(value, index)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-1">
                  <div className="action-modal-experience">
                    <Button
                      variant="light"
                      onClick={() => handleRemoveRow(index)}
                    >
                      <AiOutlineMinusSquare />
                    </Button>
                  </div>
                </div>
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
