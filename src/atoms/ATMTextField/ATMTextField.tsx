import { ErrorMessage } from "formik";
import React from "react";
import { getInputHeight } from "../../utils/formUtils/getInputHeight";

export type ATMTextFieldPropTypes = {
  name?: string;
  value?: string | string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  size?: "small" | "medium" | "large";
} & Omit<React.ComponentProps<"input">, "size">;

const ATMTextField = ({
  name,
  value,
  className = "bg-white rounded",
  onChange,
  label,
  required,
  size = "small",
  ...rest
}: ATMTextFieldPropTypes) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        {label && (
          <label className="font-medium text-slate-700">
            {" "}
            {label} {required && <span className="text-red-500"> * </span>}{" "}
          </label>
        )}
       
       </div>
      <input
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        className={`${getInputHeight(
          size
        )} w-full px-2 text-slate-700 border border-divider outline-blue-400 mt-1  ${label && "mt-0"
          }  ${className}`}
        {...rest}
      />
      {name && (
        <ErrorMessage name={name}>
          {(errMsg) => (
            <p className="font-poppins absolute text-[14px] text-start mt-0 text-red-500">
              {" "}
              {errMsg}{" "}
            </p>
          )}
        </ErrorMessage>
      )}
    </div>
  );
};

export default ATMTextField;
