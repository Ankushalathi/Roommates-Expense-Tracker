import { ErrorMessage } from "formik";

type Props = {
  label?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  minRows?: number;
  name?: string;
  onBlur?: any;
};

const ATMTextArea = ({
  label,
  required = false,
  value,
  onChange,
  className,
  placeholder,
  minRows = 2,
  name = "",
  onBlur,
}: Props) => {
  return (
    <div className="relative ">
      <div className="flex items-center gap-1">
        {label && (
          <label className="font-medium text-slate-700">
            {" "}
            {label} {required && <span className="text-red-500"> * </span>}{" "}
          </label>
        )}
     
      </div>
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={minRows}
        className={`w-full p-2 bg-white text-slate-700 border rounded border-divider outline-blue-400  ${label && "mt-0"
          }  ${className}`}
        placeholder={placeholder}
        onBlur={onBlur}
      />

      {name && (
        <ErrorMessage name={name}>
          {(errMsg) => (
            <p className="font-poppins absolute text-[14px] text-start mt-0 text-red-500">
              {errMsg}
            </p>
          )}
        </ErrorMessage>
      )}
    </div>
  );
};

export default ATMTextArea;
