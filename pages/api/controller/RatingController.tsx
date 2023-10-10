import { findMovieByNameModel } from "../model/movie";
import { createRatingModel, findRatingByUserAndMovieModel } from "../model/rating";
import { findUserModelByEmail } from "../model/user";

export async function createRating(value:number, email:string, movieName:string, comment = "") {
    try {
        const userByEmail = await findUserModelByEmail(email);

        if (userByEmail == undefined) {
            return { message: "User not found" };
        }

        const movieByName = await findMovieByNameModel(movieName);

        if (movieByName == undefined) {
            return { message: "Movie not found" };
        }

        const ratingByUserAndMovie = await findRatingByUserAndMovieModel(userByEmail.id , movieByName.id);

        if (ratingByUserAndMovie != undefined) {
            return { message: "Rating already exist" };
        }

        const response = await createRatingModel(value, comment, userByEmail.id , movieByName.id);
        
        return response;

    }
    catch(err){
        return { message: "Something went wrong" };
    }
}