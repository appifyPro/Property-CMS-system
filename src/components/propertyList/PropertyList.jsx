import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CButton } from '@coreui/react';
import ListPropertyModel  from './Modal';
import PaginationComponent from '../pagination/pagination';
import { AiOutlineEdit } from 'react-icons/ai';
import PropTypes from 'prop-types';

const PropertyList = () => {
  const [propertyListState, setPropertyList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState('');
  const token = localStorage.getItem('token');
  const [updateTable, setUpdateTable] = useState('false');

  const getPropertiesList = async (page) => {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}v1/admin/properties?page=${page}`,
        config
      );
      setPageCount(Math.ceil(response.data.meta.total / response.data.meta.per_page));
      setPropertyList(response.data.data);
    } catch (error) {
      console.error('Error fetching property list:', error);
    }
  };

  useEffect(() => {
    getPropertiesList(currentPage);
  }, [currentPage, updateTable]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="m-0">Property List</h5>
              <CButton color="dark">
                <ListPropertyModel  name="Add" setUpdateTable={setUpdateTable} />
              </CButton>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Type</th>
                      <th>Title</th>
                      <th>Total Value</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Country</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertyListState.map((property, index) => (
                      <tr key={property.id}>
                        <td>{property.id}</td>
                        <td>{property.property_type_id}</td>
                        <td>{property.title}</td>
                        <td>{property.total_value_of_property}</td>
                        <td>{property.address}</td>
                        <td>{property.city}</td>
                        <td>{property.state}</td>
                        <td>{property.country}</td>
                        <td className="d-flex">
                          <ListPropertyModel 
                            id={property.id}
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

PropertyList.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PropertyList;
