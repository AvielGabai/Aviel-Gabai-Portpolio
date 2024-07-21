const getData = async () => {
    const res = await fetch('https://restcountries.com/v3.1/all');
    return await res.json();
}

const countriesFull = await getData();
let countries = [...countriesFull];

const search = (word) => {
    countries = countries.filter((item)=> {
        const name = item.name.common.toLowerCase();
        return name.includes(word.toLowerCase());
    });
}

const reset = () => {
    countries = [...countriesFull];
}

export {countries, getData, search, reset};