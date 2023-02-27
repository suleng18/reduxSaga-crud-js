import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddUser from './pages/AddUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addUser" element={<AddUser />} />
        {/* <Route path="/editUser/:id" element={<EditUser />} /> */}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
