import { useAuth } from "../../auth/auth";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
export function SignUp({login}) {
  const history = useHistory();
  const { signUp } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    if (!username) {
      alert("Please input usernam");
      return;
    }
    if (!password) {
      alert("Please input password");
      return;
    }
    await signUp(username, password);
  };

  useEffect(() => {
    if (login) {
      history.replace('/');
    }
  });

  return (
    <div className="container col-4 sign-page">
      <h2>Sign Up</h2>
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
      <button type="button" className="btn btn-info" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
