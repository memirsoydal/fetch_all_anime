const fs = require('fs');
const fetch = require('node-fetch')

const filename = "newJsons/pageJson";


async function populate(page){
    const url = `https://api.jikan.moe/v4/top/anime?filter=bypopularity&type=tv&page=${page}`
    const res = await fetch(url);
    const animes = await res.json();

    if(res.status != 429)
        populateAnimes(animes,page);
    else{
        populate(page);
    }
}

function populateAnimes(obj,page){
    const animes = obj['data'];
    let filtered_animes = [];
    for(let anime of animes){

        let gen = ``;
        for(const genre of anime.genres){
            gen += `${genre.name}, `
        }
        let aTheme = ``;
        for(const theme of anime.themes){
            aTheme += `${theme.name}, `
        }
    let cAnime = {
        Year:anime.year,
        Title:anime.title,
        "Title (English)": anime.title_english,
        Status:anime.status,
        Score:anime.score,
        Popularity:anime.popularity,
        Episodes:anime.episodes,
        Genres: gen,
        Themes: aTheme,
        URL:anime.url,
        "Youtube Trailer":anime.trailer.url
        };
    filtered_animes.push(cAnime);
    }
    let json = JSON.stringify(filtered_animes);
    fs.writeFile(`${filename}${page}.json`, json, (err) => {
        if (err)
            console.log(err);
        else {
            console.log(`File written successfully [${page}]\n`);
        }
    });
}

let i=1;
while(i<=2){
    populate(i);
    i++;
}