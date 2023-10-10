import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/movie.module.css'


export default function movie({ movieName }: any) {
    const [data, setData]: any = useState(undefined);

    async function fetchData() {
        const response = await fetch(`/api/actions/movie/find?name=` + movieName, {
            method: 'GET'
        });

        const responseJson = await response.json();

        setData(responseJson);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main className='flex min-h-screen flex-col'>
            {data != undefined ?
                <div>
                    <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
                        <Link href={`/`} className="text-sm text-gray-400 hover:text-gray-500">Home</Link>

                        <a className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" href="#">Sign In</a>
                        <a className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" href="#">Sign up</a>
                    </nav>

                    <div className={styles.body}>
                        <div className={styles.imageAndInfos}>
                            <img src={data.imageURL} className={styles.movieImg} />

                            <div className={styles.container}>
                                <h1>{data.name}</h1>
                                <br />
                                <p>{data.releaseDate}</p>
                                <br />
                                <p>Nota: 0</p>
                            </div>
                        </div>

                        <div className={styles.comments}>
                            <h1>Comentários</h1>

                            {data.ratings.map(rating => (
                                <div className={styles.singleComment}>
                                    <label>UserName: Nome do usuário que avaliou</label>
                                    <br />
                                    <label>Nota: {rating.value}</label>
                                    <br />
                                    <label>Comentário: Ainda não tem</label>
                                </div>
                            ))}

                        </div>
                    </div>


                </div>
                : <p>Movie not found</p>}
        </main>
    );
}

export function getServerSideProps(context: any) {
    const { movieName } = context.query;

    return {
        props: { movieName }
    }
}