import { useEffect, useReducer, useState } from "react";
import config from "../config/server";
import style from "../styles/App.module.scss";

function App() {
  let [emailAddress, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [disabled, setDisabled] = useReducer(
    (disabled: boolean) => !disabled,
    false
  );

  useEffect(() => {
    document.title = "Login - EHWorld"
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
    const response = await fetch(`${config.server.baseUrl}/account/log`, {
      method: "POST",
      body: JSON.stringify({ email: emailAddress, pass: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const rText = await response.text();
    // TODO: use custom alert instead
    alert(rText);
    setDisabled();
    storeTryCount();
  };

  return (
    <div className={style.loginContainer}>
      <main className={style.login}>
        <div className={style.loginForm}>
          <h1>Login</h1>
          <p>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={emailAddress}
              type="text"
              name=""
              id=""
              placeholder="Email"
              className={style.formInput}
            />
          </p>
          <p>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type="password"
              placeholder="Password"
              className={style.formInput}
            />
          </p>
          <p>
            <button disabled={disabled} onClick={login} className={style.submitButton}>
              Login
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
