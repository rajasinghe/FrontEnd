import React, { MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";

interface FormInputComponent {
  type: "textArea" | "input" | "file";
  label: string;
  className?: string;
  state: string;
  setState: (state: string | SetStateAction<string>) => void;
  isValid: boolean | null;
  instanceRef?: MutableRefObject<HTMLInputElement | null>;
  validator: (state: string) => void;
  labelAlign?: "start" | "center";
  validationLabel?: boolean;
}

const FormInput = ({
  state,
  setState,
  label,
  className,
  isValid,
  instanceRef,
  type,
  validator,
  labelAlign,
  validationLabel,
}: FormInputComponent) => {
  const [needValidation, setNeedValidation] = useState<boolean | null>(null);

  useEffect(() => {
    if (isValid != null) {
      //not null means that the component has been validated before need to enable onchange Validation
      setNeedValidation(true);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //here i setted the state but the event handler has the same previous snapshot of the state
    setState(e.target.value);
    //if we do some thing here with the state the state will have the previous value
    //so instead of the state we deal directly with the value
    if (needValidation) {
      validator(e.target.value);
    }
  };
  return (
    <div className={className}>
      <label
        className={`form-label d-flex ${labelAlign == "center" ? "justify-content-center" : ""}`}
      >
        {label}
      </label>
      {type === "textArea" ? (
        <textarea
          value={state}
          className={`form-control ${isValid == null ? "" : isValid ? "is-valid" : "is-invalid"}`}
          onChange={handleChange}
        />
      ) : (
        <input
          ref={instanceRef}
          type="text"
          value={state}
          className={`form-control ${isValid == null ? "" : isValid ? "is-valid" : "is-invalid"}`}
          onChange={handleChange}
        />
      )}
      {validationLabel ? (
        <div
          className={
            isValid == null ? "opacity-0" : isValid ? "valid-feedback" : "invalid-feedback"
          }
        >
          {isValid ? `valid ${label}` : `invalid ${label}`}
        </div>
      ) : (
        null
      )}
    </div>
  );
};

export default FormInput;
