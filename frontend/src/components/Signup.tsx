import React, { useState } from 'react';
import { Button, TextInput, Checkbox } from "flowbite-react";
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { signup } from '../services/user';
// Define the SignupType interface
export interface SignupType {
    username: string;
    email: string;
    password: string;
}

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!isValidPassword(password)) {
            // alert('Password must be at least 8 characters long and include a number.');
            return;
        }

        if (!termsAccepted) {
            alert("You must accept the terms and conditions to proceed.");
            return;
        }

        try {
            // Assume a function `signup` exists for submitting the form
            const response = await signup({ username, email, password });
            alert('Signup successful! Redirecting to login...');
            navigate('/signin'); // adjust the route as needed
        } catch (err) {
            console.error('Signup error', err);
            alert('Failed to create account. Please try again.');
        }
    };

    const isValidEmail = (email: string) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const isValidPassword = (password: string) => {
        return /\d/.test(password);
    };

    return (
        <div className='d-flex justify-content-center form-container'>
            <h3 className="text-center text-2xl font-bold mb-8">Signup</h3>
            <form onSubmit={handleSubmit} className="flex w-350 flex-col gap-4">
                <div className="input-icon">
                    <FaUser />
                    <TextInput value={username} onChange={e => setUsername(e.target.value)} id="username" type="text" placeholder="Username" required />
                </div>
                <div className="input-icon">
                    <FaEnvelope />
                    <TextInput value={email} onChange={e => setEmail(e.target.value)} id="email" type="email" placeholder="Email address" required />
                </div>
                <div className="input-icon">
                    <FaLock />
                    <TextInput value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" placeholder='Password' required />
                </div>
                <div>
                    <Checkbox checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />
                    <span>I agree to the <a href="/terms" target="_blank">Terms and Conditions</a></span>
                </div>
                <Button type="submit" disabled={!termsAccepted || !password || email === '' || username === ''}>Submit</Button>
            </form>
        </div>
    );
}

export default Signup;
