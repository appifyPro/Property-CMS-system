import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
// import { Audio } from 'react-loader-spinner'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [logindata, setlogindata] = useState({
    email: '',
    password: '',
  })

 // const [loader, setLoader] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const getdata = (e) => {
    const { value, name } = e.target

    setlogindata((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      navigate('/')
    }
    // eslint-disable-next-line 
  }, [token])

  const submitbutton = (e) => {
    e.preventDefault()
    const { email, password } = logindata

    //setLoader(true)
    setIsLoading(true)

    axios
      .post(`${process.env.REACT_APP_API_URL}v1/user/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem('token', response.data.user.token)
        navigate('/')
      })
      .catch((error) => {
        setError(error.response.data.message)

      //  setLoader(false)
      })
      .finally(() => {
        console.log('error is this')
       // setLoader(false)
        setIsLoading(false)
      })
  }

 // console.log('loader is :', loader)
  return (
    <div>
      {/* {loader ? (
        <div style={{ marginTop: '200px', marginLeft: '700px' }}>
          <Audio
            height="200"
            width="200"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ textAlign: 'center' }}
          />
        </div>
      ) : ( */}
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      {error && (
                        <Alert variant="danger" className="w-80">
                          {error}
                        </Alert>
                      )}
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Username"
                          autoComplete="username"
                          onChange={getdata}
                          value={logindata.email}
                          name="email"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={getdata}
                          name="password"
                          value={logindata.password}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={12} md={6} className="mb-3">
                          <CButton
                            color="primary"
                            className="w-100"
                            onClick={submitbutton}
                            disabled={isLoading}
                          >
                            Login
                            {isLoading ? (
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                style={{ marginLeft: '5px', color: 'white' }}
                              />
                            ) : null}
                          </CButton>
                        </CCol>
                        <CCol xs={12} md={6}>
                          <CButton color="link" className="w-100">
                            <Link to="/forgot-password">Forgot password?</Link>
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
      {/* )} */}
    </div>
  )
}

export default Login
