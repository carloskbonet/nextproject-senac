import { checkToken } from '@/services/tokenConfig';
import { deleteCookie, getCookie } from 'cookies-next'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from "@/styles/home.module.css";

const inter = Inter({ subsets: ['latin'] })

export default function Home( {verifiedToken} : any ) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [data, setData]: any = useState(undefined);
  const [movie, setMovie] = useState({
    name: '',
    releaseDate: '',
    createdAt: '',
    updatedAt: ''
  })

  async function fetchData() {
    const response = await fetch(`/api/actions/movie/select`, {
      method: 'GET'
    });

    const responseJson = await response.json();

    setData(responseJson);
  }

  useEffect(() => {
    fetchData();
  }, [])

  // Remove login cookies
  function logOut() {
    deleteCookie('authorization');
    router.push(`/user/login`);
  }

  // Link the input field with name constant
  function handleFormEdit(event: any) {
    setName(event.target.value);
  }

  // Form action - server req
  async function formSubmit(event: any) {
    try {
      event.preventDefault();

      const response = await fetch(`/api/actions/movie/find?name=` + name, {
        method: 'GET'
      })

      const responseJson = await response.json();

      console.log(response.status);
      console.log(responseJson);

      setMovie({
        ...movie,
        name: responseJson.name,
        releaseDate: responseJson.releaseDate,
        createdAt: responseJson.created_at,
        updatedAt: responseJson.updated_at
      })
      setData(responseJson);
    }
    catch (err) {
      console.log(err);
    }
  }

  function prettifyDateTime(str: string) {
    const [date, time] = str.split("T");
    const [year, month, day] = date.split("-")
    
    return `${day}/${month}/${year}`
  }

  function movieClick(movieName:string) {
    router.push(`/movie/`+ movieName);
  }

  return (
    <main className={`flex min-h-screen flex-col  ${inter.className}`}>
      <nav className={styles.navBar}>
        <Link className={styles.createMovie} href={'/movie/create'}>Criar um filme</Link>

        <form onSubmit={formSubmit}>
          <input className={styles.searchBar} type="text" placeholder='Search bar'
            value={name} onChange={(evento) => { handleFormEdit(evento) }} />
        </form>

        <button className={styles.logout} onClick={logOut}>Log Out</button>

      </nav>

      <div className={styles.gridContainer}>
        {data != undefined && data instanceof Array ?
          data.map(item => (
            <div onClick={() => {movieClick(item.name)}} className={styles.container}>
              <img className={styles.movieImg} src="/images/movie.png" alt="" />
              
              <div className={styles.infos}>
                <h1 id={styles.movieName}>{item.name}</h1>

                <label id={styles.movieReleaseDateLabel}>Data de Lançamento: </label>
                <a id={styles.movieReleaseDate}>{prettifyDateTime(item.releaseDate)}</a>

                {/* <p>{prettifyDateTime(item.created_at)}</p> */}
                {/* <p>{prettifyDateTime(item.updated_at)}</p> */}

              </div>
            </div>
          ))
          : <p>No movies found</p>
        }
      </div>

    </main>
  )
}




export function getServerSideProps({ req, res }: any) {
  try {
    const token = getCookie('authorization', { req, res });

    if (!token) {
      throw new Error('Invalid token');
    }

    const verifiedToken = checkToken(token);

    return { props: { verifiedToken } };
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