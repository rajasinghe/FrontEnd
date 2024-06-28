import { useRef, useState } from "react";
import FormInput from "../../FormInputComponent/FormInputNoVal.jsx";
import { Link, useNavigate } from "react-router-dom";

interface LoginComponentProps {
  className?: string;
}

function LoginComponent({ className }: LoginComponentProps) {
  const navigate = useNavigate();
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameIsValid, setUsernameIsValid] = useState<boolean | null>(null);
  const [passwordIsValid, setPasswordIsValid] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validator()) {
      try {
        const response = await loginUsingUserNamePassword({
          username: username,
          password: password,
        });
        console.log(response);
        navigate("/products/new");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validator = (): boolean => {
    usernameValidator(username);
    passwordValidator(password);
    return usernameValidator(username) && passwordValidator(password);
  };

  const usernameValidator = (username: string): boolean => {
    if (username && username != "") {
      console.log("username valid");
      setUsernameIsValid(true);
      return true;
    }
    setUsernameIsValid(false);
    return false;
  };

  const passwordValidator = (password: string): boolean => {
    if (password && password != "") {
      console.log("password is valid");
      setPasswordIsValid(true);
      return true;
    }
    setPasswordIsValid(false);
    return false;
  };

  return (
    <form className={`p-3 ${className}`} onSubmit={handleSubmit}>
      <FormInput
        className="mb-3"
        state={username}
        setState={setUsername}
        label="Username or email address"
        isValid={usernameIsValid}
        type="input"
        instanceRef={userNameRef}
        validator={usernameValidator}
      />

      <FormInput
        state={password}
        setState={setPassword}
        label="Password"
        isValid={passwordIsValid}
        type="input"
        instanceRef={passwordRef}
        validator={passwordValidator}
      />
      <Link className="d-flex justify-content-end text-danger text-decoration-none" to={""}>
        Forget Password?
      </Link>
      <div className=" px-1 mt-3">
        <button className="btn  w-100 px-4 btn-success">Login</button>
      </div>
    </form>
  );
}

interface LoginCredentials {
  username: string;
  password: string;
}

const loginUsingUserNamePassword = async (credentials: LoginCredentials) => {
  try {
    const response: any = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const responseReadable = await response.json();
    if (response.ok) {
      return responseReadable;
    }
    throw new Error(responseReadable.msg || "error in response");
  } catch (e) {
    throw e;
  }
};

export default LoginComponent;
