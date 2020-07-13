import React, { useState } from "react";
import "./Header.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Input } from "@material-ui/core";
import { auth } from "../config/fire";
import { useEffect } from "react";

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

function Header() {
  //modal state
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSignIn, setOpenSignIn] = React.useState(false);
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

  return (
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
  );
}

export default Header;
