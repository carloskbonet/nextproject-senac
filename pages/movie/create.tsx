import { useState } from 'react'
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/login.module.css"
import { getCookie } from 'cookies-next';
import { checkToken } from '@/services/tokenConfig';

export default function createMovie() {
    const [formData, setFormData] = useState({
        name: '',
        releaseDate: '',
        image: ''
    });
    const [imageUploaded, setImageUploaded] = useState();

    function handleFormEdit(event: any, name: string) {
        setFormData({
            ...formData,
            [name]: event.target.value
        });
    }

    function handleFormImage(event: any) {
        setImageUploaded(event.target.files[0])
    }

    async function formSubmit(event: any) {
        event.preventDefault();

        if (!imageUploaded) return;

        try {
            const img = new FormData();
            img.append("image", imageUploaded);

            const response = await fetch(`/api/actions/movie/createImage`, {
                method: "POST",
                body: img
            })

            const responseJson = await response.json();

            console.log(responseJson);

            fetchCreateMovie(responseJson.secure_url);
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    async function fetchCreateMovie(imageURL: string) {
        try {
            const response = await fetch(`/api/actions/movie/create`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    releaseDate: formData.releaseDate,
                    image: imageURL
                })
            });

            const responseJson = await response.json();

            if (response.status != 200) {
                throw new Error(responseJson.message);
            }

            alert("Movie created.");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Head>
                <title>Cadastrar Filme</title>
            </Head>

            <div className={styles.formCard}>
                <Link className={styles.sendButton} href={`/`}>Voltar</Link>

                <form onSubmit={formSubmit}>

                    <input className={styles.input} type="text" placeholder="Nome do filme"
                        value={formData.name} onChange={(event) => handleFormEdit(event, "name")} />

                    <br />

                    <input className={styles.input} type="date"
                        value={formData.releaseDate} onChange={(event) => handleFormEdit(event, "releaseDate")} />

                    <br />

                    <input onChange={handleFormImage} type="file" accept='.jpg, .png, .gif, .jpeg' />

                    <button className={styles.button}>Enviar</button>
                </form>
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

        return { props: {} };
    }
    catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: `/user/login`,
            },
            props: {}
        }
    }
}