import {  AuthLogin } from "../../../component/Auth/Login";
import { Navbar } from "../../../component/Navbar/Navbar"
import { Fragment } from "react/jsx-runtime";
export const Login = () => {
    return (
      <Fragment>
        <Navbar route="login"/>
        <AuthLogin/>
      </Fragment>
    )
}