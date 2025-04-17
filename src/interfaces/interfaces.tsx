export interface Country {
    name: { official: string }; 
    capital: string[]; 
    region: string;
    population: number;
    flags: { 
        svg: string;
    };
    languages: { 
        [key: string]: string;
    };
    timezones: string[];
    maps: { 
        googleMaps: string;
    };
}