import React, { useState } from 'react'
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
// import { propTypes } from 'react-bootstrap/esm/Image'

const UserProfileModal = (props) => {
  const [show, setShow] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [message, setMessage] = useState('')

  const [propertyData, setPropertyData] = useState({
    id: '',
    title: '',
    description: '',
  })

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

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
        id: propertyData.id,
        title: propertyData.title,
        description: propertyData.description,
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

  const updateUserProfile = () => {
    if (props.id) {
      return UserProfile()
    }
    setShowAlert(true)
    setShowSpinner(true)

    const { id, description, title } = propertyData
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}v1/admin/property-subtype`,

        {
          property_type_id: id,
          description: description,
          title: title,
        },
        config,
      )
      .then((response) => {
        if (response.status === 201) {
          setTimeout(() => {
            setShowSpinner(false)
            setShowAlert(true)
            props.setUpdateTable('true')
            setMessage(response.data.message)
          
          }, 10)
        }
        handleClose()
      })
      .catch((error) => {
        console.error('Error updating user profile:', error)
        setMessage(error.response.data.message)
        setShowSpinner(false)
      })
      .finally()
    {
      props.setUpdateTable('false')
    }
  }
  const UserProfile = () => {
    setShowAlert(true)
    setShowSpinner(true)

    const { id, description, title } = propertyData
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    axios
      .patch(
        `${process.env.REACT_APP_API_URL}v1/admin/property-subtype/${props.id}`,
        {
          property_type_id: id,
          description: description,
          title: title,
        },
        config,
      )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setTimeout(() => {
            setShowSpinner(false)
            setShowAlert(true)
            props.setUpdateTable(true)
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
      props.setUpdateTable(false)
    }
  }
  return (
    <div>
      <>
        {/* <button onClick={handleShow}> {props.name}</button> */}
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
                <Form.Label>id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="id"
                  autoFocus
                  name="id"
                  value={propertyData.id}
                  onChange={handleInputChange}
                />
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="description"
                  autoFocus
                  name="description"
                  value={propertyData.description}
                  onChange={handleInputChange}
                />
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateUserProfile}>
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
UserProfileModal.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,

  currentPage: PropTypes.number.isRequired,
  setUpdateTable: PropTypes.string.isRequired,
}

export default UserProfileModal
