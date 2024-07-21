import { countries, reset, search } from "./countries.js";
import {getData, likeCountries, updateCountries} from "./localStorge.js";

const cardsDiv = document.getElementById('cards');
const searchInput = document.getElementById('search');

searchInput.addEventListener('keyup', (e) =>{
    reset();
    const val = e.target.value;
    cardsDiv.innerHTML = "";
    
    if(!val || val === "") {
        cardsDiv.innerHTML = "";
        return createCardsList();
    }

    search(val);
    createCardsList();
    console.log(countries);
})

export const createCard = (country) => {
    const card = document.createElement('div');
    card.className = 'card shadow m-2 col-sm-12 col-md-3';

    const cardImg = document.createElement('img');
    cardImg.className = 'card-img-top img mt-2 border rounded';
    cardImg.src = country.flags.png;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = country.name.common;

    const population = document.createElement('p');
    population.className = 'card-text';
    population.textContent = `population: ${country.population}`;
    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer d-flex justify-content-center mb-2';

    const heart = document.createElement('i');
    heart.className = 'fa fa-heart text-dark';

    heart.addEventListener('click', ()=> {
        updateCountries(country.name.common);
        if (heart.classList[heart.classList.length-1] === 'text-dark') {
            heart.className = 'fa fa-heart text-danger'
        } else {
            heart.className = 'fa fa-heart text-dark';
        }
    })

    let isLiked = false;
    getData();
    if(likeCountries.includes(country.name.common)){
        heart.classList = 'fa fa-heart text-danger';
    }else{
        heart.className = 'fa fa-heart text-dark';
    }

    card.appendChild(cardImg);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(population);

    cardFooter.appendChild(heart);

    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    cardsDiv.appendChild(card);
}

export const createCardsList = () => {
    for(const item of countries){
        createCard(item);
    }
}