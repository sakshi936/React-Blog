interface childComponent {
	children: React.ReactNode;
}
function Container({ children }: childComponent) {
	return <div className=" w-full max-w-7xl mx-auto px-4">{children}</div>;
}

export default Container;
