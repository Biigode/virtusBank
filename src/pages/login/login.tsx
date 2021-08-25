import React, { useState } from "react";
import { useHistory } from "react-router";
import Input from "../../components/input";
import Button from "../../components/Button";
import Brand from "../../components/brand";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
import LoginUser from "../../consumer/loginUserData";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();
      if (!userEmail || !password) throw new Error("Please fill all field");
      await LoginUser(userEmail, password);
      history.push("/profile");
    } catch (error) {
      if (!error.message.includes("401")) {
        toast("Try again!!", { type: "warning" });
      } else {
        toast("Not authorized", { type: "error" });
      }
    }
  };
  const setInputUser = (e: any) => {
    setUserEmail(e.target.value);
  };
  const setInputPassword = (e: any) => {
    setPassword(e.target.value);
  };
  return (
    <div className="container">
      <Brand />
      <form onSubmit={handleLogin} className="">
        <div>
          <div className="logon-container">
            <Input
              label="Email"
              type="email"
              value={userEmail}
              setValue={setInputUser}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              setValue={setInputPassword}
            />
            <Button text="Login" type="submit" className="submit-button" />

            <a href="/createAccount">Create account</a>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
