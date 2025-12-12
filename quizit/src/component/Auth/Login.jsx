import {TextField,Button,Paper,Box,Typography,Stack } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { loginHandler } from "../services/authServices";
import { useNavigate } from "react-router-dom";
export const AuthLogin = () => {
    const navigate = useNavigate()
    const { username, password, emailId, authDispatch } = useAuth();
    console.log({ username, password, emailId});
    const handleUserNameChange = (e) => {
        authDispatch({
            type: "USERNAME",
            payload: e.target.value,
        });
    };
    const handlePasswordChange = (e) => {
        authDispatch({
            type: "PASSWORD",
            payload: e.target.value,
        });
    };
    const handleEmailChange = (e) => {
        e.preventDefault();
        authDispatch({
            type: "EMAILID",
            payload: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = loginHandler(username,password,emailId)
        if (token){
            navigate("/")
        }
        authDispatch({
            type: "TOKEN",
            payload: token
        })
        authDispatch({
            type: "CLEAR_CREDENTIALS"
        })
    };
    const handleTestCredentials = () => {
        const token = loginHandler("sameehataha","st12345","st@gmail.com")
        authDispatch({
            type: "TOKEN",
            payload: token
        })
        if (token){
            navigate("/")
        }
    }
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#9dc3e9ff",
                padding: 2,
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    padding: 4,
                    borderRadius: 4,
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Typography
                        variant="h4"
                        textAlign="center"
                        fontWeight={600}
                        gutterBottom
                    >
                        Login
                    </Typography>
                    <Stack spacing={3}>
                        <TextField
                            label="Username"
                            placeholder="sameeha taha"
                            fullWidth
                            onChange={handleUserNameChange}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="*******"
                            fullWidth
                            onChange={handlePasswordChange}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="st@gmail.com"
                            fullWidth
                            onChange={handleEmailChange}
                            required
                        />
                        <Button type="submit" variant="contained" size="large" fullWidth>
                            Login
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            fullWidth
                            onClick={handleTestCredentials}
                        >
                            Login with Test Credentials
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};
