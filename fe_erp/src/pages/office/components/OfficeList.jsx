import React from 'react'
import { useSelector } from 'react-redux';
import { officeSelector } from '../../../features/officeSlice';

const OfficeList = () => {
  const data = useSelector(officeSelector.selectData)

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Alamat</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {data?.data?.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.nama}</td>
            <td>{item.alamat}</td> 
             <td>example</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OfficeList