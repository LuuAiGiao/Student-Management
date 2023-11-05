import logo from './logo.svg';
import './App.css';
import Navigation from './component/Navigation';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Detail from './component/Detail';
import Dashboard from './component/Dashboard';
import AddStaff from './component/AddStudent';
import Update from './component/update';
import {gapi} from "gapi-script";
import { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
function App() {
  const [flag, setFlag] = useState(false);
  const [name, setName] = useState();
  const clientId = '157579947849-5ceeklaqkbotjq49a2kahttnrfqjcl63.apps.googleusercontent.com'

  const onSuccess = (res) => {
    setName(res.profileObj["name"]);
    console.log("Success", res.profileObj);
    setFlag(true);
  }

  const onFailure = (res) => {
    console.log("Failed", res);
  }
  return (
    <div className="App">
      {flag ? (
        <div>
        <Navigation/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/update/:id' element={<Update />} />
          <Route path='/addNewStudent' element={<AddStaff />} />
        </Routes>
        </div>
      ) : (
        <div style={{ marginTop: '150px' }}>

        <h3>Please sign in to continue</h3>
        <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        onFailure={onFailure}
        buttonText='Sign in with Google'
        cookiePolicy={'single_host_origin'}
        isSignedIn={false}
        />
        {/* <GoogleLogin onSuccess={onSuccess} onError={onFailure} /> */}
        </div>
        
      )}
      {/* <Navigation/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path='/addNewStudent' element={<AddStaff />} />
      </Routes> */}
    </div>
  );
}

export default App;
