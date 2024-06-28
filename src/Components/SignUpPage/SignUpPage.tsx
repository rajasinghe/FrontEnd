import { useState } from "react";
import FormInput from "../FormInputComponent/FormInputNoVal";
function SignUpPage() {
  const [name, setName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [Profession, setProfession] = useState<string>("");

  return (
    <div>
      <form></form>
    </div>
  );
}

export default SignUpPage;
