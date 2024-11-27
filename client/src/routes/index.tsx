import { Navigate, Route, Routes } from "react-router-dom"

import SignIn from "../pages/SignIn/SignIn"
import SignUp from "../pages/SignUp/SignUp"

const AppRoutes = () => {
  return (
    <Routes>
        <Route index element={<Navigate to={"/account/login"} />} />

        <Route path="/account/login" element={<SignIn />} />
        <Route path="/account/register" element={<SignUp />} />
        <Route path="" element={''} />
        <Route path="" element={''} />
        <Route path="" element={''} />
        <Route path="" element={''} />
    </Routes>
  )
}

export default AppRoutes