import React from 'react'
import style from "../styles/App.module.scss";

const Container: React.FC<{children: React.ReactNode}> = (props) => {
    const children = props.children
    return (
      <div className={style.loginContainer}>
        <main className={style.login}>
          <div className={style.loginForm}>{children}</div>
        </main>
      </div>
    );
}

export default Container