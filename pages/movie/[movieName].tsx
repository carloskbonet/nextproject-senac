import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/movie.module.css'


export default function movie({ movieName }: any) {
    const [data, setData]:any = useState(undefined);

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
                <div className={styles.container}>
                    <Link href={`/`}>Voltar para a página inicial</Link>


                    <div>
                        <h1>{data.name}</h1>
                        <br />
                        <p>{data.releaseDate}</p>
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