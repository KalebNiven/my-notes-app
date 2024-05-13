import React, { useState } from 'react';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { signup } from '../services/user';

export interface SignupType {
    username: string;
    email: string;
    password: string;
}

function Signup() {

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setpassword] = useState<string>('');
    const [isSubmitDisabled, setSubmitDisabled] = useState<boolean>(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSubmitDisabled(true);

        try {
            const res = await signup({ username, email, password });
            setSubmitDisabled(false);
            
        } catch (err) {
            alert('An error occured');
            setSubmitDisabled(false);
        }
    }

    return (
        <div className='d-flex justify-content-center'>
            <h3 className="text-center text-3xl font-bold mb-8">Signup</h3>
            <form onSubmit={handleSubmit} className="flex w-350 flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="username" value="Username" />
                    </div>
                    <TextInput value={username} onChange={e => setUsername(e.target.value)} id="username" type="text" placeholder="alex" required />
                </div>
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
                <Button disabled={isSubmitDisabled} type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default Signup