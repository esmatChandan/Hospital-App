import { useState } from "react";

import avatar from "../assets/images/doctor-img01.png";

import signupImg from "../assets/images/signup.gif";
import { Link } from "react-router-dom";
import uploadImageToClodunary from "../utils/uploadCloudinary";
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [selectdFile, setSelectdFile] = useState(null);
    const [previewUrl, setpreviewUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [formDate, setFormDate] = useState({
        name: "",
        email: "",
        password: "",
        photo: "",
        gender: "",
        role: "patient",
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormDate({ ...formDate, [e.target.name]: e.target.value });
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        const data = await uploadImageToClodunary(file);
        setpreviewUrl(data.url);
        setSelectdFile(data.url);
        setFormDate({ ...formDate, photo: data.url });
        // Handle file upload or preview logic here
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setUploading(true);

        try {
            const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDate),
            });
            const data = await res.json();
            const { message } = data;
            console.log(message);

            if (!res.ok) {
                throw new Error(data.message || "Registration failed!");
            }

            // Success - Navigate to login page

            setUploading(true);
            toast.success(data.message || "Signup successful!");
            navigate("/login");
        } catch (error) {
            setUploading(false);
            toast.error(error.message);
        }
    };

    return (
        <section className="px-5 xl:px-0">
            <div className="max-w-[1170px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="hidden lg:block bg-primaryColor rounded-l-lg">
                        <figure className="rounded-l-lg">
                            <img src={signupImg} alt="" className="w-full rounded-l-lg" />
                        </figure>
                    </div>

                    <div className="rounded-l-lg lg:pl-16 py-10">
                        <h3 className="text-headingColor text-[22px] leading-9 font-bold">
                            Create an <span className="text-primaryColor">account</span>
                        </h3>

                        <form onSubmit={submitHandler}>
                            <div className="mb-5">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    name="name"
                                    value={formDate.name}
                                    onChange={handleInputChange}
                                    className="w-full py-3 px-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor
              rounded-md cursor-pointer"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    name="email"
                                    value={formDate.email}
                                    onChange={handleInputChange}
                                    className="w-full pr-3 px-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor
              rounded-md cursor-pointer"
                                    required
                                />
                            </div>

                            <div className="mb-5">
                                <input
                                    type="password"
                                    placeholder="Enter Your Password"
                                    name="password"
                                    value={formDate.password}
                                    onChange={handleInputChange}
                                    className="w-full pr-3 px-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor
              rounded-md cursor-pointer"
                                    required
                                />
                            </div>

                            <div className="mb-5 flex items-center justify-between">
                                <label className="text-headingColor font-bold text-[16px] leading-7">
                                    Are You a:
                                    <select
                                        name="role"
                                        value={formDate.role}
                                        onChange={handleInputChange}
                                        className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                                    >
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>
                                    </select>
                                </label>
                                <label className="text-headingColor font-bold text-[16px] leading-7">
                                    Gender
                                    <select
                                        name="gender"
                                        value={formDate.gender}
                                        onChange={handleInputChange}
                                        className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </label>
                            </div>
                            <div className="mb-5 flex items-center gap-3">
                                {selectdFile && (
                                    <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                                        <img
                                            src={previewUrl}
                                            alt=""
                                            className="rounded-full w-full"
                                        />
                                    </figure>
                                )}
                                <div className="relative w-[160px] h-[50px]">
                                    <input
                                        type="file"
                                        name="photo"
                                        onChange={handleFileChange}
                                        id="customFile"
                                        accept=".jpg, .png"
                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <label
                                        htmlFor="customFile"
                                        className="absolute top-0 left-0  h-full flex items-center px-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] 
                     text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                                    >
                                        upload photo
                                    </label>
                                </div>
                            </div>
                            <div className="mt-7">
                                <button
                                    disabled={uploading && true}
                                    type="submit"
                                    className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                                >
                                    {uploading ? <HashLoader size={35} color="white" /> : "Sign Up"}
                                </button>
                            </div>

                            <p className="mt-5 text-textColor text-center">
                                Already have an account?
                                <Link to="/login" className="text-primaryColor font-medium ml-1">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;

// import React from 'react'
// import { DiStackoverflow } from 'react-icons/di'

// function Signup() {
//   return (
//     <div>
//     <div DiStackoverflow class="bg-gray-100 flex items-center justify-center min-h-screen">
//     <div class="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 class="text-2xl font-bold mb-6 text-center text-blue-600">Create Your Account</h2>
//         <div className=''>
//             <div>
//                 <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
//                 <input type="text" id="name" name="name" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
//             </div>
//             <div>
//                 <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
//                 <input type="email" id="email" name="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
//             </div>
//             <div>
//                 <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
//                 <input type="password" id="password" name="password" required minlength="8" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
//             </div>
//             <div>
//                 <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
//                 <input type="password" id="confirmPassword" name="confirmPassword" required minlength="8" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
//             </div>
//             <div class="flex items-center">
//                 <input type="checkbox" id="terms" name="terms" required class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
//                 <label for="terms" class="ml-2 block text-sm text-gray-900">I agree to the
//                 </label>

//             </div>
//             <div>
//                 <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                     Sign up
//                 </button>
//             </div>
//         </div>
//         <div class="text-sm mt-4 text-center">
//             Already have an account? <a href="#" class="font-medium text-blue-600 hover:text-blue-500">Log in</a>
//         </div>
//         <div id="message" class="mt-4 text-center text-sm"></div>
//     </div>

//     {/* <script>
//         document.getElementById('signupForm').addEventListener('submit', async (e) => {
//             e.preventDefault();
//             const name = document.getElementById('name').value;
//             const email = document.getElementById('email').value;
//             const password = document.getElementById('password').value;
//             const confirmPassword = document.getElementById('confirmPassword').value;
//             const terms = document.getElementById('terms').checked;
//             const messageElement = document.getElementById('message');

//             if (password !== confirmPassword) {
//                 messageElement.textContent = 'Passwords do not match.';
//                 messageElement.className = 'mt-4 text-center text-sm text-red-600';
//                 return;
//             }

//             if (!terms) {
//                 messageElement.textContent = 'Please agree to the Terms and Conditions.';
//                 messageElement.className = 'mt-4 text-center text-sm text-red-600';
//                 return;
//             }

//             try {
//                 // This is a mock API call. Replace the URL with your actual signup endpoint.
//                 const response = await axios.post('https://api.example.com/signup', {
//                     name,
//                     email,
//                     password
//                 });

//                 messageElement.textContent = 'Signup successful! Please check your email to verify your account.';
//                 messageElement.className = 'mt-4 text-center text-sm text-green-600';

//                 // Here you would typically redirect the user or show a success message
//                 // For example:
//                 // window.location.href = '/verify-email';

//             } catch (error) {
//                 messageElement.textContent = 'Signup failed. Please try again.';
//                 messageElement.className = 'mt-4 text-center text-sm text-red-600';
//             }
//         });
//     </script> */}
// </div>
//     </div>
//   )
// }

// export default Signup





