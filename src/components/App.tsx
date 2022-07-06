import React from "react";
import { useEffect, useReducer, useState } from "react";
import config from "../config/server";
import style from "../styles/App.module.scss";
import Button from "./Button";
import Input from "./Input";

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

  const login = async () => {
    if (
      getTryCount() >= 3 &&
      Date.now() - Number(window.localStorage.getItem("time")) <= 900000
    ) {
      // TODO: use custom alert toaster instead
      alert("您已尝试超过三次，请不要继续尝试");
      return;
    }
    setDisabled();
    let xhr = new XMLHttpRequest()
    xhr.open("POST",`${config.server.baseUrl}/account/log`, false)
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify({ email: userData.email, pass: userData.password }));
    xhr.send()
    /*const response = await fetch(`${config.server.baseUrl}/account/log`, {
      method: "POST",
      body: JSON.stringify({ email: userData.email, pass: userData.password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const rText = await response.text();
    // TODO: use custom alert instead
    alert(rText);*/
    alert(xhr.responseText)
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
          <Button
            disabled={disabled}
            onClick={login}
          >
            Login
          </Button>
        </div>
      </main>
    </div>
  );
}

export default App;
