/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { DatePicker } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import "../styles/formAddEmployee.css";
import { getOfficeList, officeSelector } from "../../../features/officeSlice";
import {
  departmentSelector,
  getDepartemntList,
} from "../../../features/departmentSlice";
import {
  getPositionList,
  positionSelector,
} from "../../../features/positionSlice";
import { bankType } from "../const/bankType";

const FormAddEmployee = (props) => {
  const office = useSelector(officeSelector.selectData);
  const department = useSelector(departmentSelector.selectData);
  const position = useSelector(positionSelector.selectData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOfficeList());
    dispatch(getDepartemntList());
    dispatch(getPositionList());
  }, []);

  const [form, setForm] = useState({
    nama: "",
    nik: "",
    ttl: "",
    jenis_kelamin: "",
    email: "",
    alamat: "",
    domisili: "",
    pendidikan: "",
    agama: "",
    tanggal_lahir: "",
    telp: "",
    foto: null,
    admin: 0,
    npwp: "",
    tipe_pajak: "",
    potongan_pajak: null,
    tunjangan_pajak: null,
    nama_bank: "",
    nomor_akun_bank: null,
    bpjs_ketenagakerjaan: null,
    bpjs_kesehatan: null,
    kantor_cabang_id: null,
    department_id: "",
    jabatan_id: "",
    tanggal_masuk: "",
    status: "",
    priode_kontrak: "",
    potongan_terlambat: null,
    toleransi_keterlambatan: null,
    mode_absensi: "",
    absen_diluar_kantor: "",
  });

  // console.log(form);

  const formateDate = (value) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate;
  };

  const handleBirtDay = (value) => {
    const date = formateDate(value);
    setForm({
      ...form,
      ...{ tanggal_lahir: date },
    });
  };
  const handleStartWorkDate = (value) => {
    const date = formateDate(value);
    setForm({
      ...form,
      ...{ tanggal_masuk: date },
    });
  };

  const [previewSource, setPreviewSource] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setForm({
      ...form,
      ...{ foto: file },
    });
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <Card style={{ width: "100%", height: "auto" }}>
      <Card.Body>
        <div className="title-add-employee">Form Karyawan</div>
        <hr></hr>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit(form);
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <div>
                <input type="file" onChange={handleFileInputChange} />
                {previewSource && (
                  <img
                    src={previewSource}
                    alt="Preview"
                    style={{
                      width: "200px",
                      height: "200px",
                      border: "1px solid #ccc",
                    }}
                  />
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="informasi-umum">
                <h4>informasi umum</h4>
              </div>
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
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="nik" className="form-label">
                      NIK khusus:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nik"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          ...{ nik: parseInt(e.target.value) },
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ttl" className="form-label">
                      Tempat Lahir:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ttl"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          ...{ ttl: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="jenis kelamin" className="form-label">
                      Jenis Kelamin:
                    </label>
                    <select
                      id="inputState"
                      className="form-select"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          ...{
                            jenis_kelamin: e.target.value,
                          },
                        })
                      }
                    >
                      <option value=""></option>
                      <option value="L">Laki-laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="agama" className="form-label">
                      Agama:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="agama"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          ...{ agama: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tanggal lahir" className="form-label">
                      Tanggal Lahir:
                    </label>

                    <DatePicker format="yyyy-MM-dd" onChange={handleBirtDay} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ttl" className="form-label">
                      No. handphone:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="jenis kelamin"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          ...{ telp: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="jenis kelamin"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ...{ email: e.target.value },
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Alamat Sesuai KTP:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="jenis kelamin"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ...{ alamat: e.target.value },
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Alamat Domisili:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="jenis kelamin"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ...{ domisili: e.target.value },
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Pendidikan Terakhir:
                </label>

                <select
                  id="inputState"
                  className="form-select"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      pendidikan: e.target.value,
                    })
                  }
                >
                  <option value=""> </option>
                  <option value="Belum Tersedia">Belum Tersedia</option>
                  <option value="SD atau sederajat">SD atau sederajat</option>
                  <option value="SMP atau sederajat">SMP atau sederajat</option>
                  <option value="SMA/SMK atau sederajat">
                    SMA/SMK atau sederajat
                  </option>
                  <option value="D3 (AHLI MADYA)">D3 (AHLI MADYA)</option>
                  <option value="D4 Sarjana Terapan">D4 Sarjana Terapan</option>
                  <option value="S1 Sarjana">S1 Sarjana</option>
                  <option value="S2 Magister">S2 Magister</option>
                  <option value="S3 Doctor">S3 Doctor</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="informasi-umum">
                <h4>Informasi Personal</h4>
              </div>

              <div className="mb-3">
                <label htmlFor="KTP" className="form-label">
                  Nomor Identitas KTP:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="KTP"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ...{ ktp: e.target.value },
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="npwp" className="form-label">
                  NPWP:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="npwp"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ...{ npwp: e.target.value },
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tipe pajak" className="form-label">
                  TIPE PAJAK:
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      tipe_pajak: e.target.value,
                    })
                  }
                >
                  <option value=""> </option>
                  <option value="K/0">K/0 - KAWIN TANPA TANGGUNGAN </option>
                  <option value="K/1">K/1 - KAWIN DENGAN 1 TANGGUNGAN </option>
                  <option value="K/2">K/2 - KAWIN DENGAN 2 TANGGUNGAN</option>
                  <option value="K/3">K/3 - KAWIN DENGAN 3 TANGGUNGAN</option>
                  <option value="TK/0">
                    TK/0 - TIDAK KAWIN TANPA TANGGUNGAN
                  </option>
                  <option value="TK/1">
                    TK/1 - TIDAK KAWIN DENGAN 1 TANGGUNGAN
                  </option>
                  <option value="TK/2">
                    TK/2 - TIDAK KAWIN DENGAN 2 TANGGUNGAN
                  </option>
                  <option value="TK/3">
                    TK/3 - TIDAK KAWIN DENGAN 3 TANGGUNGAN
                  </option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="potongan pajak" className="form-label">
                  Potongan Pajak:
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      potongan_pajak: e.target.value,
                    })
                  }
                >
                  <option value="0"> </option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
              {form.potongan_pajak === "1" && (
                <div className="mb-3">
                  <label htmlFor="tunjangan pajak" className="form-label">
                    Tunjangan Pajak Dalam %:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="tolerans keterlambatan"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        ...{ tunjangan_pajak: e.target.value },
                      })
                    }
                  />
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="nama-bank" className="form-label">
                  Nama Bank:
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      nama_bank: e.target.value,
                    })
                  }
                >
                  <option value=""> </option>

                  {bankType.map((o) => (
                    <option key={o.id} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="no-akun-bank" className="form-label">
                  No Akun Bank:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="no-akun-bank"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ...{ nomor_akun_bank: e.target.value },
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="no-asuransi" className="form-label">
                  Nomor Kartu Asuransi Ketenagakerjaan:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="no-asuransi"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ...{ bpjs_ketenagakerjaan: e.target.value },
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="no-bpjs" className="form-label">
                  Nomor Kartu Asuransi Kesehatan:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="no-bpjs"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ...{ bpjs_kesehatan: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="informasi-umum">
                <h4>Informasi Pekerjaan</h4>
              </div>

              <div className="mb-3">
                <label htmlFor="cabang" className="form-label">
                  Cabang
                </label>

                <select
                  id="inputState"
                  className="form-select"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ...{
                        kantor_cabang_id: e.target.value,
                      },
                    })
                  }
                >
                  <option value=""></option>
                  {office?.data?.map((o) => (
                    <option key={o.id} value={parseInt(o.id)}>
                      {o.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="departement" className="form-label">
                  Departemen:
                </label>
                <select
                  id="department"
                  className="form-select"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ...{
                        department_id: e.target.value,
                      },
                    })
                  }
                >
                  <option value=""></option>
                  {department?.data?.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="jabatan" className="form-label">
                  Jabatan:
                </label>
                <select
                  id="jabatan"
                  className="form-select"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ...{
                        jabatan_id: e.target.value,
                      },
                    })
                  }
                >
                  <option value=""></option>
                  {position?.data?.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="no-asuransi" className="form-label">
                      Tanggal Maksuk:
                    </label>
                    <DatePicker
                      format="yyyy-MM-dd"
                      onChange={handleStartWorkDate}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status:
                    </label>
                    <select
                      id="status"
                      className="form-select"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value=""> </option>
                      <option value="Kontrak">Kontrak</option>
                      <option value="Tetap">Tetap/Permanen</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="periode-kontrak" className="form-label">
                  Periode Kontrak:
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      priode_kontrak: e.target.value,
                    })
                  }
                >
                  <option value=""> </option>
                  <option value="1">1 bulan</option>
                  <option value="2">2 bulan</option>
                  <option value="3">3 bulan</option>
                  <option value="4">4 bulan</option>
                  <option value="5">5 bulan</option>
                  <option value="6">6 bulan</option>
                  <option value="7">7 bulan</option>
                  <option value="8">8 bulan</option>
                  <option value="9">9 bulan</option>
                  <option value="10">10 bulan</option>
                  <option value="11">11 bulan</option>
                  <option value="12">12 bulan</option>
                  <option value="13">13 bulan</option>
                  <option value="14">14 bulan</option>
                  <option value="15">15 bulan</option>
                  <option value="16">16 bulan</option>
                  <option value="17">17 bulan</option>
                  <option value="18">18 bulan</option>
                  <option value="19">19 bulan</option>
                  <option value="20">20 bulan</option>
                  <option value="21">21 bulan</option>
                  <option value="22">22 bulan</option>
                  <option value="23">23 bulan</option>
                  <option value="24">24 bulan</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="potongan pajak" className="form-label">
                  Potongan Terlambat:
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      potongan_terlambat: e.target.value,
                    })
                  }
                >
                  <option value=""> </option>
                  <option value="1">yes</option>
                  <option value="0">No</option>
                </select>
              </div>
              {form.potongan_terlambat === "1" && (
                <div className="mb-3">
                  <label
                    htmlFor="toleransi keterlabamtan"
                    className="form-label"
                  >
                    Toleransi Keterlambatan (menit):
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="tolerans keterlambatan"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        ...{ toleransi_keterlambatan: e.target.value },
                      })
                    }
                  />
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="nama-bank" className="form-label">
                  Mode Absensi:
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      mode_absensi: e.target.value,
                    })
                  }
                >
                  <option value=""> </option>
                  <option value="online absensi">ID Card/Email, photo</option>
                  <option value="fingerprint">ID Card/Email</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="absensi-di-luar-kantro" className="form-label">
                  Absensi Di luar Kantor:
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      absen_diluar_kantor: e.target.value,
                    })
                  }
                >
                  <option value="0"> </option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Card.Body>
    </Card>
  );
};

export default FormAddEmployee;
