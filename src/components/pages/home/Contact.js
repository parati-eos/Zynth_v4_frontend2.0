import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredMethod: "Email",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, preferredMethod: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://formspree.io/f/xzzprdlk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus("Message sent!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        preferredMethod: "Email",
      });
    } else {
      setStatus("Failed to send message.");
    }
  };

  return (
    <section className="h-screen flex">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row w-full">
        <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full mb-10 lg:mb-0">
          <img
            src="https://pagedone.io/asset/uploads/1696488602.png"
            alt="ContactUs tailwind section"
            className="w-full h-full object-cover lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-700"
          />
          <h1 className="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">
            Contact us
          </h1>
        </div>
        <div className="lg:w-1/2 w-full lg:h-full flex flex-col justify-between lg:rounded-r-2xl lg:rounded-l-none rounded-lg px-8 py-11">
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="lg:flex justify-between w-full mb-6">
              <div className="lg:mb-0 mb-6 lg:w-[48%] w-full">
                <label className="block font-normal text-sm leading-4 text-white mb-3">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="block w-full border border-gray-300 rounded text-xs leading-3 text-white bg-transparent py-4 px-3"
                />
              </div>
              <div className="lg:mb-0 mb-6 lg:w-[48%] w-full">
                <label className="block font-normal text-sm leading-4 text-white mb-3">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="johndoe@email.com"
                  className="block w-full border border-gray-300 bg-transparent rounded text-xs leading-3 text-white py-4 px-3"
                />
              </div>
            </div>
            <div className="lg:mb-12 mb-6">
              <label className="block font-normal text-sm leading-4 text-white mb-3">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 89"
                className="block w-full border border-gray-300 bg-transparent rounded text-xs leading-3 text-white py-4 px-3"
              />
            </div>
            <div className="lg:mb-12 mb-6">
              <label className="block font-normal text-sm leading-4 text-white mb-3">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                className="block w-full border border-gray-300 rounded text-xs leading-3 text-white py-4 px-3 bg-transparent"
                rows="4"
              />
            </div>
            <div className="lg:mb-12 mb-6">
              <h3 className="font-semibold text-lg leading-6 text-white mb-4">
                Preferred method of contact
              </h3>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="email"
                    name="preferredMethod"
                    value="Email"
                    checked={formData.preferredMethod === "Email"}
                    onChange={handleRadioChange}
                    className="mr-2 text-white"
                  />
                  <label htmlFor="email" className="text-sm text-white">
                    Email
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="phone"
                    name="preferredMethod"
                    value="Phone"
                    checked={formData.preferredMethod === "Phone"}
                    onChange={handleRadioChange}
                    className="mr-2"
                  />
                  <label htmlFor="phone" className="text-sm text-white">
                    Phone
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="message"
                    name="preferredMethod"
                    value="Message"
                    checked={formData.preferredMethod === "Message"}
                    onChange={handleRadioChange}
                    className="mr-2"
                  />
                  <label htmlFor="message" className="text-sm text-white">
                    Message
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-auto">
              <button
                type="submit"
                className="w-full text-center bg-yellow-600 text-white font-semibold text-sm leading-5 py-4 rounded"
              >
                Submit
              </button>
              {status && (
                <p
                  className={`${
                    status.includes("sent") ? "text-green-600" : "text-red-600"
                  } text-sm`}
                >
                  {status}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
