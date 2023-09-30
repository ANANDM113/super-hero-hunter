let superHeroId =   JSON.parse(localStorage.getItem("superHeroId"));

let superHeroKnowMe =   null;
let superHeroTitle  =   document.getElementById("title");
let releaseDate =   document.getElementById("release-date");
let description =   document.getElementById("description");
let comics  =   document.getElementById("comics");
let series  =   document.getElementById("series");
let totalComics =   document.getElementById("comics-num");
let totalSeries =   document.getElementById("series-num");
let imageElement    =   document.getElementsByTagName("img")[0];
let superHeroDetails    =   null;

async function knowYourSuperHero(id){
    const response  =   await fetch(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=ebda44fa70e823b0ca19710c98782265&hash=c009922cec8f6eff7f189779bc0fc634&ts=1`);
    superHeroDetails    =   (await response.json()).data.results[0];

    if(superHeroDetails.description !=  0){
        description.innerHTML   +=  `<h2>${superHeroDetails.description}</h2>`;
    }else{
        description.innerHTML   +=  `<h2>Description Not Available</h2>`;
    }
    superHeroTitle.innerHTML  +=    `<h2>${superHeroDetails.name}</h2>`;
    let date    =   `${superHeroDetails.modified}`;
    let parsedDate  =   "";
    
    for(i of date){
        if('0'  <=  i   &&  i   <=  '9' ||  i   ==  '-'){
            parsedDate  +=  i;
        }else{
            break;
        }
    }
    releaseDate.innerHTML   +=  `<h2>${parsedDate}</h2>`;  
    imageElement.setAttribute("src",`${superHeroDetails.thumbnail.path}.${superHeroDetails.thumbnail.extension}`);

    totalSeries.innerHTML   +=  `${superHeroDetails.series.available}`;
    
    let seriesNum   =   1;
    for(i of superHeroDetails.series.items){
        series.innerHTML    +=  `<h2>Series No. ${seriesNum}: ${i.name}</h2>`;
        seriesNum++;
    }

    totalComics.innerHTML   +=  `${superHeroDetails.comics.available}`;

    let comicNum    =   1;
    for(i of superHeroDetails.comics.items){
        comics.innerHTML    +=  `<h2>Comic No. ${comicNum}: ${i.name}</h2>`;
        comicNum++;
    }
}

function superHeroLoad(){
    knowYourSuperHero(superHeroId);
}
superHeroLoad();