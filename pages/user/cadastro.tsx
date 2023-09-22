import Head from "next/head";
import { useState } from "react";

export default function cadastroPage() {
    const [ formData , setFormData ] = useState(
        {
            name: '',
            cpf: '',
            email: '',
            password: ''
        }
    );

    function handleFormEdit( event:any , name:any ) {
        setFormData({
            ...formData,
            [name]: event.target.value
        })
    }
    
    async function formSubmit(event:any) {
        event.preventDefault();

        const response = await fetch(`/api/actions/user/create`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const responseJson = await response.json();
        console.log(responseJson);
        console.log(response.status);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Head>
                <title>Cadastro</title>
            </Head>

            <form onSubmit={formSubmit}>
                <input type="text" placeholder="Nome (Não obrigatório)" value={formData.name}
                onChange={(evento) => {handleFormEdit(evento , 'name')}} />

                <br></br>
                
                <input type="text" placeholder="CPF" value={formData.cpf}
                onChange={(evento) => {handleFormEdit(evento , 'cpf')}} />
                
                <br></br>

                <input type="text" placeholder="Email" value={formData.email}
                onChange={(evento) => {handleFormEdit(evento , 'email')}} />

                <br></br>

                <input type="text" placeholder="Senha" value={formData.password}
                onChange={(evento) => {handleFormEdit(evento , 'password')}} />

                <br></br>
                <button>Enviar</button>
            </form>
            
        </main>
    )

}