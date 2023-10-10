import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/movie.module.css'
import stylesHome from '@/styles/home.module.css'
import { getCookie } from 'cookies-next';
import { checkToken } from '@/services/tokenConfig';


export default function movie({ movieName }: any) {
    const [data, setData]: any = useState(undefined);
    const [formRating, setFormRating] = useState({
        value: 0,
        comment: ''
    })

    function handleFormEdit(event: any, name: string) {
        setFormRating({
            ...formRating,
            [name]: event.target.value
        });
    }

    async function formSubmit(event:any) {
        try {
            event.preventDefault();
            
            const cookieAuth = getCookie('authorization');
            const tokenInfos = checkToken(cookieAuth);

            const response = await fetch(`/api/actions/rating/create`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    value: Number(formRating.value),
                    comment: formRating.comment,
                    email: tokenInfos.email,
                    movieName: movieName
                })
            });

            const responseJson = await response.json();

            if ( response.status != 200 ) {
                throw new Error(responseJson.message);
            }

            alert("Rating created");
        }
        catch (err:any) {
            alert(err.message);
        }
    }

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
                    <nav className={stylesHome.navBar}>
                        <Link className={stylesHome.createMovie} href={`/`}>Voltar</Link>


                        <button className={stylesHome.logout}>Log Out</button>

                    </nav>

                    <div className={styles.body}>
                        <div className={styles.imageAndInfos}>
                            <img src="/images/movie.png" className={styles.movieImg} />

                            <div className={styles.container}>
                                <h1>{data.name}</h1>
                                <br />
                                <p>{data.releaseDate}</p>
                                <br />
                                <p>Nota: 0</p>
                            </div>
                        </div>

                        <div className={styles.comments}>
                            <h1>Avalie o Filme</h1>

                            <form onSubmit={formSubmit}>
                                <div className={styles.singleComment}>
                                    <input className={styles.input} type="number" value={formRating.value} 
                                    onChange={(event) => {handleFormEdit(event, 'value')}} />
                                    <br />
                                    <textarea className={styles.input} placeholder='Digite um comentário' value={formRating.comment}
                                    onChange={(event) => {handleFormEdit(event, 'comment')}} />

                                </div>
                            </form>
                        </div>

                        <div className={styles.comments}>
                            <h1>Comentários</h1>

                            {data.ratings.map(rating => (
                                <div className={styles.singleComment}>
                                    <label>UserName: {rating.user.email}</label>
                                    <br />
                                    <label>Nota: {rating.value}</label>
                                    <br />
                                    <label>Comentário: {rating.comment}</label>
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