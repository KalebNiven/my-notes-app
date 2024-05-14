import React, { useState } from "react";
import { Button, TextInput, Checkbox } from "flowbite-react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/user";
import axios from "axios";
// Define the SignupType interface
export interface SignupType {
  username: string;
  email: string;
  password: string;
}

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      alert(
        "Password must be at least 8 characters long and include a number."
      );
      return;
    }

    if (!termsAccepted) {
      alert("You must accept the terms and conditions to proceed.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}user/signup`, {
        username: username,
        email: email,
        password: password,
      });
      alert("Signup successful! Redirecting to login...");
      navigate("/signin"); // adjust the route as needed
    } catch (err: any) {
      // console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        alert(
          `Failed to create account: ${err.response.data.message}. Please try again.`
        );
      } else {
        alert("Failed to create account. Please try again.");
      }
    }
  };

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPassword = (password: string) => {
    return password.length >= 8 && /\d/.test(password);
  };

  return (
    <div className="d-flex justify-content-center form-container !my-8">
      <h3 className="text-center text-2xl font-bold mb-8">Signup</h3>
      <form onSubmit={handleSubmit} className="flex w-350 flex-col gap-4">
        <div className="input-icon">
          <FaUser />
          <TextInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
            placeholder="Username"
            required
          />
        </div>
        <div className="input-icon">
          <FaEnvelope />
          <TextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="Email address"
            required
          />
        </div>
        <div className="input-icon">
          <FaLock />
          <TextInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="d-flex align-items-center">
            <Checkbox
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <span className="ml-2">I agree to the terms</span>
          </div>
          <Link
            to="/signin"
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Sign In
          </Link>
        </div>
        <Button
          type="submit"
          disabled={
            !termsAccepted || !password || email === "" || username === ""
          }
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Signup;
