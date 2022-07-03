import React from "react";
import style from "../styles/Button.module.scss";

export interface ButtonProps {
  children?: React.ReactNode | React.ReactNode[];
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className: customClassName,
  style: customStyle,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${style.button} ${customClassName}`}
      style={customStyle}
    >
      {children}
    </button>
  );
};

export default Button;
