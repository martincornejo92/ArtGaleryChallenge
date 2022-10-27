export interface Art {
    title: string;
    artist_display: string;
    thumbnail: any;
    api_link: string;
    place_of_origin: string;
    credit_line: string;
    style_title: string;
    date_display: string;
    id: string;
}

export type StoredArt =  Pick<Art, 'title' | 'artist_display' | 'thumbnail' | 'api_link' | 'place_of_origin' | 'credit_line' | 'style_title' | 'date_display' | 'id' >