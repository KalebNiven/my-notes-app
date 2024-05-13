import React, { useState } from 'react';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { signin } from '../services/user';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa'; // Ensure you have 'react-icons' installed


export interface SigninPayload {
    email: string;
    password: string;
}

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [isSubmitDisabled, setSubmitDisabled] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSubmitDisabled(true);
        try {
            const res = await signin({ email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.id);
            if (keepLoggedIn) {
                localStorage.setItem('keepLoggedIn', 'true');
            }
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('An error occurred');
            setSubmitDisabled(false);
        }
    };

    return (
        <div className='d-flex justify-content-center form-container'>
            <h3 className="text-center text-2xl font-bold mb-8">Login</h3>
            <form onSubmit={handleSubmit} className="flex w-350 flex-col gap-4">
                <div className="input-icon">
                    <FaUser />
                    <TextInput value={email} onChange={e => setEmail(e.target.value)} id="email1" type="email" placeholder="Email address" required />
                </div>
                <div className="input-icon">
                    <FaLock />
                    <TextInput value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" placeholder='Password' required />
                </div>
                <div className="flex justify-between items-center mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox checked={keepLoggedIn} onChange={() => setKeepLoggedIn(!keepLoggedIn)} />
                        <span className="text-sm text-gray-600">Keep me logged in</span>
                    </label>
                    <a href="#" className="text-sm text-blue-500 hover:text-blue-700">Forgot Password?</a>
                </div>
                <Button disabled={isSubmitDisabled} type="submit">Login</Button>
            </form>
        </div>
    );
}

export default SignIn