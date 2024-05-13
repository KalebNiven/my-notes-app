import React, { useState } from 'react';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { signin } from '../services/user';
import { useNavigate } from 'react-router-dom';

export interface SigninPayload {
    email: string;
    password: string;
}

function SignIn() {

    const [email, setEmail] = useState<string>('');
    const [password, setpassword] = useState<string>('');
    const [isSubmitDisabled, setSubmitDisabled] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSubmitDisabled(true);

        try {
            const res = await signin({ email, password });
            setSubmitDisabled(false);

            // Setting token and userid in local storage... userId can be used while creating a note
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.id);

            navigate('/')
            
        } catch (err) {
            console.log(err)
            alert('An error occured');
            setSubmitDisabled(false);
        }   

    }

    return (
        <div className='d-flex justify-content-center'>
            <h3 className="text-center text-3xl font-bold mb-8">Signin</h3>
            <form onSubmit={handleSubmit} className="flex w-350 flex-col gap-4">

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput value={email} onChange={e => setEmail(e.target.value)} id="email1" type="email" placeholder="name@provider.com" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput value={password} onChange={e => setpassword(e.target.value)} id="password" type="password" required />
                </div>
                <Button disabled={isSubmitDisabled} type="submit">Login </Button>
            </form>
        </div>
    )
}

export default SignIn