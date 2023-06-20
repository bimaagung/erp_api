import React, { useCallback, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { DatePicker, DateRangePicker } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import "../styles/formAddEmployee.css";
import { getOfficeList, officeSelector } from "../../../features/officeSlice";
import { departmentSelector, getDepartemntList } from "../../../features/departmentSlice";
import { getPositionList, positionSelector } from "../../../features/positionSlice";

const FormAddEmployee = (props) => {
  const office = useSelector(officeSelector.selectData);
  const department = useSelector(departmentSelector.selectData)
  const position = useSelector(positionSelector.selectData)

  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOfficeList());
    dispatch(getDepartemntList())
    dispatch(getPositionList())
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
    nomor_akun_bank: "",
    bpjs_ketenagakerjaan: "",
    bpjs_kesehatan: "",
    kantor_cabang_id:null,
    departement: "",
    jabatan: "",
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

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setPreviewImage(URL.createObjectURL(file));
    setForm({
      ...form,
      ...{ foto: file },
    });
  }, []);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  const dropzoneStyle = {
    border: "2px dashed #ccc",
    borderRadius: "5px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    width: "100%",
    gap: "8px",
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const activeStyle = {
    border: "2px dashed #007bff",
  };

  const acceptStyle = {
    border: "2px dashed #00e676",
  };

  const rejectStyle = {
    border: "2px dashed #ff1744",
  };

  let dropzoneStyleDynamic = { ...dropzoneStyle };
  if (isDragActive) {
    dropzoneStyleDynamic = { ...dropzoneStyleDynamic, ...activeStyle };
  }
  if (isDragAccept) {
    dropzoneStyleDynamic = { ...dropzoneStyleDynamic, ...acceptStyle };
  }
  if (isDragReject) {
    dropzoneStyleDynamic = { ...dropzoneStyleDynamic, ...rejectStyle };
  }

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
             <div className="drop">
                <div 
                  {...getRootProps({
                    className: "dropzone",
                    style: dropzoneStyleDynamic,
                  })}
                >
                  <input {...getInputProps()} accept="image/*" />
                  {previewImage ? (
                    <img
                      src={previewImage}
                      className="img-fluid"
                      alt="Preview"
                      style={{ height: "40vh", objectFit: "cover" }}
                    />
                  ) : (
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  )}
                </div>
                <aside>
                  {acceptedFiles.map((file) => (
                    <li key={file.path}>
                      {file.path} - {file.size} bytes
                    </li>
                  ))}
                </aside>
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
                          ...{ nik: e.target.value },
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

                  <option value="ALLO">
                    ALLO - Allo Bank Indonesia (formerly Bank Harda
                    Internasional)
                  </option>
                  <option value="ANGLOMAS">
                    ANGLOMAS - Anglomas International Bank
                  </option>
                  <option value="BANGKOK">BANGKOK - Bangkok Bank</option>
                  <option value="AGRIS">AGRIS - Bank Agris</option>
                  <option value="ALADIN">
                    ALADIN - Bank Aladin Syariah (formerly Bank Maybank Syariah
                    Indonesia)
                  </option>
                  <option value="AMAR">
                    AMAR - Bank Amar Indonesia (formerly Anglomas International
                    Bank)
                  </option>
                  <option value="ANDARA">ANDARA - Bank Andara</option>
                  <option value="ANZ">ANZ - Bank ANZ Indonesia</option>
                  <option value="ARTA_NIAGA_KENCANA">
                    ARTA_NIAGA_KENCANA - Bank Arta Niaga Kencana
                  </option>
                  <option value="ARTHA">
                    ARTHA - Bank Artha Graha International
                  </option>
                  <option value="ARTOS">ARTOS - Bank Artos Indonesia</option>
                  <option value="BISNIS_INTERNASIONAL">
                    BISNIS_INTERNASIONAL - Bank Bisnis Internasional
                  </option>
                  <option value="BJB">BJB - Bank BJB</option>
                  <option value="BJB_SYR">BJB_SYR - Bank BJB Syariah</option>
                  <option value="BNI_SYR">BNI_SYR - Bank BNI Syariah</option>
                  <option value="BNP_PARIBAS">
                    BNP_PARIBAS - Bank BNP Paribas
                  </option>
                  <option value="AGRONIAGA">
                    AGRONIAGA - Bank BRI Agroniaga
                  </option>
                  <option value="BUKOPIN">BUKOPIN - Bank Bukopin</option>
                  <option value="BUMI_ARTA">BUMI_ARTA - Bank Bumi Arta</option>
                  <option value="CAPITAL">
                    CAPITAL - Bank Capital Indonesia
                  </option>
                  <option value="BCA">BCA - Bank Central Asia (BCA)</option>
                  <option value="BCA_SYR">
                    BCA_SYR - Bank Central Asia (BCA) Syariah
                  </option>
                  <option value="CHINATRUST">
                    CHINATRUST - Bank Chinatrust Indonesia
                  </option>
                  <option value="CIMB">CIMB - Bank CIMB Niaga</option>
                  <option value="CIMB_UUS">
                    CIMB_UUS - Bank CIMB Niaga UUS
                  </option>
                  <option value="COMMONWEALTH">
                    COMMONWEALTH - Bank Commonwealth
                  </option>
                  <option value="DANAMON">DANAMON - Bank Danamon</option>
                  <option value="DANAMON_UUS">
                    DANAMON_UUS - Bank Danamon UUS
                  </option>
                  <option value="DBS">DBS - Bank DBS Indonesia</option>
                  <option value="DINAR_INDONESIA">
                    DINAR_INDONESIA - Bank Dinar Indonesia
                  </option>
                  <option value="DKI">DKI - Bank DKI</option>
                  <option value="DKI_UUS">DKI_UUS - Bank DKI UUS</option>
                  <option value="FAMA">FAMA - Bank Fama International</option>
                  <option value="GANESHA">GANESHA - Bank Ganesha</option>
                  <option value="HANA">HANA - Bank Hana</option>
                  <option value="HARDA_INTERNASIONAL">
                    HARDA_INTERNASIONAL - Bank Harda Internasional
                  </option>
                  <option value="HIMPUNAN_SAUDARA">
                    HIMPUNAN_SAUDARA - Bank Himpunan Saudara 1906
                  </option>
                  <option value="IBK">
                    IBK - Bank IBK Indonesia (formerly Bank Agris)
                  </option>
                  <option value="ICBC">ICBC - Bank ICBC Indonesia</option>
                  <option value="INA_PERDANA">
                    INA_PERDANA - Bank Ina Perdania
                  </option>
                  <option value="INDEX_SELINDO">
                    INDEX_SELINDO - Bank Index Selindo
                  </option>
                  <option value="JAGO">
                    JAGO - Bank Jago (formerly Bank Artos Indonesia)
                  </option>
                  <option value="JASA_JAKARTA">
                    JASA_JAKARTA - Bank Jasa Jakarta
                  </option>
                  <option value="JTRUST">
                    JTRUST - Bank JTrust Indonesia (formerly Bank Mutiara)
                  </option>
                  <option value="KESEJAHTERAAN_EKONOMI">
                    KESEJAHTERAAN_EKONOMI - Bank Kesejahteraan Ekonomi
                  </option>
                  <option value="MANDIRI">MANDIRI - Bank Mandiri</option>
                  <option value="MASPION">
                    MASPION - Bank Maspion Indonesia
                  </option>
                  <option value="MAYAPADA">
                    MAYAPADA - Bank Mayapada International
                  </option>
                  <option value="MAYBANK">MAYBANK - Bank Maybank</option>
                  <option value="MAYBANK_SYR">
                    MAYBANK_SYR - Bank Maybank Syariah Indonesia
                  </option>
                  <option value="MAYORA">MAYORA - Bank Mayora</option>
                  <option value="MEGA">MEGA - Bank Mega</option>
                  <option value="MESTIKA_DHARMA">
                    MESTIKA_DHARMA - Bank Mestika Dharma
                  </option>
                  <option value="MITRA_NIAGA">
                    MITRA_NIAGA - Bank Mitra Niaga
                  </option>
                  <option value="MIZUHO">MIZUHO - Bank Mizuho Indonesia</option>
                  <option value="MNC_INTERNASIONAL">
                    MNC_INTERNASIONAL - Bank MNC Internasional
                  </option>
                  <option value="MUAMALAT">
                    MUAMALAT - Bank Muamalat Indonesia
                  </option>
                  <option value="MULTI_ARTA_SENTOSA">
                    MULTI_ARTA_SENTOSA - Bank Multi Arta Sentosa
                  </option>
                  <option value="NATIONALNOBU">
                    NATIONALNOBU - Bank Nationalnobu
                  </option>
                  <option value="BNI">BNI - Bank Negara Indonesia (BNI)</option>
                  <option value="BNC">
                    BNC - Bank Neo Commerce (formerly Bank Yudha Bhakti)
                  </option>
                  <option value="NUSANTARA_PARAHYANGAN">
                    NUSANTARA_PARAHYANGAN - Bank Nusantara Parahyangan
                  </option>
                  <option value="OCBC">OCBC - Bank OCBC NISP</option>
                  <option value="OCBC_UUS">
                    OCBC_UUS - Bank OCBC NISP UUS
                  </option>
                  <option value="BAML">
                    BAML - Bank of America Merill-Lynch
                  </option>
                  <option value="BOC">BOC - Bank of China (BOC)</option>
                  <option value="INDIA">INDIA - Bank of India Indonesia</option>
                  <option value="TOKYO">
                    TOKYO - Bank of Tokyo Mitsubishi UFJ
                  </option>
                  <option value="OKE">
                    OKE - Bank Oke Indonesia (formerly Bank Andara)
                  </option>
                  <option value="PANIN">PANIN - Bank Panin</option>
                  <option value="PANIN_SYR">
                    PANIN_SYR - Bank Panin Syariah
                  </option>
                  <option value="PERMATA">PERMATA - Bank Permata</option>
                  <option value="PERMATA_UUS">
                    PERMATA_UUS - Bank Permata UUS
                  </option>
                  <option value="QNB_INDONESIA">
                    QNB_INDONESIA - Bank QNB Indonesia (formerly Bank QNB
                    Kesawan)
                  </option>
                  <option value="RABOBANK">
                    RABOBANK - Bank Rabobank International Indonesia
                  </option>
                  <option value="BRI">BRI - Bank Rakyat Indonesia (BRI)</option>
                  <option value="RESONA">RESONA - Bank Resona Perdania</option>
                  <option value="ROYAL">ROYAL - Bank Royal Indonesia</option>
                  <option value="SAHABAT_SAMPOERNA">
                    SAHABAT_SAMPOERNA - Bank Sahabat Sampoerna
                  </option>
                  <option value="SBI_INDONESIA">
                    SBI_INDONESIA - Bank SBI Indonesia
                  </option>
                  <option value="SEABANK">
                    SEABANK - Bank Seabank Indonesia (formerly Bank
                    Kesejahteraan Ekonomi)
                  </option>
                  <option value="SHINHAN">
                    SHINHAN - Bank Shinhan Indonesia (formerly Bank Metro
                    Express)
                  </option>
                  <option value="SINARMAS">SINARMAS - Bank Sinarmas</option>
                  <option value="SINARMAS_UUS">
                    SINARMAS_UUS - Bank Sinarmas UUS
                  </option>
                  <option value="MITSUI">
                    MITSUI - Bank Sumitomo Mitsui Indonesia
                  </option>
                  <option value="BRI_SYR">BRI_SYR - Bank Syariah BRI</option>
                  <option value="BUKOPIN_SYR">
                    BUKOPIN_SYR - Bank Syariah Bukopin
                  </option>
                  <option value="BSI">
                    BSI - Bank Syariah Indonesia (BSI)
                  </option>
                  <option value="MANDIRI_SYR">
                    MANDIRI_SYR - Bank Syariah Mandiri
                  </option>
                  <option value="MEGA_SYR">MEGA_SYR - Bank Syariah Mega</option>
                  <option value="BTN">BTN - Bank Tabungan Negara (BTN)</option>
                  <option value="BTN_UUS">
                    BTN_UUS - Bank Tabungan Negara (BTN) UUS
                  </option>
                  <option value="TABUNGAN_PENSIUNAN_NASIONAL">
                    TABUNGAN_PENSIUNAN_NASIONAL - Bank Tabungan Pensiunan
                    Nasional
                  </option>
                  <option value="UOB">UOB - Bank UOB Indonesia</option>
                  <option value="VICTORIA_INTERNASIONAL">
                    VICTORIA_INTERNASIONAL - Bank Victoria Internasional
                  </option>
                  <option value="VICTORIA_SYR">
                    VICTORIA_SYR - Bank Victoria Syariah
                  </option>
                  <option value="WOORI">WOORI - Bank Woori Indonesia</option>
                  <option value="WOORI_SAUDARA">
                    WOORI_SAUDARA - Bank Woori Saudara Indonesia 1906 (formerly
                    Bank Himpunan Saudara and Bank Woori Indonesia)
                  </option>
                  <option value="YUDHA_BHAKTI">
                    YUDHA_BHAKTI - Bank Yudha Bhakti
                  </option>
                  <option value="ACEH">ACEH - BPD Aceh</option>
                  <option value="ACEH_UUS">ACEH_UUS - BPD Aceh UUS</option>
                  <option value="BALI">BALI - BPD Bali</option>
                  <option value="BANTEN">
                    BANTEN - BPD Banten (formerly Bank Pundi Indonesia)
                  </option>
                  <option value="BENGKULU">BENGKULU - BPD Bengkulu</option>
                  <option value="DAERAH_ISTIMEWA">
                    DAERAH_ISTIMEWA - BPD Daerah Istimewa Yogyakarta (DIY)
                  </option>
                  <option value="DAERAH_ISTIMEWA_UUS">
                    DAERAH_ISTIMEWA_UUS - BPD Daerah Istimewa Yogyakarta (DIY)
                    UUS
                  </option>
                  <option value="JAMBI">JAMBI - BPD Jambi</option>
                  <option value="JAMBI_UUS">JAMBI_UUS - BPD Jambi UUS</option>
                  <option value="JAWA_TENGAH">
                    JAWA_TENGAH - BPD Jawa Tengah
                  </option>
                  <option value="JAWA_TENGAH_UUS">
                    JAWA_TENGAH_UUS - BPD Jawa Tengah UUS
                  </option>
                  <option value="JAWA_TIMUR">
                    JAWA_TIMUR - BPD Jawa Timur
                  </option>
                  <option value="JAWA_TIMUR_UUS">
                    JAWA_TIMUR_UUS - BPD Jawa Timur UUS
                  </option>
                  <option value="KALIMANTAN_BARAT">
                    KALIMANTAN_BARAT - BPD Kalimantan Barat
                  </option>
                  <option value="KALIMANTAN_BARAT_UUS">
                    KALIMANTAN_BARAT_UUS - BPD Kalimantan Barat UUS
                  </option>
                  <option value="KALIMANTAN_SELATAN">
                    KALIMANTAN_SELATAN - BPD Kalimantan Selatan
                  </option>
                  <option value="KALIMANTAN_SELATAN_UUS">
                    KALIMANTAN_SELATAN_UUS - BPD Kalimantan Selatan UUS
                  </option>
                  <option value="KALIMANTAN_TENGAH">
                    KALIMANTAN_TENGAH - BPD Kalimantan Tengah
                  </option>
                  <option value="KALIMANTAN_TIMUR">
                    KALIMANTAN_TIMUR - BPD Kalimantan Timur
                  </option>
                  <option value="KALIMANTAN_TIMUR_UUS">
                    KALIMANTAN_TIMUR_UUS - BPD Kalimantan Timur UUS
                  </option>
                  <option value="LAMPUNG">LAMPUNG - BPD Lampung</option>
                  <option value="MALUKU">MALUKU - BPD Maluku</option>
                  <option value="NUSA_TENGGARA_BARAT">
                    NUSA_TENGGARA_BARAT - BPD Nusa Tenggara Barat
                  </option>
                  <option value="NUSA_TENGGARA_BARAT_UUS">
                    NUSA_TENGGARA_BARAT_UUS - BPD Nusa Tenggara Barat UUS
                  </option>
                  <option value="NUSA_TENGGARA_TIMUR">
                    NUSA_TENGGARA_TIMUR - BPD Nusa Tenggara Timur
                  </option>
                  <option value="PAPUA">PAPUA - BPD Papua</option>
                  <option value="RIAU_DAN_KEPRI">
                    RIAU_DAN_KEPRI - BPD Riau Dan Kepri
                  </option>
                  <option value="RIAU_DAN_KEPRI_UUS">
                    RIAU_DAN_KEPRI_UUS - BPD Riau Dan Kepri UUS
                  </option>
                  <option value="SULAWESI">
                    SULAWESI - BPD Sulawesi Tengah
                  </option>
                  <option value="SULAWESI_TENGGARA">
                    SULAWESI_TENGGARA - BPD Sulawesi Tenggara
                  </option>
                  <option value="SULSELBAR">SULSELBAR - BPD Sulselbar</option>
                  <option value="SULSELBAR_UUS">
                    SULSELBAR_UUS - BPD Sulselbar UUS
                  </option>
                  <option value="SULUT">SULUT - BPD Sulut</option>
                  <option value="SUMATERA_BARAT">
                    SUMATERA_BARAT - BPD Sumatera Barat
                  </option>
                  <option value="SUMATERA_BARAT_UUS">
                    SUMATERA_BARAT_UUS - BPD Sumatera Barat UUS
                  </option>
                  <option value="SUMSEL_DAN_BABEL">
                    SUMSEL_DAN_BABEL - BPD Sumsel Dan Babel
                  </option>
                  <option value="SUMSEL_DAN_BABEL_UUS">
                    SUMSEL_DAN_BABEL_UUS - BPD Sumsel Dan Babel UUS
                  </option>
                  <option value="SUMUT">SUMUT - BPD Sumut</option>
                  <option value="SUMUT_UUS">SUMUT_UUS - BPD Sumut UUS</option>
                  <option value="BTPN_SYARIAH">
                    BTPN_SYARIAH - BTPN Syariah (formerly BTPN UUS and Bank
                    Sahabat Purba Danarta)
                  </option>
                  <option value="CENTRATAMA">
                    CENTRATAMA - Centratama Nasional Bank
                  </option>
                  <option value="CCB">
                    CCB - China Construction Bank Indonesia (formerly Bank Antar
                    Daerah and Bank Windu Kentjana International)
                  </option>
                  <option value="CITIBANK">CITIBANK - Citibank</option>
                  <option value="DEUTSCHE">DEUTSCHE - Deutsche Bank</option>
                  <option value="HSBC_UUS">
                    HSBC_UUS - Hongkong and Shanghai Bank Corporation (HSBC) UUS
                  </option>
                  <option value="HSBC">
                    HSBC - HSBC Indonesia (formerly Bank Ekonomi Raharja)
                  </option>
                  <option value="EXIMBANK">
                    EXIMBANK - Indonesia Eximbank (formerly Bank Ekspor
                    Indonesia)
                  </option>
                  <option value="JPMORGAN">
                    JPMORGAN - JP Morgan Chase Bank
                  </option>
                  <option value="MANDIRI_TASPEN">
                    MANDIRI_TASPEN - Mandiri Taspen Pos (formerly Bank Sinar
                    Harapan Bali)
                  </option>
                  <option value="PRIMA_MASTER">
                    PRIMA_MASTER - Prima Master Bank
                  </option>
                  <option value="RBS">
                    RBS - Royal Bank of Scotland (RBS)
                  </option>
                  <option value="STANDARD_CHARTERED">
                    STANDARD_CHARTERED - Standard Charted Bank
                  </option>
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
                    <option key={o.id} value={parseInt( o.id)}>
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
                        departement: e.target.value,
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
                        jabatan: e.target.value,
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
                      potongan_terlambat: e.target.value,
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
