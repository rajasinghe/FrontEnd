import React, { MutableRefObject, SetStateAction, useEffect, useRef } from "react";

interface FormInputComponent {
  type: "textArea" | "input" | "file";
  label: string;
  className?: string;
  state: string;
  setState: (state: string | SetStateAction<string>) => void;
  isValid: boolean | null;
  setIsValid: (isValid: boolean | SetStateAction<boolean | null>) => void;
  instanceRef?: MutableRefObject<HTMLInputElement | null>;
  validator: () => boolean;
}

const FormInput = ({
  state,
  setState,
  label,
  className,
  isValid,
  setIsValid,
  instanceRef,
  type,
  validator,
}: FormInputComponent) => {
  const intialRender = useRef<boolean>(true);

  useEffect(() => {
    console.log(label + "component rerendered");
  });

  useEffect(() => {
    if (intialRender.current) {
      intialRender.current = false;
    } else {
      if (validator()) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //here i setted the state but the event handler has the same previous snapshot of the state
    setState(e.target.value);
    //if we do some thing here wit the state the state will have the previous value
  };
  return (
    <div className={className}>
      <label className="form-label ">{label}</label>
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

      <div
        className={isValid == null ? "opacity-0" : isValid ? "valid-feedback" : "invalid-feedback"}
      >
        {isValid ? `valid ${label}` : `invalid ${label}`}
      </div>
    </div>
  );
};

export default FormInput;
