import { prisma } from "@/db";

export async function createMovieModel(_name: string, _releaseDate: string, _image:string, _genres: Array<number>) {
    var connectArray: Array<any> = [];

    _genres.map(item => (
        connectArray.push({
            id: item
        })
    ));

    const movie = await prisma.movie.create({
        data: {
            name: _name,
            releaseDate: _releaseDate,
            imageURL: _image,
            genres: {
                connect: connectArray
            }
        }
    });

    return movie;
}

export async function findMovieByNameModel(_name: string) {
    const movie = await prisma.movie.findUnique({
        where: {
            name: _name
        },
        include: {
            ratings: {
                include: {
                    user: true,
                }
            },
            genres: true
        }
    });

    return movie;
}

export async function findMovieByIdModel(_id: number) {
    const movie = await prisma.movie.findUnique({
        where: {
            id: _id
        }
    });

    return movie;
}

export async function selectMoviesModel() {
    const movies = await prisma.movie.findMany();

    return movies;
}

export async function deleteMovieModel(_id: number) {
    const movie = await prisma.movie.delete({
        where: {
            id: _id
        }
    });

    return movie;
}