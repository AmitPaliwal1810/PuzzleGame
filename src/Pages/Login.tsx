import {
  Button,
  Card,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useCallback, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import firebase from "../firebase/firebase-config";
import { UserStore } from "../Store/user.store";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [user, setUser] = useState<unknown | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const updateUserDetails = UserStore((store) => store.updateUserDetails);
  const navigation = useNavigate();

  useEffect(() => {
    const auth = getAuth(firebase);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });
    return () => unsubscribe();
  }, []);

  const SignInWithGoogle = useCallback(async () => {
    const auth = getAuth(firebase);
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      setUser(user);
      console.log({ res: user });
      updateUserDetails({
        name: user.displayName ?? "",
        email: user.email ?? "",
        // accessToken: user?.accessToken ?? "",
        photoURL: user.photoURL ?? "",
        refreshToken: user.refreshToken,
        uid: user.uid,
      });
      navigation("/game");
    } catch (error) {
      console.log(error);
    }
  }, [navigation, updateUserDetails]);

  const handleSignUp = useCallback(async () => {
    const auth = getAuth();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      navigation("/game");
      setUser(user);
      console.log({ signup: user });
    } catch (error) {
      console.log(error);
    }
  }, [email, navigation, password]);

  return (
    <Stack
      sx={{
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        component={Card}
        elevation={4}
        spacing={2}
        alignItems="center"
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 4,
        }}
      >
        <Typography variant="h4">{isLogin ? "Login" : "SignUp"}</Typography>
        <IconButton onClick={SignInWithGoogle}>
          <GoogleIcon />
        </IconButton>
        <Stack
          component="form"
          width={"100%"}
          spacing={2}
          onSubmit={handleSignUp}
        >
          {!isLogin && (
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <TextField
            label="Email"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" type="submit">
            {isLogin ? "Login" : "Signup"}
          </Button>
          <Stack alignItems="flex-end">
            <Button variant="text" onClick={() => setIsLogin((prev) => !prev)}>
              {!isLogin ? "Login" : "signup"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
