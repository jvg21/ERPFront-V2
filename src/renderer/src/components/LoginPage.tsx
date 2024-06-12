import { useState } from "react";
import { FormButton, FormInput, FormLabel } from "./layout/form/FormComponents";


export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        localStorage.setItem("USER_DATA", "adm@adm.com")
        localStorage.setItem("AUTH_TOKEN", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkFkbSIsImVtYWlsIjoiYWRtQGFkbS5jb20iLCJyb2xlIjoiQSIsIm5hbWVpZCI6IjEiLCJuYmYiOjE3MTgxNjE3NDQsImV4cCI6MTcxODE3MjU0NCwiaWF0IjoxNzE4MTYxNzQ0fQ.dvfC3DghHmwgtpyycQkY0MRVDy48To1mtpfnrIaE_0s")
        window.location.reload()
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <FormLabel>Email:</FormLabel>
                    <FormInput
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <FormLabel>Senha:</FormLabel>
                    <FormInput
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <FormButton type="submit">Login</FormButton>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    )
}