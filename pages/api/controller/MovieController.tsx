import { createMovieModel, findMovieByNameModel, findMovieByIdModel , selectMoviesModel, deleteMovieModel } from "../model/movie";

export async function createMovie(name:string, releaseDate:string, image:string, genres:Array<number>) {
    try {
        const movieByName = await findMovieByNameModel(name);

        if (movieByName != undefined) {
            return { message: "Movie already registered." };
        }

        const response = await createMovieModel(name, releaseDate, image, genres);
        
        return response;
    }
    catch(err){
        return { message: "Something went wrong" };
    }
}

export async function findMovieByName(name:string) {
    try {
        const movieByName = await findMovieByNameModel(name);

        if (movieByName == undefined) {
            return { message: "Movie not found" };
        }

        return movieByName;

    }
    catch(err){
        return { message: "Something went wrong" };
    }
}

export async function selectMovies() {
    try {
        const movies = await selectMoviesModel();

        return movies;

    }
    catch(err){
        return { message: "Something went wrong" };
    }
}

export async function deleteMovie(id:number) {
    try {
        const movieById = await findMovieByIdModel(id);

        if (movieById == undefined) {
            return { message: "Movie not found" };
        }

        const response = await deleteMovieModel(id);

        return response;

    }
    catch(err){
        return { message: "Something went wrong" };
    }
}