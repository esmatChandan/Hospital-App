import { useContext,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext";


const Login=()=> {
  const [formDate, setFormDate] = useState({
    email: "",
    password: "",
  });

  const [uploading, setUploading] = useState(false)
  const navigate = useNavigate()
  const {dispatch} = useContext(authContext)

  const handleInputChange = e => {
    setFormDate({...formDate,[e.target.name]:e.target.value})
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    setUploading(true);

    try {
        const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDate),
        });
        const result = await res.json();
        
        console.log(result.message);

        if (!res.ok) {
            throw new Error(result.message || "Login failed!");
        }

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload:{
            token:result.token,
            user:result.data,
            role: result.role
          }
        })
        console.log(result, "Login successful");
        

        // Success - Navigate to home page

        setUploading(true);
        toast.success(result.data.name || "Login successful!");
        navigate("/home");
    } catch (error) {
        setUploading(false);
        toast.error(error.message);
    }
};
  return (
    <>
      <section className="px-5 lg:px-0">
        <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
            Hello! <span className="text-primaryColor">Welcome</span> Back🎉
          </h3>
          <form action="" className="py-4 md:py-0"  onSubmit={submitHandler}>

            <div className="mb-5">
              <input type="email" placeholder="Enter Your Email" name="email" value={formDate.email} onChange={handleInputChange}
              className="w-full py-3 px-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor
              rounded-md cursor-pointer"
              required
              />
            </div>
            <div className="mb-5">
              <input type="Password" placeholder="password" name="password" value={formDate.password} onChange={handleInputChange}
              className="w-full py-3 px-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor
              rounded-md cursor-pointer"
              required
              />
            </div>
            <div className="mt-7">
                <button type="submit" className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">Login</button>
            </div>

            <p className="mt-5 text-textColor text-center">
                Don&apos;t have an account? <Link to='/register' className="text-primaryColor font-medium ml-1"> Register</Link>
            </p>
          </form>
        </div>
      </section>
      {/* <div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold mb-6 text-center text-blue-600">Medical Clinic Login</h2>
        <form id="loginForm" class="space-y-4">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" name="password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div class="flex items-center">
                <input type="checkbox" id="remember" name="remember" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
                <label for="remember" class="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
            <div>
                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Sign in
                </button>
            </div>
        </form>
        <div class="text-sm mt-4 text-center">
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</a>
        </div>
        <div id="message" class="mt-4 text-center text-sm"></div>
    </div>


</div> */}
    </>
  );
}

export default Login;
