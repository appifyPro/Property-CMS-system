import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import ProtectedRoute from './components/middleWares/ProtectedRoutes'
import ProtectedRouteDashboard from './components/middleWares/ProtectedRouteDashboard'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
//document.body.contentEditable = true
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const List = React.lazy(() => import('./views/pages/property/PropertyList'))
const Types = React.lazy(() => import('./views/pages/types/Types'))
const Floor = React.lazy(() => import('./views/pages/floor/Floor'))
const ListType = React.lazy(() => import('./views/pages/subType/SubType'))

class App extends Component {
  render() {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault()
    })
    document.onkeydown = function (e) {
      if (e.key === 'F12') {
        return false
      }
      if (e.ctrlKey && e.shiftKey && e.key === 'I'.charCodeAt(0)) {
        return false
      }
      if (e.ctrlKey && e.shiftKey && e.key === 'C'.charCodeAt(0)) {
        return false
      }
      if (e.ctrlKey && e.shiftKey && e.key === 'J'.charCodeAt(0)) {
        return false
      }
      if (e.ctrlKey && e.key === 'U'.charCodeAt(0)) {
        return false
      }
    }
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />

            <Route
              exact
              path="/ListType"
              name="Sub Type"
              element={<ProtectedRoute Component={ListType} />}
            />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route
              exact
              path="/list"
              name="Property List"
              element={<ProtectedRoute Component={List} />}
            />
            <Route
              exact
              path="/type"
              name="List type"
              element={<ProtectedRoute Component={Types} />}
            />
            <Route
              exact
              path="/floor"
              name="floor"
              element={<ProtectedRoute Component={Floor} />}
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route
              path="/"
              name="Home"
              element={<ProtectedRouteDashboard Component={DefaultLayout} />}
            />
            <Route path="*" element={<Page404 />} />
            {/* <Route path="*" name="Home" element={<DefaultLayout/>} /> */}
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
