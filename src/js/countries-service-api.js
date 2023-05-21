const BASE_URL = 'https://restcountries.com/v3.1';
const FILTER = '?fields=name,capital,population,flags,languages';

export const fetchCountries = name => {
  const url = `${BASE_URL}/name/${name}${FILTER}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(error));
};
