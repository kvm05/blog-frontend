"use client";
import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
const defaultData = {
	email: "",
	password: "",
};
function Login() {
	const [formData, setFormData] = useState(defaultData);
	const pageRoute = useRouter();
	const handleOnChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const formSubmit = async (e) => {
		e.preventDefault();
		if (formData.email.includes("@") && formData.password.length > 6) {
			try {
				const response = await axios.post(
					"http://localhost:5000/api/auth/login",
					{
						email: formData.email,
						password: formData.password,
					}
				);
				if (response.data.token) {
					localStorage.setItem("userToken", response.data.token);
					localStorage.setItem("user_id", response.data.user._id)
					pageRoute.push("/blog");
					console.log("hello blog")
				} else {
					setFormData({ ...formData, password: "" });
				}
			} catch (error) {
				console.log(error)
			}
		} else {
			toast.warning("Provide valid Credentials!");
			setFormData(defaultData);
		}
	};
	return (
		<>
			<div className="bg-[#121418] w-[100vw] h-[100vh] flex justify-center items-center">
				<div className="w-[90%] sm:w-[400px] pl-0 ml-0 h-[400px] sm:pl-0 sm:ml-9 mt-20 flex flex-col items-center justify-center space-y-3">
					{/* <img className='w-[100px] absolute -top-16 left-28' src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/78c4af118001599.608076cf95739.jpg" alt="" /> */}
					<div className="text-white text-3xl font-semibold">
						Login
					</div>
					{/* <h2 className='text-2xl text-[#fff] font-bold tracking-wide my-6 text-center'>Login to your Account</h2> */}
					<form
						className="flex flex-col gap-y-3 w-full items-center justify-center"
						onSubmit={formSubmit}
					>
						<div className="w-80 flex items-center justify-center">
							<input
								className="w-full bg-[#222222] h-12 pl-3 text-[#ffff]"
								onChange={handleOnChange}
								name="email"
								type="text"
								placeholder="Email"
								value={formData.email}
								required
							/>
						</div>
						<div className="w-80 flex items-center justify-center ">
							<input
								className="w-full bg-[#222222] h-12 pl-3 text-[#ffff]"
								onChange={handleOnChange}
								type="password"
								name="password"
								placeholder="Password"
								value={formData.password}
								required
							/>
						</div>

						<button
							className="w-80 h-[50px] font-bold text-[#121418] tracking-wide text-[17px] border-2 hover:bg-[#121418] transition-all duration-200 relative"
							type="submit"
						>
							<div className="absolute -top-[53px] left-[27%] sm:-top-[53px] sm:left-[56px]">
								<lottie-player
									src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json"
									background="transparent"
									speed="1"
									style={{ width: "200px", height: "160px" }}
									loop
									autoplay
								></lottie-player>
							</div>
							<p className="text-[#fff]">Login</p>
						</button>
						<div className="">
							New User? <Link href='/register' className="underline">Click here</Link> to sign up
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default Login;
