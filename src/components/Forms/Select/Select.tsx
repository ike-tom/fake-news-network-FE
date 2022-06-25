import { FC, SelectHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { CATEGORIES } from "../../../constants/forms";
import Label from "../Label/Label";
import ValidationMessage from "../ValidationMessage/ValidationMessage";
import styles from "./Select.module.scss";

type SelectAttributes = BasicFieldAttributes &
  SelectHTMLAttributes<HTMLSelectElement>;

const Select: FC<SelectAttributes> = (props) => {
  const { id, label } = props;

  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <>
      {label && <Label htmlFor={id}>{label}</Label>}
      <select
        {...props}
        className={`${styles.select} ${errors[id] ? " validation-error" : ""}`}
        {...register(id)}
      >
        {CATEGORIES.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
      {errors[id] && (
        <ValidationMessage>{"To pole jest wymagane"}</ValidationMessage>
      )}
    </>
  );
};

export default Select;
