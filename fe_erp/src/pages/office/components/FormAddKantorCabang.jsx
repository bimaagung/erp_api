import React, { useState } from "react";
import "../styles/formAddKantorCabang.css";
import { Card } from "react-bootstrap";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";

function FormAddKantorCabang() {
  const [selectedTime, setSelectedTime] = useState(
    new Date("01/01/2021 08:30 AM")
  );
  const minTime = new Date("01/02/2021 09:00 AM");
  const maxTime = new Date("01/02/2021 18:00 AM");

  const handleTimeChange = (event) => {
    setSelectedTime(event.value);
  };

  const formattedTime = selectedTime.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log(formattedTime);
  return (
    <Card style={{ width: "100%", height: "auto" }}>
      <Card.Body>
        <div className="title-add-kantor-cabang">Form Cabang</div>
        <hr></hr>
        <form>
          <div>
            <div className="mb-3">
              <label htmlFor="nama" className="form-label">
                Nama:
              </label>
              <input type="text" className="form-control" id="nama" />
            </div>
            <div className="mb-3">
              <label htmlFor="Alamat" className="form-label">
                Alamat:
              </label>
              <input type="text" className="form-control" id="Alamat" />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="phone1" className="form-label">
                    phone1:
                  </label>
                  <input type="text" className="form-control" id="phone1" />
                </div>
                <label htmlFor="phone1" className="form-label">
                    Jam Masuk (senin-jumat):
                  </label>
                <TimePickerComponent
                  placeholder="Select a time"
                  value={selectedTime}
                  min={minTime}
                  max={maxTime}
                  format="HH:mm"
                  step={60}
                  onChange={handleTimeChange}
                ></TimePickerComponent>
                <div className="mb-3">
                  <label htmlFor="phone1" className="form-label">
                    Jam Masuk (sabtu-Minggu):
                  </label>
                  <input type="text" className="form-control" id="phone1" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="phone2" className="form-label">
                    phone2:
                  </label>
                  <input type="text" className="form-control" id="phone2" />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone1" className="form-label">
                    Jam Keluar (Senin-Jumat):
                  </label>
                  <input type="text" className="form-control" id="phone1" />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone1" className="form-label">
                    Jam Keluar (sabtu-Minggu):
                  </label>
                  <input type="text" className="form-control" id="phone1" />
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
