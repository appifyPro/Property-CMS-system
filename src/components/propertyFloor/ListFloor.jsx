import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CButton } from '@coreui/react';
import PaginationComponent from '../pagination/pagination';
import { AiOutlineEdit } from 'react-icons/ai';
import ListFloorModel from './ListFloorModel';

const ListFloor = () => {
  const [propertyList, setPropertyList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState('');
  const [UpdateTable, setUpdateTable] = useState('false');
  const token = localStorage.getItem('token');

  const getFloorList = async (page) => {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}v1/admin/property-floor?page=${page}`,
        config
      );

      setPageCount(Math.ceil(response.data.total / response.data.per_page));
      setPropertyList(response.data.data);
    } catch (error) {
      console.error('Error fetching property list:', error);
    }
  };

  useEffect(() => {
    getFloorList(currentPage);
  }, [currentPage, UpdateTable]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <h5 className="m-0">Property Floor</h5>
              <div className="text-center">
                <CButton color="dark">
                  <ListFloorModel name="Add" setUpdateTable={setUpdateTable} />
                </CButton>
              </div>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Number of Floors</th>
                      <th>Size of Floors</th>
                      <th>Type</th>
                      <th>Estimated Value</th>
                      <th>Actual Value</th>
                      <th>Map</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertyList.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.no_of_floor}</td>
                        <td>{user.size_of_floor}</td>
                        <td>{user.type}</td>
                        <td>{user.estimated_value}</td>
                        <td>{user.actual_value}</td>
                        <td>{user.map}</td>
                        <td className="d-flex">
                          <ListFloorModel
                            id={user.id}
                            name={<AiOutlineEdit />}
                            setUpdateTable={setUpdateTable}
                            className="ms-2"
                            show={false}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <PaginationComponent
                currentPage={currentPage}
                onPageChange={handlePageChange}
                pageCount={pageCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListFloor;
