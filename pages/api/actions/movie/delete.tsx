import { NextApiRequest, NextApiResponse } from "next";
import { deleteMovie, findMovieByName } from "../../controller/MovieController";
import { isString } from "@/request/Check";

export default async (req:NextApiRequest , res:NextApiResponse) => {
    if ( req.method != "DELETE" ) {
        return res.status(403).json( { message: "Method not allowed" } );
    }

    const { name } = req.query;

    if ( name == undefined || !isString(name) || name instanceof Array ) {
        return res.status(403).json({ message: "Invalid query" });
    }

    const response = await findMovieByName(name);

    if ( response.message != undefined ) {
        return res.status(403).json( response );
    }

    const deletedMovie = await deleteMovie(response.id);
    
    if ( deletedMovie.message != undefined ) {
        return res.status(403).json( deletedMovie );
    }

    return res.status(200).json( {
        message: "Movie deleted",
        data: deletedMovie
    } );
} 