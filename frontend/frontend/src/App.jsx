import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Header from "./components/Header";
import CreateNote from "./pages/CreateNote";
import UpdateNote from "./pages/UpdateNote";
import Error from "./pages/Error";
import { MessageToastContainer } from "./components/messageToast";
function RegisterandLogout(){
  localStorage.clear();
  return  <Register/>
}
function App() {
  
  return (
    <>
    <MessageToastContainer/>
     <Routes>
       <Route path="/login" element={<Login/>}></Route>
       <Route path="/register" element={<RegisterandLogout/>}></Route>
        <Route element={<ProtectedRoute/>}>
          <Route element={<Header/>}>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/create-note" element={<CreateNote/>}></Route>     
          </Route>
          <Route path = "/update-note/:note_id" element={<UpdateNote/>}/>
        </Route>
        <Route path = "*" element={<Error/>}/>
     </Routes>
    </>
  )
}

export default App
