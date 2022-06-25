import { FC, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import Label from "../Label/Label";
import styles from "./Input.module.scss";
import ValidationMessage from "../ValidationMessage/ValidationMessage";

type InputAttributes = BasicFieldAttributes &
  InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputAttributes> = (props) => {
  const { id, label } = props;

  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <>
      {label && <Label htmlFor={id}>{label}</Label>}
      <input
        {...props}
        className={`${styles.input} ${errors[id] ? " validation-error" : ""}`}
        {...register(id)}
      />
      {errors[id] && (
        <ValidationMessage>{"To pole jest wymagane"}</ValidationMessage>
      )}
    </>
  );
};

export default Input;
