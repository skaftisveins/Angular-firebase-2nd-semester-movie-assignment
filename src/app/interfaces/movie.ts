export interface Movie {
    adult: boolean;
    id?: number;
    genres?: number[]; // need this?
    genres_ids?: number[];
    title?: string;
    overview?: string;
    popularity?: string;
    release_date?: Date;
    vote_average?: number;
    vote_count?: number;
}

export interface Video {
    id?: number;
    results: ResultVideos[];
}

export interface ResultVideos {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
}


