import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CButton } from '@coreui/react';
import Modal from './subTypesModel';
import PaginationComponent from '../pagination/pagination';
import { AiOutlineEdit } from 'react-icons/ai';

const PropertySubTypes = () => {
  const [subTypeList, setSubTypeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState('');
  const [updateTable, setUpdateTable] = useState('false');

  const getSubTypelist = (page) => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}v1/admin/property-subtype?page=${page}`, config)
      .then((response) => {
        setSubTypeList(response.data.data);
        setPageCount(Math.ceil(response.data.meta.total / response.data.meta.per_page));
      })
      .catch((error) => {
        console.error('Error fetching user list:', error);
      });
  };

  useEffect(() => {
    getSubTypelist(currentPage);
  }, [currentPage, updateTable]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <h5 className="m-0">Property List</h5>
              <div className="text-center">
                <CButton color="dark">
                  <Modal name="Add" setUpdateTable={setUpdateTable} />
                </CButton>
              </div>
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subTypeList.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.title}</td>
                        <td>{user.description}</td>
                        <td>{user.type.title}</td>
                        <td className="d-flex">
                          <Modal
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

export default PropertySubTypes;
