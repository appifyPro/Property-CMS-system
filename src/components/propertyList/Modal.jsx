import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const PropertyListModal = (props) => {
  const [show, setShow] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [message, setMessage] = useState('')
  const [optionsData, setOptionsData] = useState([])
  const [propertyData, setPropertyData] = useState({
    type: '',
    title: '',
    totalPrice: '',
    address: '',
    city: '',
    state: '',
    numberOfFloors: '',
    view: '',
    numberofcars: '',
    country: '',
    postalcode: '',
  })
 

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const [showSpinner, setShowSpinner] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    if (!token) {
      navigate('/login')
    }
    getUserData()
    setShowAlert(false)
    setShow(true)
  }

  const getUserData = async () => {
    try {
      setPropertyData({
        title: propertyData.title,
        totalPrice: propertyData.totalPrice,
        address: propertyData.address,
        city: propertyData.city,
        state: propertyData.state,
        numberOfFloors: propertyData.numberOfFloors,
        view: propertyData.view,
        property_type: propertyData.type,
        postalcode: propertyData.postalcode,
        numberofcars: propertyData.numberofcars,
        country: propertyData.country,
      })
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const addPropertyList = () => {
    if (props.id) {
      return updateList()
    }
    setShowAlert(true)
    setShowSpinner(true)
    const {
      type,
      title,
      totalPrice,
      address,
      city,
      state,
      numberOfFloors,
      view,
      numberofcars,
      country,
      postalcode,
    } = propertyData
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}v1/admin/properties`,
        {
          property_type: type,
          title: title,
          total_value_of_property: totalPrice,
          address,
          address,
          city: city,
          state: state,
          country: country,
          postal_Code: postalcode,
          no_of_cars: numberofcars,
          view: view,
          no_of_floors: numberOfFloors,
        },
        config,
      )
      .then((response) => {
        if (response.status === 201) {
          setTimeout(() => {
            setShowSpinner(false)
            setShowAlert(true)
            setMessage('Added data successfully')
            props.setUpdateTable('true')
          }, 10)
        }
        handleClose()
      })
      .catch((error) => {
        setShowSpinner(false)
        console.error('Error updating user profile:', error)
        setMessage(error.response.data.message)
      })
      .finally()
    {
      props.setUpdateTable('false')
    }
  }
  const updateList = () => {
    setShowAlert(true)
    setShowSpinner(true)

    const {
      type,
      title,
      totalPrice,
      address,
      city,
      state,
      numberOfFloors,
      view,
      numberofcars,
      country,
      postalcode,
    } = propertyData
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    axios
      .put(
        `${process.env.REACT_APP_API_URL}v1/admin/properties/${props.id}`,
        {
          property_type: type,
          title: title,
          total_value_of_property: totalPrice,
          address,
          address,
          city: city,
          state: state,
          country: country,
          postal_Code: postalcode,
          no_of_cars: numberofcars,
          view: view,
          no_of_floors: numberOfFloors,
        },
        config,
      )
      .then((response) => {
        if (response.status === 200) {
          setTimeout(() => {
            setShowSpinner(false)
            setShowAlert(true)
            props.setUpdateTable('true')
            setMessage('Updated data successfully')
          }, 10)
        }
        handleClose()
      })
      .catch((error) => {
        console.error('Error updating property:', error)
        setMessage(error.response.data.message)
        setShowSpinner(false)
      })
      .finally()
    {
      props.setUpdateTable('false')
    }
  }
  useEffect(() => {
    fetchOptionsData()
  }, [])

  const fetchOptionsData = async () => {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}v1/admin/property-type?per_page=100&page=1`,
        config,
      )

      setOptionsData(response.data.data)
    } catch (error) {
      console.error('Error fetching options data:', error)
    }
  }
  return (
    <div>
      <>
        <Dropdown.Item className="cursor" onClick={handleShow}>
          {props.name}
        </Dropdown.Item>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Property</Modal.Title>
          </Modal.Header>
          {showAlert && (
            <>
              <Alert key="success" variant="success">
                {message}
              </Alert>
            </>
          )}
          <Modal.Body>
            <Form>
              <Form.Group className="" controlId="exampleForm.ControlInput1">
                <Form.Group className="" controlId="exampleForm.ControlInput2">
                  <Form.Label>Type</Form.Label>

                  <select
                    className="form-select"
                    aria-label="Select a type"
                    name="type"
                    value={propertyData.type}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Select a type
                    </option>

                    {optionsData.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.title}
                      </option>
                    ))}
                  </select>
                </Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  autoFocus
                  name="title"
                  value={propertyData.title}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="" controlId="exampleForm.ControlInput1">
                <Form.Label>Total Value</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="TotalPrice"
                  autoFocus
                  name="totalPrice"
                  value={propertyData.value}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="" controlId="exampleForm.ControlInput2">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="address"
                  placeholder="Address"
                  autoFocus
                  name="address"
                  value={propertyData.address}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="" controlId="exampleForm.ControlInput2">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  autoFocus
                  name="city"
                  value={propertyData.city}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="state"
                autoFocus
                name="state"
                value={propertyData.state}
                onChange={handleInputChange}
              />
              <Form.Label>Number of floors</Form.Label>
              <Form.Control
                type="text"
                placeholder="Number of Floors"
                autoFocus
                name="numberOfFloors"
                value={propertyData.numberOfFloors}
                onChange={handleInputChange}
              />
              <Form.Label>view</Form.Label>
              <Form.Control
                type="text"
                placeholder="view"
                autoFocus
                name="view"
                value={propertyData.view}
                onChange={handleInputChange}
              />
              <Form.Label>Number of Cars</Form.Label>
              <Form.Control
                type="text"
                placeholder="number of cars"
                autoFocus
                name="numberofcars"
                value={propertyData.numberofcars}
                onChange={handleInputChange}
              />
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                autoFocus
                name="country"
                value={propertyData.country}
                onChange={handleInputChange}
              />
              <Form.Label>postal code</Form.Label>
              <Form.Control
                type="text"
                placeholder="postal code"
                autoFocus
                name="postalcode"
                value={propertyData.postalcode}
                onChange={handleInputChange}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={addPropertyList}>
              Save
              {showSpinner ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginLeft: '5px' }}
                />
              ) : null}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  )
}
PropertyListModal.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setUpdateTable: PropTypes.func.isRequired,
}

export default PropertyListModal
