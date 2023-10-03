import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { checkToken } from "@/services/tokenConfig";
import styles from "@/styles/login.module.css";

export default function loginPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    function handleFormEdit(event: any, field: any) {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    }

    async function formSubmit(event: any) {
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

            if (response.status != 200) {
                throw new Error(responseJson.message);
            }

            setCookie('authorization', responseJson.token);

            router.push(`/`);
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Head>
                <title>Login</title>
            </Head>

            <div className={styles.formCard}>
                <form onSubmit={formSubmit}>

                    <input className={styles.input} type="email" placeholder="Email" value={formData.email}
                        onChange={(event) => handleFormEdit(event, 'email')} required />

                    <br />

                    <input className={styles.input} type="password" placeholder="Senha" value={formData.password}
                        onChange={(event) => handleFormEdit(event, 'password')} required />

                    <br />
                    <button className={styles.button} >Enviar</button>
                </form>

                <Link className={styles.sendButton} href={`/user/cadastro`}>Criar Conta</Link>
            </div>
        </main>
    );
}

export function getServerSideProps({ req, res }: any) {
    try {
        const token = getCookie('authorization', { req, res });

        if (!token) {
            throw new Error('Invalid token');
        }

        checkToken(token);

        return {
            redirect: {
                permanent: false,
                destination: `/`,
            },
            props: {}
        };
    }
    catch (err) {
        return {
            props: {}
        }
    }
}