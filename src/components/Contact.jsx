import React, { useState } from "react";
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const Contact = () => {
  const [message, setMessage] = useState("");

  const handelContactSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    if(message===""){
      toast.error("Empty  Field Not Working");
    }
    const emaildata = `My Name is ${name}. Here is My Email Address: ${email} And By Context is: ${message}`;
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/my_contact`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ emaildata })
    }).then((res) => {
      if (!res.ok) {
        throw new Error("API ERROR");
      }
      return res.json()
    }).then((data) => {
      form.reset();
      setMessage("");
      toast.success(data?.message);
    }).catch((error) => {
      toast.error(error?.message);
    });
  }

  return (
    <div
      name="contact"
      className="w-full h-screen bg-gradient-to-b from-black to-gray-800 p-4 text-white"
    >
      <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            Contact
          </p>
          <p className="py-6">Submit the form below to get in touch with me</p>
        </div>

        <div className="flex justify-center items-center">
          <form onSubmit={handelContactSubmit} className="flex flex-col w-full md:w-1/2">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
            />
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              required
              className="my-4 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
            />
            <ReactQuill
              value={message}
              onChange={setMessage}
              placeholder="Enter your message"
              
              className="p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
              theme="snow"
            
            />

            <button
              type="submit"
              className="text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300"
            >
              Let's talk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
