import React, { useState, useEffect } from "react";
import "./App.css";
import "./components/Header.css";
import Header from "./components/Header";
import Post from "./components/Post";
import { db } from "./config/fire";
import ImageUpload from "./components/ImageUpload";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Input } from "@material-ui/core";
import { auth } from "./config/fire";

const logoUrl =
  "https://aturquoise.com/wp-content/uploads/2019/10/instagram-1581266_1920.jpg";

//modal parametrs
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  //modal state
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [openAddpost, setOpenAddpost] = React.useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //add post
  const handleCloseopenAddpost = () => {
    setOpenAddpost(false);
  };

  const handleopenopenAddpost = () => {
    setOpenAddpost(true);
  };

  const signup = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, pass)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: user,
        });
        alert("Youre Ccount Has been created...");
        setOpen(false);
      })
      .catch((err) => alert(err.message));
  };

  //sign out
  const signout = () => {
    if (window.confirm("AAre you sure ....?")) {
      auth.signOut();
    }
  };

  //handl sign in
  const handleCloseSignIn = () => {
    setOpenSignIn(false);
  };
  //login
  const login = (e) => {
    e.preventDefault();
    console.log("lOGIN");

    auth
      .signInWithEmailAndPassword(email, pass)
      .then((authUser) => {
        alert("welcome ....");
      })
      .catch((err) => alert(err));
    setOpenSignIn(false);
  };

  useEffect(() => {
    const unsbscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      //perfom some cleanup actions
      unsbscribe();
    };
  }, [user, username]);

  //state hooks
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }));
        setPosts(data);
      });
  }, [posts]);

  return (
    <div className="App">
      {/* header */}
      <div className="header">
        <img className="header__image" src={logoUrl} alt="instagram" />

        {/* modal RJX */}

        <div className="header__signup">
          {/* sign up button */}
          {user ? (
            <Button type="button" onClick={signout}>
              Logout
            </Button>
          ) : (
            <div className="header__loginConatainer">
              <Button type="button" onClick={handleOpen}>
                Sign Up
              </Button>
              <Button type="button" onClick={() => setOpenSignIn(true)}>
                Sign In
              </Button>
            </div>
          )}
        </div>
        {/* SIGN UP MODAL */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <p id="transition-modal-description">
                <form className="header__signup">
                  <center>
                    <img className="header__authImage" src={logoUrl} alt="" />

                    <br />
                    <Input
                      type="text"
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <br />
                    <Input
                      type="text"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />

                    <Input
                      type="text"
                      placeholder="password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                    />
                    <br />
                    <Button onClick={signup}>Register</Button>
                  </center>
                </form>
              </p>
            </div>
          </Fade>
        </Modal>

        {/* SIGN IN MODAL */}

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openSignIn}
          onClose={handleCloseSignIn}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openSignIn}>
            <div className={classes.paper}>
              <p id="transition-modal-description">
                <form className="header__signup">
                  <center>
                    <img className="header__authImage" src={logoUrl} alt="" />
                    <br />
                    <Input
                      type="text"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />

                    <Input
                      type="text"
                      placeholder="password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                    />
                    <br />
                    <Button onClick={login}>Login</Button>
                  </center>
                </form>
              </p>
            </div>
          </Fade>
        </Modal>
      </div>
      {/* end header */}

      {/* Add post */}

    {user?.displayName?(
      <Button className="app__addpost" onClick={handleopenopenAddpost}>
        Add Post
      </Button>
    ):(<div></div>)}
      {/* ADD POST MODAL MODAL */}
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openAddpost}
        onClose={handleCloseopenAddpost}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openAddpost}>
          <div className={classes.paper}>
            <p id="transition-modal-description">
              {/* uploade section > captio + file + button  */}
              {user?.displayName ? (
                <ImageUpload username={user.displayName} />
              ) : (
                <div></div>
              )}
            </p>
          </div>
        </Fade>
      </Modal>

      {/* postes mapping */}
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          postId={id}
          user={user}
          imageUrl={post.imageUrl}
          username={post.username}
          caption={post.caption}
        />
      ))}
    </div>
  );
}

export default App;
