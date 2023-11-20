"use client";
import axios from "axios";
import { useState } from "react";

export default function BlogContent({ title, content, id, setModal, getBlogs, edit }) {
	const handleOnChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const [formData, setFormData] = useState({
		title: title,
		content: content,
	});
	const formSubmit = async (e) => {
		e.preventDefault();
		try {
			if(edit){
                const response = await axios.patch(
					`https://blog-backend-p4ud.onrender.com/api/blog/${id}`,
					formData
				);
            }
            else{
                const response = await axios.post(
					"https://blog-backend-p4ud.onrender.com/api/blog",
					{
						title: formData.title,
						content: formData.content,
						creator: localStorage.getItem("user_id"),
					}
				);
            }
            setModal(false)
            getBlogs()
		} catch (error) {
			console.log(error);
		}
	};
    return (
		<div className="px-5 w-full flex items-center justify-center ">
			<form
				onSubmit={formSubmit}
				className="w-full flex flex-col space-y-5 items-center justify-center"
			>
				<div className="w-full flex flex-row space-x-3 justify-center">
					<div className="">Title: </div>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleOnChange}
						className="text-black px-2"
					/>
				</div>
				<div className="w-full flex flex-row space-x-3 justify-center">
					<div className="">Content: </div>
					<input
						type="text"
						name="content"
						value={formData.content}
						onChange={handleOnChange}
						className="text-black px-2"
					/>
				</div>
				<button className="px-2 py-1 border-2" type="submit">Submit</button>
			</form>
		</div>
	);
}
