"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import BlogContent from "../components/BlogContent";


export default function Blog(){
    const [allBlogs, setAllBlogs] = useState()
    const [blog, setBlog] = useState()
    const [modal, setModal] = useState(false)
    const [edit, setEdit] = useState(false)
    async function getBlogs(){
		try {
			const response = await axios.get("http://localhost:5000/api/blog");
			setAllBlogs(response.data);
		} catch (error) {
			console.log(error);
		}
	};
    async function deleteBlog(){
        try {
            const response = await axios.delete(
				`http://localhost:5000/api/blog/${blog?._id}`
			);
            getBlogs();
        } catch (error) {
            console.log(error)
        }
    }
    function closeModal(){
        setModal(false)
    }
    useEffect(() => {
        getBlogs()
    },[])
    return (
		<div className="text-[#fff] w-full h-full flex flex-col px-10 py-5 space-y-5">
			{modal && (
				<>
					{edit ? (
						<Modal title="Edit Blog" closeHandler={closeModal}>
							<BlogContent
								title={blog.title}
								content={blog.content}
								id={blog._id}
								setModal={setModal}
								getBlogs={getBlogs}
								edit={edit}
							/>
						</Modal>
					) : (
						<Modal title="Create Blog" closeHandler={closeModal}>
							<BlogContent
								title=""
								content=""
								id=""
								setModal={setModal}
								getBlogs={getBlogs}
								edit={edit}
							/>
						</Modal>
					)}
				</>
			)}
			<div className="flex items-center justify-between text-3xl w-full">
				Blogs
				<button className="rounded-full border-2 w-10 my-auto" onClick={() => {
                    setModal(true)
                }}>
					+
				</button>
			</div>
			<div className="w-full grid grid-cols-3 gap-5">
				{allBlogs?.map((blog) => {
					return (
						<div className="border-2 rounded-md p-3 flex flex-col space-y-3">
							<div className="text-xl font-semibold">
								{blog.title}
							</div>
							<div className="">{blog.content}</div>
							<div className="flex w-full justify-between">
								<button
									className="px-2 py-1 border-2 rounded-sm"
									onClick={() => {
										setModal(true);
										setBlog(blog);
									}}
								>
									Edit
								</button>
								<button
									className="px-2 py-1 border-2 rounded-sm"
									onClick={() => {
										setBlog(blog);
										deleteBlog();
									}}
								>
									Delete
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}