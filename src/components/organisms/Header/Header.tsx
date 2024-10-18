import { Container, Logo, LogoutBtn } from "../../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";

interface NavItem {
	name: string;
	slug: string; // route url
	active: boolean;
}

function Header() {
	const authStatus = useSelector((state: RootState) => state.auth.status);
	const navigate = useNavigate();

	const navItems: NavItem[] = [
		{
			name: "Home",
			slug: "/",
			active: true,
		},
		{
			name: "Login",
			slug: "/login",
			active: !authStatus,
		},
		{
			name: "Signup",
			slug: "/signup",
			active: !authStatus,
		},
		{
			name: "All Posts",
			slug: "/all-posts",
			active: authStatus,
		},
		{
			name: "Add Post",
			slug: "/add-post",
			active: authStatus,
		},
	];

	return (
		<header className="">
			<Container>
				<nav className="flex">
					<div className="mr-4">
						<Link to="/">
							<Logo width="70px" />
						</Link>
					</div>

					<ul className="flex ml-auto">
						{navItems.map((item) =>
							item.active ? (
								<li key={item.name}>
									<button onClick={() => navigate(item.slug)} className="inline-block px-6 py-2 duration-200 hover:bg-blue-400 rounded-full">
										{item.name}
									</button>
								</li>
							) : null
						)}
						{authStatus && (
							<li>
								<LogoutBtn />
							</li>
						)}
					</ul>
				</nav>
			</Container>
		</header>
	);
}

export default Header;
