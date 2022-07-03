import { useReducer, useState } from "react";
import "../css/App.css";

function App() {
  let [emailAddress, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [bDisabled, setDisabled] = useReducer(
    (disabled: boolean) => !disabled,
    false
  );

  function countTry() {
    window.localStorage.tryCount == undefined
      ? window.localStorage.setItem("tryCount", "0")
      : undefined;
    window.localStorage.setItem(
      "tryCount",
      String(Number(window.localStorage.tryCount) + 1)
    );
    window.localStorage.setItem("time", String(Date.now()));
  }

  const getCountTry = () =>
    Number(window.localStorage.getItem("tryCount")) ?? 0;

  async function login() {
    if (
      getCountTry() >= 3 &&
      Date.now() - Number(window.localStorage.getItem("time")) <= 900000
    ) {
      alert("您已尝试超过三次，请不要继续尝试");
      return;
    }
    setDisabled();
    let rpText = await fetch(
      "https://ehworld20220702211431.azurewebsites.net/account/log",
      {
        method: "POST",
        body: JSON.stringify({ email: emailAddress, pass: password }),
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );
    let rText = await rpText.text();
    await alert(rText);
    setDisabled();
    countTry();
  }

  return (
    <div className="App">
      <title>Login | EHWorld</title>
      <main>
        <div>
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
            />
          </p>
          <p>
            <button disabled={bDisabled} onClick={login}>
              登录
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
