import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react'
import config from '../../../config'
import BasicTable from '../../../components/table/BasicTable'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ListOrderTable = forwardRef((props, ref) => {
  const apiUrl = config.apiBaseUrl + "karyawan"

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Nama',
        accessor: 'nama',
      },
      {
        Header: 'Cabang',
        accessor: 'informasi_pekerjaan.kantor_cabang.nama',
      },
      {
        Header: 'Departemen',
        accessor: 'informasi_pekerjaan.department.nama',
      },
      {
        Header: 'Jabatan',
        accessor: 'informasi_pekerjaan.jabatan.nama',
      },
      {
        Header: 'Action',
        accessor: 'birthDate',
        Cell: ({ row }) => (
          <>
          <Link to={`/admin/karyawan/${row.original.id}`}>
            <Button
              variant="info"
              size="sm"
              className="me-2"
            >
              Detail
            </Button>
          
          
          </Link>
          </>
        ),
      },
    ],
    [props]
  )
  const [totalPage, setTotalPage] = useState(0)
  const [totalData, setTotalData] = useState(0)

  const filters = useRef({})

  const currentPageIndex = useRef({})
  const currentPer_page = useRef(11)
  const currentSortBy = useRef({})

  useImperativeHandle(ref, () => ({
    refreshData() {
      const defaultValues = {
        per_page: currentPer_page.current,
        pageIndex: 0,
        sortBy: [],
      }

      fetchData({ ...defaultValues })
    },

    reloadData() {
      const values = {
        pageIndex: currentPageIndex.current,
        per_page: currentPer_page.current,
        sortBy: currentSortBy.current,
      }
      fetchData({ ...values })
    },

    doFilter(data) {
      filters.current = data
      this.refreshData()
    },
  }))

  const fetchData = useCallback(
    async ({ per_page, pageIndex, sortBy }) => {
      setLoading(false)
      try {
        const params = {
          current_page: pageIndex + 1,

          ...filters.current
        }

        if (sortBy && sortBy.length) {
          const orderByMapping = {
            'id' : 'id',
            'nama': 'nama',
            'alamat': 'alamat',
          };
          const { id } = sortBy[0];
          params.sort = orderByMapping[id] || id;
        } else {
          params.sort = 'desc'
        }

        if (per_page) params.per_page = per_page
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('token='))
          ?.split('=')[1];

        const response = await axios.get(apiUrl, {
          params,
          // headers: {
          //   access_token: token
          // }
        });

        const { data } = response

        const list = data?.data


        setData(list)
        setTotalPage(data?.pagination.totalPages)
        setTotalData(data?.pagination?.count)



        currentPageIndex.current = pageIndex
        currentPageIndex.current = per_page
        currentPageIndex.sortBy = sortBy

        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    },
    [apiUrl]
  )
return (
  <BasicTable
  columns={columns}
  data={data}
  fetchData={fetchData}
  loading={loading}
  totalPage={totalPage}
  totalData={totalData}
/>
)

})

export default ListOrderTable


ListOrderTable.defaultProps = {
  onDetail: (data) => { },
  onEdit: (data) => { },
  onDelete: (data) => { },
}