import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import config from "../config/server";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export default function () {
  let [userName, setUserName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [verifyNumber, setVn] = useState("");

  const sendVN = () => {
    if (!email.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
      Swal.fire(
        "请输入正确的邮箱",
        "检测到您输入的邮箱不是正确邮箱格式，请重新输入后再试",
        "error"
      );
      return;
    }
    fetch(`${config.server.baseUrl}/account/getvn?email=${email}`).catch(() =>
      Swal.fire("发送失败", "请检查您的网络连接", "error")
    );
    Swal.fire("Good job!", "发送成功，请检查邮箱", "success");
  };

  const reg = async ([un, ea, pw, vn]: string[]) => {
    let xhr = await fetch(`${config.server.baseUrl}/account/reg`, {
      method: "POST",
      body: JSON.stringify({
        username: un,
        pass: pw,
        email: ea,
        vernumber: vn,
      }),
    });

    return await xhr.text();
  };

  useEffect(() => {
    document.title = "Register - EHWorld";
  }, []);

  return (
    <Container>
      <h1>Register</h1>
      <Input
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
        type={"text"}
        placeholder={"用户名"}
      />
      <Input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type={"text"}
        placeholder={"邮箱"}
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type={"password"}
        placeholder={"密码"}
      />
      <Input
        onChange={(e) => setVn(e.target.value)}
        value={verifyNumber}
        type={"text"}
        placeholder={"验证码"}
      />
      <Button style={{ marginRight: "30px" }} onClick={sendVN}>
        发送验证码
      </Button>
      <Button
        onClick={async () => {
          Swal.fire(
            "Good job!",
            await reg([userName, email, password, verifyNumber]),
            "success"
          );
        }}
      >
        注册
      </Button>
    </Container>
  );
}
