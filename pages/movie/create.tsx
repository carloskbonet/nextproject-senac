import { useState, useEffect } from 'react'
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/login.module.css"
import { getCookie } from 'cookies-next';
import { checkToken } from '@/services/tokenConfig';

export default function createMovie() {
    const [imageUploaded, setImageUploaded] = useState(undefined);
    const [data, setData]: any = useState();
    const [formData, setFormData] = useState({
        name: '',
        releaseDate: ''
    });

    var selectedGenres: Array<number> = [];

    function handleCheckboxEdit(event:any , genreId:number) {
        console.log(event.target.checked);

        if (event.target.checked == true) {
            selectedGenres.push(Number(genreId));
        }
        else {
            const index = selectedGenres.indexOf(Number(genreId));

            if (index != undefined) {
                selectedGenres.splice(index , 1);
            }
        }
    }

    async function fetchData() {
        try {
            const response = await fetch(`/api/actions/genre/select`, {
                method: "GET"
            });

            const responseJson = await response.json();

            setData(responseJson);

        }
        catch (err: any) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchData();

    }, [])

    function handleImageUploadedEdit(event: any) {
        setImageUploaded(event.target.files[0]);
    }

    function handleFormEdit(event: any, name: string) {
        setFormData({
            ...formData,
            [name]: event.target.value
        });
    }

    async function formSubmit(event: any) {
        event.preventDefault();
        
        if (imageUploaded == undefined) {
            return;
        }

        try {
            const img = new FormData();
            img.append("image", imageUploaded);
            
            const response = await fetch(`/api/actions/movie/createImage`, {
                method: "POST",
                body: img
            });

            const responseJson = await response.json();

            if (response.status != 200) {
                throw new Error(responseJson.message);
            }

            createMovie(responseJson.secure_url);

        }
        catch (err:any) {
            alert(err.message);
        }
    }

    async function createMovie(imgURL: string) {
        try {
            const response = await fetch(`/api/actions/movie/create`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    releaseDate: formData.releaseDate,
                    genres: selectedGenres,
                    image: imgURL
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

                    <br /> <br />

                    <input onChange={handleImageUploadedEdit} type="file" accept='.jpg, .jpeg, .png, .gif' />

                    <br /> <br />

                    <div className="z-10 w-48 bg-white rounded-lg shadow dark:bg-gray-700">
                        <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                            {data != undefined && data instanceof Array

                                ?

                                data.map(item => (
                                    <li>
                                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input onChange={(event) => {handleCheckboxEdit(event, item.id)}} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{item.name}</label>
                                        </div>
                                    </li>
                                ))

                                :

                                <div></div>

                            }
                        </ul>
                    </div>

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