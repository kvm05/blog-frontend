"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const defaultData = {
	firstname: "",
	lastname: "",
	email: "",
	password: "",
};
function Regsiter() {
	const [formData, setFormData] = useState(defaultData);
	const [isLoading, setIsLoading] = useState(false);
	const [showPass, setShowPass] = useState(false);
	const pageRoute = useRouter();
	const handleOnChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleOnSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (formData.email.includes("@") && formData.password.length > 6) {
			try {
				const response = await axios.post(
					"http://localhost:5000/api/auth/register",
					{
						firstname: formData.firstname,
						lastname: formData.lastname,
						email: formData.email,
						password: formData.password,
					}
				);
				if (response.data?.token) {
					localStorage.setItem("userToken", response.data.token);
					pageRoute.push("/blog");
				} else {
					setFormData({ ...formData, password: "", email: "" });
				}
			} catch (error) {
				console.log(error)
			}
		} else {
			setFormData({ ...formData, password: "" });
		}
	};

	return (
		<div className="bg-[#121418] w-[100vw] h-[100vh] flex justify-center items-center">
			<div className="w-[90%] sm:w-[400px] pl-0 ml-0 h-[400px] sm:pl-0 sm:ml-9 mt-20 flex flex-col items-center justify-center space-y-3">
				<div className="text-white text-3xl font-semibold">
					Register
				</div>
				<form
					className="flex flex-col gap-y-3 mt-[12%]"
					onSubmit={handleOnSubmit}
				>
					<div className="flex gap-x-2 w-[100%]">
						<input
							onChange={handleOnChange}
							className="bg-[#222222] h-[50px] pl-3 text-[#ffff] w-[49%] sm:w-[47%]"
							type="text"
							name="firstname"
							placeholder="First Name"
							value={formData.firstname}
							required
						/>
						<input
							onChange={handleOnChange}
							className="bg-[#222222] h-[50px] pl-3 text-[#ffff] w-[49%] sm:w-[47%]"
							type="text"
							name="lastname"
							placeholder="Last Name"
							value={formData.lastname}
							required
						/>
					</div>
					<div>
						<input
							onChange={handleOnChange}
							className="bg-[#222222] h-[50px] pl-3 text-[#ffff] w-[100%] sm:w-[96.3%]"
							type="email"
							name="email"
							placeholder="Email"
							value={formData.email}
							required
						/>
					</div>
					<div className="relative flex flex-col gap-y-3">
						<input
							onChange={handleOnChange}
							className="bg-[#222222] h-[50px] pl-3 text-[#ffff] w-[100%] sm:w-[96.3%]"
							type={"password"}
							name="password"
							placeholder="Password"
							value={formData.password}
							required
						/>

						{/* <button onCli type="button">
              <BsEmojiExpressionless className='text-[#fff] absolute top-3 right-6 w-[30px] h-[25px]' />
            </button> */}
					</div>
					<button
						className="w-[100%] border-2 sm:w-[96.3%] h-[50px] font-bold text-[#121418] tracking-wide text-[17px] relative"
						type="submit"
					>
						<div className="absolute -top-[53px] left-[29.5%] sm:-top-[53px] sm:left-[87px]">
							<lottie-player
								src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json"
								background="transparent"
								speed="1"
								style={{ width: "200px", height: "160px" }}
								loop
								autoplay
							></lottie-player>
						</div>
						<p className="text-[#fff]">Register</p>
					</button>
					<div className="w-full flex items-center justify-center">
						Existing User? <Link href="/login" className="underline px-1"> Click here </Link> to login
					</div>
				</form>
			</div>
		</div>
	);
}

export default Regsiter;
