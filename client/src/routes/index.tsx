import { Navigate, Route, Routes } from "react-router-dom"


const AppRoutes = () =>{
  return (
    <Routes>
        <Route path="/" element={<Navigate to={"/account/login"} />} />;

        <Route path="/account/login" element={''} />
        <Route path="/account/register" element={''} />
        <Route path="" element={''} />
        <Route path="" element={''} />
        <Route path="" element={''} />
        <Route path="" element={''} />
    </Routes>
  )
}

export default AppRoutes