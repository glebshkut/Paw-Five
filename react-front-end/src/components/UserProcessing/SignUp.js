import axios from "axios";
import react, { useState } from "react";
import "./SignUp.scss";

export default function SignUp(props) {

  // States for registration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // States for checking the errors
  const [error, setError] = useState("ok");

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 8 || email.length < 8 || !email.includes("@") || password.length < 8) {
      setError("input-error");
    } else {
      axios.post("/api/userProcessing/register/", {
        username: name,
        email: email,
        password: password
      }).then((response) => {
        if (Number(response.data.id) === -1) {
          setError("existing-user");
        } else {
          props.setCookie("user_id", response.data.id);
        }
      })
    }
  };

  // Showing error message if error is true
  const errorMessage = (message) => {
    return (
      <div
        className="message error">
        <h1>{message}</h1>
      </div>
    );
  };

  const handleBack = () => {
    props.setView("landing");
    props.setCover(false);
  }

  return (
    <div className="form">
      <button className="back-button" onClick={handleBack}>
        Go Back
      </button>
      <div className="user-registration">
        <h1>Signup Page</h1>
      </div>

      <div className="messages-container">

        {error !== "ok" &&
          <div className="messages" onClick={() => setError("ok")}>
            {(error === "input-error") ?
              errorMessage("Please enter all the fields") : errorMessage("User already exists")
            }
          </div>
        }
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <div className="text-field">
          <label className="label">Username</label>
          <input onChange={handleName} className="input"
            value={name} type="text" />
        </div>

        <div className="text-field">
          <label className="label">Email</label>
          <input onChange={handleEmail} className="input"
            value={email} type="email" />
        </div >

        <div className="text-field">
          <label className="label">Password</label>
          <input onChange={handlePassword} className="input"
            value={password} type="password" />
        </div >

        <div id="submit">
          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </div>

      </form >
    </div >
  );
}