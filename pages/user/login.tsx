import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function loginPage() {
    const [ formData , setFormData ] = useState({
        email: '',
        password: ''
    })

    function handleFormEdit(event:any , field:any) {
        setFormData({
            ...formData,
            [field] : event.target.value
        });
    }

    async function formSubmit(event:any) {
        try {
            event.preventDefault();

            const response = await fetch(`/api/actions/user/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const responseJson = await response.json();

            console.log(responseJson);
            console.log(response.status);

        }
        catch (err) {

        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Head>
                <title>Login</title>
            </Head>

            <div className="form-Card">
                <form onSubmit={formSubmit}>

                    <input type="email" placeholder="Email" value={formData.email}
                    onChange={(event) => handleFormEdit(event , 'email')} required />

                    <br />

                    <input type="password" placeholder="Senha" value={formData.password}
                    onChange={(event) => handleFormEdit(event , 'password')} required />

                    <br />
                    <button>Enviar</button>
                </form>

                <Link href={`/user/cadastro`}>Criar Conta</Link>
            </div>
        </main>
    );
}