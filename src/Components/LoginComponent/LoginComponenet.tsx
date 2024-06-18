interface props {
  color?: "success" | "primary" | "danger" | "secondary";
}
function LoginComponenet({ color }: props) {
  return (
    <button
      className={"btn btn-" + color || "primary"}
      type="submit"
      onClick={handleLogin}
    >
      Login
    </button>
  );
}

async function handleLogin() {}

export default LoginComponenet;
