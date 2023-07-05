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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const loading = useSelector(familySelector.loading);
  const [form, setForm] = useState({
    nama: "",
    nik: "",
    status: "",
    pekerjaan: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(form);
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
            <div className="row">
              <div className="col-md-3">
                <div className="mb-3">
                  <label htmlFor="nik" className="form-label">
                    NIK:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nik"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        ...{ nik: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="nama" className="form-label">
                    Nama:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nama"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        ...{ nama: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status:
                  </label>
                  <select
                      id="inputState"
                      className="form-select"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          ...{
                            status: e.target.value,
                          },
                        })
                      }
                    >
                      <option value=""></option>
                      <option value="Ayah kandung">Ayah Kandung</option>
                      <option value="Ibu Kandung">Ibu Kandung</option>
                      <option value="Saudara Kandung">saudara Kandung</option>
                      <option value="Lainya">Lainnya</option>
                    </select>
                </div>
              </div>
              <div className="col-md-2">
                <div className="mb-3">
                  <label htmlFor="pekerjaan" className="form-label">
                    Pekerjaan:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pekerjaan"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        ...{ pekerjaan: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </Form>
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
