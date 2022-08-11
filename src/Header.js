import {auth, 
        db,
        storage,
        ref, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        uploadBytesResumable,
        getDownloadURL
    } from "./firebase.js";

import {useState, useEffect} from "react";


export default function Header(props) {

    const [progress, setProgress] = useState(null);
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [posts, setPosts] = useState(null);

    

    useEffect(() =>{
        const postsRef = collection(db, "posts");
        const q = query(postsRef, orderBy("timesetamp"), limit(10));
        
        const getData = async () => {
            const querySnapshot = await getDocs(q);
            setPosts(querySnapshot.docs.map(function(document){
                return {url: document.data().url, commit: document.data().commit}
            }))
        
        }
        getData();
    }, [])


    function createAcount(e){
        e.preventDefault();

        let username = document.getElementById("username-create").value;
        let email = document.getElementById("email-create").value;
        let password = document.getElementById("password-create").value;

        createUserWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName:username
            })
            alert("User created successfully");
        }).catch((error)=>{
            alert(error.message)
        })

    }


    function upload(e){
        e.preventDefault();
        let commit = document.getElementById("commit-upload").value;
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("stage_changed", (snapshot) => {
            const progress = Math.round(snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            setProgress(progress)
        }, (error) => {
            console.log(error)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                try {
                    const docRef = await addDoc(collection(db, "posts"), {
                        commit: commit,
                        url: url,
                        username: props.user,
                        timesetamp: serverTimestamp()
                    })
                } catch (error){
                    console.error("Error adding document: ", error);
                } 

                setProgress(0);
                setFile(null);

                alert("Upload completed successfully");

                document.getElementById("form-upload").reset();
            })
        })
    }
    

    return (
        <div className="header">
            <div className="logo">
                <h1>Instagram</h1>
            </div>
            {
            (props.user)?
            <div className="loged-user">
                <p>Hello <b>{props.user}</b></p>
                <span onClick={(e)=>openModalUpload(e)}>Postar</span>
            </div>
            :
            <div className="login">
                <form onSubmit={(e)=>{login(e)}}>
                    <input id="email-login" type="text" placeholder="Login"/>
                    <input id="password-login" type="password" placeholder="Password"/>
                    <input type="submit" name="acao" value="Login"/>
                </form>
                <div className="create-acount">
                    <span>New account</span>
                </div>
            </div>
            }
            <div className="modalCreate">
                <form onSubmit={(e)=>createAcount(e)}>
                    <input id="username-create" type="text" placeholder="Username" />
                    <input id="email-create" type="text" placeholder="Email" />
                    <input id="password-create" type="password" placeholder="Password"/> 
                    <input type="submit" name="create" value="Create"/>
                </form>
            </div>
            <div className="modalUpload">
                <form onSubmit={(e)=>upload(e)} id="form-upload">
                    <input onChange={(e)=>setFile(e.target.files[0])} type="file" name="file"/>
                    <textarea id="commit-upload" placeholder="Commit"></textarea>
                    <input type="submit" value="Upload"/>
                    <progress id="progress-upload" value={progress}></progress>
                </form>
            </div>
            <div className="posts" style={{maxWidth:1024}}>
                <button type="button" id="getPosts" style={{width:200, height:100}}>Show posts</button>
                {   
                    (posts)?
                    posts.map(function(val){
                        return (
                            <div className="postSingle">
                                <img src={val.url}/>
                                <p>{val.commit}</p>
                            </div>
                        )
                    })
                    :
                    <h1>Nothing here</h1>
            
                }
            </div>
        </div>
        )
}