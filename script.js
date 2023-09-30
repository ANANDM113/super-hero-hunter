let superHeroList   =   document.getElementById("superhero-list");
let message =   document.getElementById("msg");

let allSuperHeroes  =   [];
let myFavourites    =   [];

function addSuperHeroesToDOM(superHero){
    let li  =   document.createElement("li");
   
    li.innerHTML    =   
    ` 
    <img src = "${superHero.thumbnail.path+"."+superHero.thumbnail.extension}">
    <h2 id = "title">${superHero.name}</h2>
    <button id = "know-me" data-id = "${superHero.id}">Know Me</button>
    <button id = "fav-btn" data-id = "${superHero.id}" data-title = "${superHero.name}">Add to Favourites</button>
    `
    superHeroList.append(li);
}
    
function renderSuperHeroes(){
    superHeroList.innerHTML  =   "";
    
    if(allSuperHeroes.length    ===  0){
        message.innerHTML   =   `No SuperHero with that name`;
        return;
    }

    superHeroList.innerHTML  =   "";
    message.innerHTML   =   "";
    for(let i = 0;i < allSuperHeroes.length;i++){
        addSuperHeroesToDOM(allSuperHeroes[i]);
    }
}

async function searchInputText(content){
    if(content.length   !=  0){
        let url =   `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${content}&apikey=ebda44fa70e823b0ca19710c98782265&hash=c009922cec8f6eff7f189779bc0fc634&ts=1`;
        let response    =   await fetch(url);
        const data1 =   await response.json();
       
        allSuperHeroes  =   (data1.data.results);
       
        if(allSuperHeroes.length    === 0){
            renderSuperHeroes();
        }else{
            renderSuperHeroes();
        }
    }
}

function getInputText(input){
    let content =   input.value;
    searchInputText(content);
}

function addToFavourites(superHeroId,superHeroTitle){
    for(i of myFavourites){
        if(i    === superHeroId){
            message.innerHTML   =  "I am already your favourite";
            setTimeout(() => {
                message.innerHTML   =   "";
            },3000);
            return;
        }
    }
    myFavourites.push(superHeroId);
    localStorage.setItem("favSuperHeroes",JSON.stringify(myFavourites));
    
    message.innerHTML   =   `${superHeroTitle}: I am Honoured!`;
    setTimeout(() => {
        message.innerHTML   =   "";
    },3000);
}

function handleClickAndKey(e){
    if(e.target.id  === "input-search"){
        getInputText(e.target);
    }
    if(e.target.id  === "know-me"){
        let superHeroId =   e.target.dataset.id;
        localStorage.setItem("superHeroId",JSON.stringify(superHeroId));
        window.open("./know-me/know-me.html");
    }
    if(e.target.id  === "fav-btn"){
        addToFavourites(e.target.dataset.id,e.target.dataset.title);
    }
    if(e.target.id  === "favourites"){
        window.open("./favourites/favourite.html");
    }
}

document.addEventListener("keyup",handleClickAndKey);
document.addEventListener("click",handleClickAndKey);