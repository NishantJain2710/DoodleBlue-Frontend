import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  Route,
  Routes
} from 'react-router-dom';

import Login from './Screens/Authentication/Login';
import Register from './Screens/Authentication/Register';

import MapScreen from './Screens/UsersOnMap/MapScreen';
import UploadUsers from './Screens/UploadUsers/UploadUsers';

function App() {
    return (
        <Routes>
            <Route path='/' element={<MapScreen/>} />
            <Route path='/upload' element={<UploadUsers/>} />
            {/* Authentication */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    );
}

export default App;
