import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/login";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Header from "./components/Header";
import CreateNote from "./pages/CreateNote";
import UpdateNote from "./pages/UpdateNote";
export function RegisterandLogout(){
  localStorage.clear();
  return  <Register/>
}
function App() {
  
  return (
    <>
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
     </Routes>
    </>
  )
}

export default App
