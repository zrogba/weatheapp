import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);
    //include loadOptions and fetch from api.js

    const loadOptions = (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities?miniPopulation=1000000&namePrefix=${inputValue}`,
            geoApiOptions
        )
            .then(response => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {

                            value: `${city.latitude} ${city.longtitude}`,
                            label: `${city.name} ${city.countryCode}`,
                        };
                    }),
                };
            })
            .catch(err => console.error(err));
    };

    //call method 
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}
export default Search;