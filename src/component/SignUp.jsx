import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase'
import LoopIcon from '@mui/icons-material/Loop';
import Alert from '@mui/material/Alert';

const signup = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up:", userCredential.user);
    } catch (error) {
        console.error("Signup error:", error.message);
    }
};

export default function SignUp({ open, onClose }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [status, setStatus] = useState("empty")
    const [errorMessage, setErrorMessage] = useState("");


    const handleChange = (setter) => (e) => {
        setter(e.target.value);

        if (email !== '' && password !== '') {
            setStatus('typing');
        } else {
            setStatus('empty');
        }
    };

    const handleSignup = async () => {
        if (!email || !password) {
            alert('Email and Password required!')
            return;
        }

        setStatus('submitting');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Update user profile with display name
            const displayName = `${firstName} ${lastName}`.trim();
            await updateProfile(userCredential.user, {
                displayName: displayName
            });
            
            setStatus('success');
            setTimeout(() => {
                onClose();
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setStatus("empty");
            }, 1500);
            console.log("User signed up:", userCredential.user);
        } catch (error) {
            setErrorMessage(error.message);
            setStatus('error');
        }
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Signup</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="First Name"
                    name="firstName"
                    fullWidth
                    onChange={handleChange(setFirstName)}
                    disabled={status === 'submitting'}
                />
                <TextField
                    margin="dense"
                    label="Last Name"
                    name="lastName"
                    fullWidth
                    onChange={handleChange(setLastName)}
                    disabled={status === 'submitting'}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    onChange={handleChange(setEmail)}
                    disabled={status === 'submitting'}
                />
                <TextField
                    margin="dense"
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    onChange={handleChange(setPassword)}
                    disabled={status === 'submitting'}
                />
                {status === 'error' && <Alert severity="error">{errorMessage}</Alert>}
            </DialogContent>
            <DialogActions>
                    <>
                        <Button onClick={onClose} disabled={status === "submitting"}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSignup}
                            disabled={status === "empty" || status === "submitting"}
                        >
                            {status === "submitting" ? (
                                <LoopIcon size={24} />
                            ) : (
                                "Signup"
                            )}
                        </Button>
                    </>
            </DialogActions>
        </Dialog>
    );
}