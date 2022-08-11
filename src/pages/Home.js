import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { auth, logout, updatePosts} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import '../styles/Home.css';

import instagramName from "../images/instagramName.png"
import postIcon from "../images/flaticons/more.png"
import perfilIcon from "../images/flaticons/perfil.png"
import exitIcon from "../images/flaticons/exit.png"
import menuIcon from "../images/flaticons/menu.png"

function Home() {
    const [user, loading] = useAuthState(auth);
	const [posts, setPosts] = useState("")
    const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/");
		}
	}, [user])

	useEffect(() => {
		updatePosts(setPosts)
	}, [loading])


	return (  
		<div className="Home">
			<header>
				<div className="center">
					<div className="logo">
						<img src={instagramName} alt="instagram"/>
					</div>
					<div className="search">
						<input type="text" placeholder="Search"/>
					</div>
					<div className="nav">
						<button>
							<img src={postIcon} alt="Post"/>
						</button>
						<button>
							<img src={perfilIcon} alt="Perfil"/>
						</button>
						<button onClick={(e) => {
							e.preventDefault();
							logout();
						}}>
							<img src={exitIcon} alt="Exit"/>
						</button>
					</div>
				</div>
			</header>
			<main>
				<div className="center">
					<div className="feed">
						{
							(posts) ?
							posts.map((post) => {
								return (
									<div className="single-post">
										<div className="single-post-header">
											<div className="single-post-user">
												<img src={perfilIcon} />
												<p>Esdras</p>
											</div>
											<div className="nav-post">
												<img src={menuIcon} />
											</div>
										</div>
										<img src={post.url} />
										<div className="commit">
											<p>{post.commit}</p>	
										</div>
									</div>
								)
							})
							:
							<h1>Nothing here</h1>
						}
					</div>
				</div>
			</main>
		</div>
	);
}

export default Home;
