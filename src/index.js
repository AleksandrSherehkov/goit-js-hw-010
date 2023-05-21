import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { refs } from './js/refs';
import countriesListMarkup from './templates/countries-list-markup.hbs';
import countryInfoMarkup from './templates/country-info-markup.hbs';
import { fetchCountries } from './js/countries-service-api';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const onInputCountryValue = e => {
  const countryName = e.target.value.trim();

  fetchCountries(countryName)
    .then(contentRendering)
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      clearCountryInfo();
      clearCountriesList();
      return error;
    });
};

const contentRendering = countries => {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    clearCountriesList();
    clearCountryInfo();
    return;
  }

  if (countries.length <= 10) {
    refs.countriesList.innerHTML = countriesListMarkup(countries);
    clearCountryInfo();
  }

  if (countries.length === 1) {
    refs.countryInfo.innerHTML = countryInfoMarkup(countries);
    clearCountriesList();
  }
};

const clearCountryInfo = () => {
  refs.countryInfo.innerHTML = '';
};

const clearCountriesList = () => {
  refs.countriesList.innerHTML = '';
};

refs.input.addEventListener('input', debounce(onInputCountryValue, DEBOUNCE_DELAY));
