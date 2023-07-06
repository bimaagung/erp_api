import React, { useEffect } from "react";
import SideBar from "../../components/layouts/Sidebar";
import { useDispatch } from "react-redux";
import { getOfficeList } from "../../features/officeSlice";
import OfficeList from "./components/OfficeList";
import { SiAddthis } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { CgImport } from "react-icons/cg";
import { BiExport } from "react-icons/bi";
import ButtonSecondary from "../../components/ui/button/ButtonSecondary";
import ButtonPrimary from "../../components/ui/button/ButtonPrimary";
import ButtonDanger from "../../components/ui/button/ButtonDanger"
import ButtonSuccess from "../../components/ui/button/ButtonSuccess"

const OfficePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOfficeList());
  }, []);

  const handleAddKantroCabang = () => {
    navigate("/admin/add/kantor-cabang");
  };

  return (
    <SideBar>
      <div className="header-content">
        <h5>
          {" "}
          <span style={{ opacity: "0.5", fontSize: "30px", color: "#17a4e0" }}>
            Kantor Cabang
          </span>
        </h5>
        <div className="title-karyawan">
          <p>
            {" "}
            <span style={{ opacity: "0.5" }}> Home/ Kantor Cabang / List</span>
          </p>
        </div>
      </div>
      <div className='main-content-alpha'>
        <div className="kantor-cabang-head">
        <div className="row sub-header-content">
            <div className="col-md-6 add-karyawan">
              <ButtonPrimary
                title="add"
                onClick={handleAddKantroCabang}
                icon={<SiAddthis />}
              />
            </div>
            <div className="col-md-6 right-button-karyawan-list">
              <div>
                <ButtonSecondary title="Import" icon={<CgImport />} />
              </div>
              <div>
                <ButtonSecondary title="Export" icon={<BiExport />} />
              </div>
            </div>
          </div>
        </div>
        <div className="search-box-global">
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="nama-karyawan" className="form-label">
                  Nama Kantor
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nama-karyawan"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="karyawan-ID" className="form-label">
                  Kantor ID
                </label>
                <input type="text" className="form-control" id="karyawan-ID" />
              </div>
             
            </div>

            <div className="col-md-6 button-search-karyawan">
              <ButtonSuccess title="search" />
              <ButtonDanger title="reset" />
            </div>
          </div>
      <OfficeList />
      </div>
    </SideBar>
  );
};

export default OfficePage;
