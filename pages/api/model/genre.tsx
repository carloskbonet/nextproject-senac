import { prisma } from "@/db";

export async function selectGenresModel(){
    const genres = await prisma.genre.findMany();


    return genres;
}
