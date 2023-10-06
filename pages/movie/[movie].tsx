import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export function getServerSideProps(context:any) {
    const { movie } = context.query;

    return {
        props: {
            movie
        }
    }

}

export default function movie({ movie }: any) {
    const [data, setData]: any = useState(undefined);
    const router = useRouter();

    async function fetchData() {

        const response = await fetch(`/api/actions/movie/find?name=` + movie, {
            method: 'GET'
        })

        const responseJson = await response.json();

        setData(responseJson);
    }

    useEffect(() => {
        fetchData();
        console.log(data);
    }, [])

    return (
        <main>
            {data != undefined ?
                <div>
                    <p>{data.name}</p>
                    <p>{data.releaseDate}</p>
                </div>
                
                : <p>Not found</p>
            }
        </main>
    )
}