import React from "react";
import style from "../styles/Input.module.scss";

export interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: "text" | "password";
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Input: React.FC<InputProps> = ({
  onChange,
  value,
  type,
  placeholder,
  className: customClassName,
  style: customStyle
}) => {
  return (
    <input
      onChange={onChange}
      value={value}
      type={type}
      placeholder={placeholder}
      className={`${style.input} ${customClassName}`}
      style={customStyle}
    />
  );
};

export default Input;
