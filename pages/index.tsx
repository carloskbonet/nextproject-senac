import { checkToken } from '@/services/tokenConfig';
import { deleteCookie, getCookie } from 'cookies-next'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';
import styles from "@/styles/home.module.css";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  function logOut() {
    deleteCookie('authorization');

    router.push(`/user/login`);
  }

  return (
    <main className={`flex min-h-screen flex-col  ${inter.className}`}>
      <div className={styles.navBar}>
        <button className={styles.logout} onClick={logOut}>Log Out</button>

        <input className={styles.searchBar} type="text" placeholder='Search bar' />
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