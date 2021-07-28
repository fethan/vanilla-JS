const results = document.getElementById('results');
const search_input = document.getElementById('search');

let countries;
let search_item = '';

const fetchCountries = async () => {
    countries = await fetch(
        'https://restcountries.eu/rest/v2/all?fields=name;population;flag'
    ).then(res => res.json());
};

const showCountries = async () => {
    // clear the results
    results.innerHTML = '';
    // getting data
    await fetchCountries();

    const ul = document.createElement('ul');
    ul.classList.add('countries');

    countries
        .filter(country =>
            country.name.toLowerCase().includes(search_item.toLowerCase()))
        .forEach(country => {
            // creating structure
            const li = document.createElement('li');
            li.classList.add('country-item');

            const country_flag = document.createElement('img');
            // Setting the image source
            country_flag.src = country.flag;
            country_flag.classList.add('country-flag');

            const country_name = document.createElement('h3');
            country_name.innerText = country.name;
            country_name.classList.add('country-name');

            const country_info = document.createElement('div');
            country_info.classList.add('country-info');

            const country_population = document.createElement('h2');
            country_population.innerText = numberWithCommas(country.population);
            country_population.classList.add('country-population');

            const country_population_text = document.createElement('h5');
            country_population_text.innerText = 'Population';
            country_population_text.classList.add('country-population-text');

            country_info.appendChild(country_population);
            country_info.appendChild(country_population_text);

            li.appendChild(country_flag);
            li.appendChild(country_name);
            li.appendChild(country_info);

            ul.appendChild(li);
        });

    results.appendChild(ul);
};

showCountries();

search_input.addEventListener('input', e => {
    // saving the input value
    search_item = e.target.value;

    // re-display countries based on the new search_item
    showCountries();
});


// From StackOverflow https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}