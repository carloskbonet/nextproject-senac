import { selectGenresModel } from "../model/genre"

export async function selectGenres() {
    try {
        const genres = await selectGenresModel();

        return genres;

    }
    catch(err){
        return { message: "Something went wrong" };
    }
}