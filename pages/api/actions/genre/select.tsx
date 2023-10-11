import { NextApiRequest, NextApiResponse } from "next";
import { selectGenres } from "../../controller/GenreController";

export default async (req:NextApiRequest , res:NextApiResponse) => {
    if ( req.method != "GET" ) {
        return res.status(403).json( { message: "Method not allowed" } );
    }

    const genres = await selectGenres();

    if ( genres.message ) {
        return res.status(500).json(genres);
    }

    return res.status(200).json(genres);
} 