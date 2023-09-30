
let favouriteSHList  =   document.getElementById("superHeroList");
let favouriteSH  =   JSON.parse(localStorage.getItem("favSuperHeroes"));

function addSuperHeroesToDOM(superHero){
    
    let li  =   document.createElement("li");
    li.setAttribute("id",`${superHero.id}`);
    li.innerHTML    =   
    `
    <img src = "${superHero.thumbnail.path+"."+superHero.thumbnail.extension}">
    <h2 id = "superHeroTitle" data-id = "${superHero.id}">${superHero.name}</h2>
    <button id = "know-me" data-id = "${superHero.id}">Know Me</button>
    <button id = "delete" data-id = "${superHero.id}">delete</button>
    `
    favouriteSHList.append(li);
}

async function getSuperHeroes(){
    favouriteSHList.innerHTML   =   "";

    for(let i = 0;i < favouriteSH.length;i++){
        id  =   favouriteSH[i];
        const response  =   await fetch(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=ebda44fa70e823b0ca19710c98782265&hash=c009922cec8f6eff7f189779bc0fc634&ts=1`);
        superHeroDetails    =   (await response.json()).data.results[0];

        addSuperHeroesToDOM(superHeroDetails);
    }
}

function handleClickAndKey(e){

    if(e.target.id  === "know-me"){
        let superHeroId =   e.target.dataset.id;
        localStorage.setItem("superHeroId",JSON.stringify(superHeroId));
        window.open("../know-me/know-me.html");
    }
    if(e.target.id  === "delete"){
        let superHeroId =   e.target.dataset.id;
        const newFavouriteSH    =   favouriteSH.filter(function(id){
            return superHeroId  !== id;
        });

        favouriteSH =   [...newFavouriteSH];
        
        localStorage.setItem("favSuperHeroes",JSON.stringify(newFavouriteSH));
        
        let deleteSuperHero =   document.getElementById(superHeroId);
        deleteSuperHero.style.display   =   "none";
    }
}

document.addEventListener("click",handleClickAndKey);
getSuperHeroes();