import React, { useState } from "react";
import "../styles/formAddKantorCabang.css";
import { Card } from "react-bootstrap";
import { TimePicker } from 'antd';
import dayjs from 'dayjs';


const FormAddKantorCabang = (props) => {
  
  const format = 'HH:mm'; 
  const [selectedMasukSeninJumat, setSelectedSeninJumat] = useState(dayjs('09:00', format));
  const [selectedMasukSabtuMinggu, setSelectedMasukSabtuMinggu] = useState(dayjs('09:00', format));
  const [selectedKeluarSeninJumat, setSelectedKeluarSeninJumat] = useState(dayjs('17:00', format));
  const [selectedKeluarSabtuMinggu, setSelectedKeluarSabutMinggu] = useState(dayjs('17:00', format));
  const [form,  setForm]= useState({
    nama: "",
    alamat: "",
    phone1: "",
    phone2: "",
    jamMasukSeninJumat: (dayjs('09:00', format)).format(format),
    jamMasukSabtuMinggu: (dayjs('09:00', format)).format(format),
    jamKeluarSeninJumat: (dayjs('17:00', format)).format(format),
    jamKeluarSabtuMinggu: (dayjs('17:00', format)).format(format)
  })
  const handlelMasukSeninJumat = (time) => {
    if (time) {
      setSelectedSeninJumat(time);
      const formattedTime = time.format(format);
      setForm({
        ...form,
        jamMasukSeninJumat: formattedTime,
      });
    }
  };
  
  const handlelMasukSabtuMinggu = (time) => {
    if (time) {
      setSelectedMasukSabtuMinggu(time);
      const formattedTime = time.format(format);
      setForm({
        ...form,
        jamMasukSabtuMinggu: formattedTime,
      });
    }
  };

const handlelKeluarSeninJumat = (time) => {
    if (time) {
      setSelectedKeluarSeninJumat(time);
      const formattedTime = time.format(format);
      setForm({
        ...form,
        jamKeluarSeninJumat: formattedTime,
      });
    }
  };
  const handlelKeluarSabtuMinggu = (time) => {
    if (time) {
      setSelectedKeluarSabutMinggu(time);
      const formattedTime = time.format(format);
      setForm({
        ...form,
        jamMasukSabtuMinggu: formattedTime,
      });
    }
  };

 
  return (
    <Card style={{ width: "100%", height: "auto" }}>
      <Card.Body>
        <div className="title-add-kantor-cabang">Form Cabang</div>
        <hr></hr>
        <form onSubmit={(e => {
              e.preventDefault()
              props.onSubmit(form)
            })}>
          <div >
            <div className="mb-3">
              <label htmlFor="nama" className="form-label">
                Nama:
              </label>
              <input 
              type="text" 
              className="form-control" 
              id="nama"
              onChange={e => setForm({
                ...form, ...{ nama: e.target.value }
              })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Alamat" className="form-label">
                Alamat:
              </label>
              <input 
              type="text" 
              className="form-control" 
              id="Alamat" 
              onChange={e => setForm({
                ...form, ...{ alamat: e.target.value }
              })}
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="phone1" className="form-label">
                    phone1:
                  </label>
                  <input 
                  type="text" 
                  className="form-control" 
                  id="phone1" 
                  onChange={e => setForm({
                    ...form, ...{ phone1: e.target.value }
                  })}
                  />
                </div>
                <label htmlFor="phone1" className="form-label">
                    Jam Masuk (senin-jumat  ):
                  </label>
                  <div className="time-picker">
                  <TimePicker 
                  onChange={handlelMasukSeninJumat} 
                  format={format}
                  defaultValue={selectedMasukSeninJumat} />

                  </div>
                <div className="mb-3">
                  <label htmlFor="phone1" className="form-label">
                    Jam Masuk (sabtu-Minggu):
                  </label>
                  <div className="time-picker">
                  <TimePicker 
                  onChange={handlelMasukSabtuMinggu} 
                  format={format}
                  defaultValue={selectedMasukSabtuMinggu} />

                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="phone2" className="form-label">
                    phone2:
                  </label>
                  <input 
                  type="text" 
                  className="form-control"
                   id="phone2" 
                   onChange={e => setForm({
                    ...form, ...{ phone2: e.target.value }
                  })}
                   />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone1" className="form-label">
                    Jam Keluar (Senin-Jumat):
                  </label>
                  <div className="time-picker">
                  <TimePicker 
                  onChange={handlelKeluarSeninJumat} 
                  format={format}
                  defaultValue={selectedKeluarSeninJumat} />

                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="phone1" className="form-label">
                    Jam Keluar (sabtu-Minggu):
                  </label>
                  <div className="time-picker">
                  <TimePicker 
                  onChange={handlelKeluarSabtuMinggu} 
                  format={format}
                  defaultValue={selectedKeluarSabtuMinggu} />

                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}

export default FormAddKantorCabang;

FormAddKantorCabang.defaultProps = {
  onSubmit: () => {}
}

