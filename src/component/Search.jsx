/** @format */

import React, { useState } from "react";
import { countriesNames } from "../service/countries";
import WeatherCard from "../component/WeatherCard";

function Search() {
  const [value, setValue] = useState("");
  const [openResultByIndex, setOpenResultByIndex] = useState(-1);
  const fullSearchResult = countriesNames(value);
  const searchResult = fullSearchResult.slice(0, 10);

  const handleSearch = (e) => {
    setValue(e.target.value);
    setOpenResultByIndex(-1);
  };

  const handleButtonClick = (index) => {
    setOpenResultByIndex(index === openResultByIndex ? -1 : index);
    if (index !== -1) {
      const selectedCountry = document.getElementById(`country-${index}`);
      if (selectedCountry) {
        selectedCountry.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <div className='drop-shadow-xl'>
      <div className='text-xl font-mono font-bold w-full bg-cyan-600 p-5 text-white'>
        Find countries{""}
        <input
          className=' ml-4 bg-slate-400 rounded-lg border-solid border-2 border-cyan-800'
          type='text'
          placeholder='Search for a country'
          onChange={handleSearch}
        />
      </div>
      <div className='ms-5'>
        {
          <div className='py-4'>
            <div>
              {value.length >= 1 && value.length <= 2 && (
                <div className='text-red-600 text-xl'>
                  Too many matches to display 🤯
                </div>
              )}
              {fullSearchResult.length === 0 && value.length > 2 && (
                <div className='text-red-600 text-xl'>No matches found 🙅‍♀️</div>
              )}
            </div>

            <ul>
              {searchResult.map((country, index) => (
                <li
                  id={`country-${index}`}
                  className='flex flex-col gap-2 py-4 text-4xl font-mono font-bold  text-black'
                  key={country.name.common}>
                  <div className=' flex flex-row align-baseline gap-4'>
                    {country.name.common} {country.flag}
                    <button
                      onClick={() => handleButtonClick(index)}
                      className='middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase bg-gray-200 border-solid border-2 border-cyan-500 text-cyan-500 transition-all hover:bg-cyan-700/10 active:bg-cyan-500/30 active:text-black disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    data-ripple-dark="true'>
                      See more
                    </button>
                  </div>
                  {openResultByIndex === index && (
                    <>
                      <div className='text-lg my-4'>
                        <div>Official name :{country.name.official} </div>
                        <div> Population : {country.population}</div>
                        <div> Area : {country.area}</div>
                      </div>
                      <div className='text-lg'>
                        <p className=' text-xl mb-2 mt-4'>Languages</p>
                        {
                          <ul>
                            {Object.entries(country.languages).map(
                              ([code, name]) => (
                                <li className='ml-8 list-disc' key={code}>
                                  {name}
                                </li>
                              )
                            )}
                          </ul>
                        }
                      </div>
                      <div className='my-4'>
                        <img src={country.flags.png} alt={country.flags.alt} />
                      </div>
                      <div className='text-sm font-mono pt-5 pb-4'>
                        Weather of {country.capital} capital of{" "}
                        {country.name.common}
                      </div>
                      <WeatherCard capitalInfo={country.capitalInfo} />
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
    </div>
  );
}

export default Search;
