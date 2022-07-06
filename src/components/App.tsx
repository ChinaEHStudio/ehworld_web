import React from "react";
import { useEffect, useReducer, useState } from "react";
import config from "../config/server";
import style from "../styles/App.module.scss";
import Button from "./Button";
import Input from "./Input";

import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export type UserDataField = "email" | "password";
export interface FormField {
  name: string;
  objName: UserDataField;
  type: "text" | "password";
}

const App: React.FC = () => {
  const [userData, setUserData] = useState({} as Record<UserDataField, string>);
  const [disabled, setDisabled] = useReducer(
    (disabled: boolean) => !disabled,
    false
  );
  const fields: FormField[] = [
    {
      name: "Email",
      objName: "email",
      type: "text",
    },
    {
      name: "Password",
      objName: "password",
      type: "password",
    },
  ];

  useEffect(() => {
    document.title = "Login - EHWorld";
  }, []);

  const storeTryCount = () => {
    window.localStorage.tryCount == undefined
      ? window.localStorage.setItem("tryCount", "0")
      : undefined;
    window.localStorage.setItem(
      "tryCount",
      String(Number(window.localStorage.tryCount) + 1)
    );
    window.localStorage.setItem("time", Date.now().toString());
  };

  const getTryCount = () =>
    Number(window.localStorage.getItem("tryCount")) ?? 0;

  const handleFormInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: FormField
  ) => {
    const userDataCopy = userData;
    userDataCopy[field.objName] = e.target.value;
    setUserData(userDataCopy);
  };

  const login = () => {
    if (!userData.email) {
      Swal.fire("请填入邮箱", "检测到您尚未输入邮箱，请输入后再试", "error");
      return;
    }
    if (!userData.password) {
      Swal.fire("请填入密码", "检测到您尚未输入密码，请输入后再试", "error");
      return;
    }
    if (
      !userData.email.match(
        /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      )
    ) {
      Swal.fire(
        "请输入正确的邮箱",
        "检测到您输入的邮箱不是正确邮箱格式，请重新输入后再试",
        "error"
      );
      return;
    }
    if (
      getTryCount() >= 3 &&
      Date.now() - Number(window.localStorage.getItem("time")) <= 900000
    ) {
      Swal.fire(
        "不要继续尝试了！",
        "您已尝试超过三次，请不要继续尝试",
        "error"
      );
      return;
    }
    setDisabled();
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${config.server.baseUrl}/account/log`, false);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(
      JSON.stringify({ email: userData.email, pass: userData.password })
    );
    Swal.fire("Good job!", xhr.responseText, "success");
    setDisabled();
    storeTryCount();
  };

  return (
    <div className={style.loginContainer}>
      <main className={style.login}>
        <div className={style.loginForm}>
          <h1>Login</h1>
          {fields.map((field, index) => (
            <Input
              onChange={(e) => handleFormInput(e, field)}
              value={userData[field.objName as UserDataField]}
              type={field.type}
              placeholder={field.name}
              key={index}
            />
          ))}
          <Button disabled={disabled} onClick={login}>
            Login
          </Button>
        </div>
      </main>
    </div>
  );
};

export default App;
