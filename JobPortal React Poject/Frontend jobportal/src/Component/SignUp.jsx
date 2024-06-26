import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import "aos/dist/aos.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false); // Corrected the state name

  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (firstName === "") {
      toast.error(<div>First Name is required</div>);
    } else if (lastName === "") {
      toast.error(<div>Last Name is required</div>);
    } else if (email === "") {
      toast.error(<div>Email is required</div>);
    } else if (!email.includes("@")) {
      toast.error(<div>Email is invalid</div>);
    } else if (password === "") {
      toast.error(<div>Password is required</div>);
    } else if (password.length < 6) {
      toast.error(<div>Password must be at least 6 characters</div>);
    } else if (confirmPassword === "") {
      toast.error(<div>Confirm Password is required</div>);
    } else if (confirmPassword !== password) {
      toast.error(<div>Passwords do not match</div>);
    } else if (!isChecked) {
      toast.error(<div>Checkbox is required</div>);
    } else {
      toast.success(<div> Successful!</div>);
      // Proceed with form submission if all fields are valid
      sendData();
    }
  };

  const sendData = () => {
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    };

    axios.post("http://localhost:8070/registers/add", newUser)
      .then(() => {
        toast.success(<div> Registration Successful!</div>);
        navigate("/login");
        // Optionally reset form fields after successful registration
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsChecked(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div> Error registering user</div>);
      });
  };

  return (
    <div className="min-h-screen py-14 bg-gray-100 mt-20 ">
      <div className="container bg-gray-100 mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-2xl mx-auto shadow-2xl overflow-hidden" data-aos="zoom-out">
          <div
            className="w-full lg:w-2/5 flex flex-col items-center justify-center"
            style={{ backgroundImage: "url('/images/27053.jpg')" }}>

            <h2 className="text-3xl font-bold mb-3 text-white ">Register as Company</h2>
            <div className="border-2 w-10 border-white mb-3"></div>
            <p className="mb-6 text-white text-center">
              Want to post jobs for your <br/> company
            </p>
            <a
              href="./empsignup"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-black text-slate-200 "
            >
              Click here
            </a>
          </div>
          <div className="w-full lg:w-3/5 py-10 px-12 bg-white">
            <p className="mb-6 text-blue text-2xl font-bold ml-10">Create Your Own Account.</p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-5 ">
                <input
                  type="text"
                  placeholder="First Name"
                  className="bg-gray-100 rounded py-1 px-2 w-4/5 ml-10 text-black placeholder:text-gray-400"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="bg-gray-100 text-black placeholder:text-gray-400 rounded py-1 px-2 w-4/5"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Email"
                  className="bg-gray-100 text-black placeholder:text-gray-400 rounded py-1 px-2 w-4/5 ml-10 "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-gray-100 text-black placeholder:text-gray-400 rounded py-1 px-2 w-4/5 ml-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="bg-gray-100 text-black placeholder:text-gray-400 rounded py-1 px-2 w-4/5 ml-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <div className="mt-5 ml-10">
                  <input
                    type="checkbox"
                    className="border border-gray-400"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <span>
                     I accept the{" "}
                    <a href="#" className="text-blue font-semibold">
                      Terms of use
                    </a>{" "}
                    &{" "}
                    <a href="#" className="text-blue font-semibold">
                      privacy policy
                    </a>
                  </span>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="border-2 border-blue-500 text-blue-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue hover:text-white ml-28"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
