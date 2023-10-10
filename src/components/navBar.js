import Link from 'next/link';
import styles from "@/styles/home.module.css";
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';

export default function navBarCustom() {
    const router = useRouter();

    // Remove login cookies
    function logOut() {
        deleteCookie('authorization');
        router.push(`/user/login`);
    }

    return (
        <div className={styles.navBar}>
            <Link className={styles.createMovie} href={'/movie/create'}>Criar um filme</Link>

            <button className={styles.logout} onClick={logOut}>Log Out</button>

        </div>
    )
}