const getCountries = async () => {
    const res = await fetch('https://restcountries.com/v3.1/all');
    return await res.json();
}

const countriesFull = await getCountries();
let countries = [...countriesFull];

const search = (text) => {
    countries = countries.filter((item) => {
        const name = item.name.common.toLowerCase();
        return name.includes(text.toLowerCase());
    })
}

const reset = () => {
    countries = [...countriesFull];
}

export { countries, search, reset };
