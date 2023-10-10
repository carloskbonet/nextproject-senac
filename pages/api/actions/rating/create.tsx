import { NextApiRequest, NextApiResponse } from "next";
import { createRating } from "../../controller/RatingController";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "POST") {
        return res.status(403).json({ message: "Method not allowed" });
    }

    const { value, comment, email, movieName } = req.body;

    // create model
    const response = await createRating(value, email , movieName, comment);

    if ( response.message != undefined ) {
        return res.status(403).json( response );
    }

    return res.status(200).json( response );
}