import { useAuth } from "../../auth/auth";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthComsumer } from "../../auth/AuthProvider";
export function SignIn() {
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (setLogin) => {
    if (!username) {
      alert("Please input usernam");
      return;
    }
    if (!password) {
      alert("Please input password");
      return;
    }
    await signIn(username, password);
    setLogin(true);
  };

  return (
    <AuthComsumer>
      {(value) => {
        if (value.login) return <Redirect to="/" />;
        else
          return (
            <div className="container col-4 sign-page">
              <h2>Sign In</h2>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Username
                </span>
                <input
                  type="text"
                  value={username}
                  onInput={(e) => setUsername(e.target.value)}
                  className="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onInput={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Password"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => handleSubmit(value.setLogin)}
              >
                Submit
              </button>
            </div>
          );
      }}
    </AuthComsumer>
  );
}
