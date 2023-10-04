import { checkToken } from '@/services/tokenConfig';
import { deleteCookie, getCookie } from 'cookies-next'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from "@/styles/home.module.css";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <main className={`flex min-h-screen flex-col  ${inter.className}`}>
      <div className={styles.navBar}>
        <button className={styles.logout} onClick={logOut}>Log Out</button>

        <form onSubmit={formSubmit}>
          <input className={styles.searchBar} type="text" placeholder='Search bar'
            value={name} onChange={(evento) => { handleFormEdit(evento) }} />
        </form>
      </div>

      {data != undefined && data instanceof Array ?
        data.map(item => (
          <div className={styles.container}>
            <p>{item.id}</p>
            <p>{item.name}</p>
            <p>{item.releaseDate}</p>
            <p>{item.created_at}</p>
            <p>{item.updated_at}</p>
          </div>
        ))
        : <p>No movies found</p>
      }

      <div className={styles.container}>
        <p>{movie.name}</p>
        <p>{movie.releaseDate}</p>
        <p>{movie.createdAt}</p>
        <p>{movie.updatedAt}</p>
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