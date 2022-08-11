import { initializeApp} from "firebase/app";

import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut
} from "firebase/auth";

import { 
	getFirestore,
	query,
	getDocs,
	collection,
//	where,
	addDoc,
//	serverTimeStamp, 
	orderBy,
	limit
} from "firebase/firestore";

import { 
//	getStorage, 
//	ref, 
//	uploadBytesResumable, 
//	getDownloadURL 
} from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCQP1enm2Ga2a7x-_7Q_5NMISwGRPzzK0M",
	authDomain: "wbt-instagram-clone.firebaseapp.com",
	projectId: "wbt-instagram-clone",
	storageBucket: "wbt-instagram-clone.appspot.com",
	messagingSenderId: "572053505014",
	appId: "1:572053505014:web:f64ff861f4e371ba1e7dd7",
	measurementId: "G-X7LL3SY85S"
};

const app = initializeApp(firebaseConfig);


////////////////////////Authentication////////////////////////
const auth = getAuth(app);


const logInWithEmailAndPassword = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
		console.error(err);
		alert(err.message)
	}
};


const registerWithEmailAndPassword = async (userInfos) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, userInfos.email, userInfos.password);
		const user = res.user;
		await addDoc(collection(db, "users"), {
			uid: user.uid,
			fullName: userInfos.fullName,
			userName: userInfos.userName,
			authProvider: "local",
			email: userInfos.email,
		});
		alert("Register")
	} catch (err) {
		console.error(err);
		alert(err.message)
	}
};


const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		alert("Password reset link sent!");
	} catch (err) {
		console.error(err);
		alert(err.message)
	}
};


const logout = () => {
	signOut(auth);
};


////////////////////////Storage////////////////////////
const db = getFirestore(app);
//const storage = getStorage(app);

const updatePosts = function (setPosts) {
	const postsRef = collection(db, "posts");
	const q = query(postsRef, orderBy("timesetamp"), limit(10));
	
	const getData = async () => {
		const querySnapshot = await getDocs(q);
		setPosts(querySnapshot.docs.map(function(document){
			return {url: document.data().url, commit: document.data().commit}
		}))
	
	}
	getData();
}




export {
	auth,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logout,
	
	db,
	updatePosts,

}
