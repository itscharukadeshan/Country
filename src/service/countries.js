/** @format */

import axios from "axios";
import { useEffect, useState } from "react";

const Base_Url = "https://restcountries.com/v3.1/";

const countriesNames = (value) => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    if (value.length >= 3) {
      axios
        .get(`${Base_Url}name/${value}`)
        .then((response) => setNames(response.data));
    } else {
      setNames([]);
    }
  }, [value]);

  return names;
};
export { countriesNames };
