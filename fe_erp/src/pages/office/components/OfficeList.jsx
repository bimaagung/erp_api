import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import config from "../../../config";
import BasicTable from "../../../components/table/BasicTable";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteOffice } from "../../../features/officeSlice";
import Swal from "sweetalert2";

const ListOrderTable = forwardRef((props, ref) => {
  const apiUrl = config.apiBaseUrl + "kantor-cabang";
  const dispatch = useDispatch();

  const handelDeleteKantorCabang = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
      await  dispatch(deleteOffice(id)).unwrap()
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success',
        )
        window.location.reload(true)
      }
    })
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Nama",
        accessor: "nama",
      },
      {
        Header: "Alamat",
        accessor: "alamat",
      },
      {
        Header: "Action",
        accessor: "birthDate",
        Cell: ({ row }) => (
          <>
            <Link to={`/admin/update/kantor-cabang/${row.original.id}`}>
              <Button variant="info" size="sm" className="me-2">
                Detail
              </Button>
            </Link>

            <Button
              variant="danger"
              size="sm"
              className="me-2"
              onClick={() => handelDeleteKantorCabang(row.original.id)}
            >
              delete
            </Button>
          </>
        ),
      },
    ],
    [props]
  );
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(0);

  const filters = useRef({});

  const currentPageIndex = useRef({});
  const currentPageSize = useRef(10);
  const currentSortBy = useRef({});

  useImperativeHandle(ref, () => ({
    efreshData() {
      const defaultValues = {
        pageSize: currentPageSize.current,
        pageIndex: 0,
        sortBy: [],
      };

      fetchData({ ...defaultValues });
    },

    reloadData() {
      const values = {
        pageIndex: currentPageIndex.current,
        pageSize: currentPageSize.current,
        sortBy: currentSortBy.current,
      };
      fetchData({ ...values });
    },

    doFilter(data) {
      filters.current = data;
      this.refreshData();
    },
  }));

  const fetchData = useCallback(
    async ({ pageSize, pageIndex, sortBy }) => {
      setLoading(false);
      try {
        const params = {
          page: pageIndex + 1,
          ...filters.current,
        };

        if (sortBy && sortBy.length) {
          const orderByMapping = {
            id: "id",
            nama: "nama",
            alamat: "alamat",
          };
          const { id } = sortBy[0];
          params.sort = orderByMapping[id] || id;
        } else {
          params.sort = "desc";
        }

        if (pageSize) params.pageSize = pageSize;
        // const token = document.cookie
        //   .split('; ')
        //   .find((row) => row.startsWith('token='))
        //   ?.split('=')[1];

        const response = await axios.get(apiUrl, {
          params,
          // headers: {
          //   access_token: token
          // }
        });

        const { data } = response;

        const list = data?.data;

        setData(list);
        setTotalPage(data?.pagination.totalPages);
        setTotalData(data?.pagination?.count);

        currentPageIndex.current = pageIndex;
        currentPageIndex.pageSize = pageSize;
        currentPageIndex.sortBy = sortBy;

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
    [apiUrl]
  );
  return (
    <BasicTable
      columns={columns}
      data={data}
      fetchData={fetchData}
      loading={loading}
      totalPage={totalPage}
      totalData={totalData}
    />
  );
});

export default ListOrderTable;

ListOrderTable.defaultProps = {
  onDetail: (data) => {},
  onEdit: (data) => {},
  onDelete: (data) => {},
};
