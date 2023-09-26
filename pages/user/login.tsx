import Head from "next/head";
import Link from "next/link";

export default function loginPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Head>
                <title>Login</title>
            </Head>

            <div className="form-Card">
                <form>

                    <input type="email" placeholder="Email" required />

                    <br />

                    <input type="password" placeholder="Senha" required />

                    <br />
                    <button>Enviar</button>
                </form>

                <Link href={`/user/cadastro`}>Criar Conta</Link>
            </div>
        </main>
    );
}