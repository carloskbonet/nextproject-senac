import { useState } from 'react'
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/login.module.css"
import { getCookie } from 'cookies-next';
import { checkToken } from '@/services/tokenConfig';

export default function createMovie() {
    const [formData , setFormData] = useState({
        name: '',
        releaseDate: ''
    });

    function handleFormEdit(event: any , name: string) {
        setFormData({
            ...formData,
            [name] : event.target.value
        });
    }

    async function formSubmit(event: any) {
        event.preventDefault();

        try {
            const response = await fetch(`/api/actions/movie/create`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const responseJson = await response.json();

            if (response.status != 200) {
                throw new Error(responseJson.message);
            }

            alert("Movie created.");
        }
        catch (err:any) {
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
                    value={formData.name} onChange={(event) => handleFormEdit(event , "name")} />

                    <br />

                    <input className={styles.input} type="date"
                    value={formData.releaseDate} onChange={(event) => handleFormEdit(event, "releaseDate")} />

                    <input className={styles.input} type="file" accept='image/jpeg, image/png , image/jpg' />

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