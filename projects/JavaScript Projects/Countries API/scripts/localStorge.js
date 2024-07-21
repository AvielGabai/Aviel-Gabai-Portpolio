import { countries } from "./countries";

let likeCountries = [];

// get data LocalStorage ?
const getData = () => {
    let data = localStorage.getItem("countries");
    if (!data) {
        localStorage.setItem("countries", "likeCountries");
        data = localStorage.getItem("countries");
    }
    likeCountries = JSON.parse(data);
};

// country
const updateCountries = (countryName) => {
    if (likeCountries.includes(countryName)) {
        let filterd = likeCountries.filter((country) => {
            return country != countryName;
        })
        likeCountries = filterd;
    } else {
        likeCountries.push(countryName);
    }
    localStorage.setItem("countries", JSON.stringify(likeCountries));
};

export { getData, likeCountries, updateCountries };