import { NextApiRequest, NextApiResponse } from "next";
import { getImage } from "@/utils/formidable";
import { uploadImage } from "@/utils/cloudinary";

export const config = {
    api: {
      bodyParser: false,
    },
  };

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "POST") {
        return res.status(403).json({ message: "Method not allowed" });
    }

    const imageUploaded = await getImage(req);

    if (!imageUploaded) {
        return res.status(404).json({ message: "Cant handle this file" });
    }
    
    // create model
    const imageData = await uploadImage(imageUploaded[0].filepath);

    return res.status(200).json(imageData);
}