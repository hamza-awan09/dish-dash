import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    DialogActions,
    CircularProgress,
    Alert,
    Snackbar
} from "@mui/material";
import { useAuth } from "../context/Auth";

export default function Login({ open, onClose, onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("idle"); // idle, submitting, success, error
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Email and password are required");
            setStatus("error");
            return;
        }

        setStatus("submitting");
        const result = await login(email, password);
        
        if (result.success) {
            setStatus("success");
            // Close the dialog after successful login
            setTimeout(() => {
                onClose();
                setEmail("");
                setPassword("");
                setStatus("idle");
                if (onLoginSuccess) {
                    onLoginSuccess();
                }
            }, 1000);
        } else {
            setError(result.error || "Failed to login. Please try again.");
            setStatus("error");
        }
    };

    const handleCloseError = () => {
        setError("");
        setStatus("idle");
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} component="form" onSubmit={handleSubmit}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent sx={{ minWidth: 400, pt: 2 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "submitting"}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={status === "submitting"}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button 
                        onClick={onClose} 
                        disabled={status === "submitting"}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="contained" 
                        type="submit"
                        disabled={status === "submitting"}
                        endIcon={status === "submitting" ? <CircularProgress size={20} /> : null}
                    >
                        {status === "submitting" ? "Logging in..." : "Login"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar 
                open={status === "error"} 
                autoHideDuration={6000} 
                onClose={handleCloseError}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
}