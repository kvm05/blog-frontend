const Modal = (props) => {
	return (
		<div role={"modal"} className="">
			<div className="opacity-80 w-full h-[100vh] overflow-hidden bg-blackShade-50 z-10 absolute top-0 left-0 font-display"></div>
			<div className="rounded-md bg-tertiarywhite-100 z-50 absolute top-[15%] left-[27.5%] w-[45%] max-h-[70%]  shadow-inner overflow-y-auto bg-[#000] border-2">
				<div className="flex flex-col mb-2 rounded-md">
					<div className="flex  w-full justify-between items-baseline bg-tertiaryblue-50 rounded-t-md">
						<h1 className="text-tertiarywhite-100 font-bold text-xl px-4 py-3 ">
							{props.title}
						</h1>
						<span
							className="font-semibold text-lg mx-3 px-3 py-[3px]  rounded-full border bg-tertiarywhite-100 cursor-pointer"
							onClick={props.closeHandler}
						>
							X
						</span>
					</div>

					<div className="my-5">{props.children}</div>
					
					
				</div>
			</div>
		</div>
	);
};
export default Modal;