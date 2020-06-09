import React, {useEffect} from "react";

export const MovieSearch = ({searchName, setSearchName, setMovies, setNoResults, movies,}) => {
    const key = "3e8cf997cb85c12acbe8ae2e6af56e4f"
    useEffect(() => {
        try {
            if (searchName !== "")
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=pl-PL&page=1&include_adult=false&query=${searchName}`)
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        } else {
                            throw new Error("Error during loading data")
                        }
                    })
                    .then(data => {
                        setMovies(data.results)
                    })
                    .catch(err => console.log(err)
                    );
        } catch (error) {
            console.log(error);
        }
        setNoResults(movies.length)
    }, [searchName]);
    if (movies === []) return <p>Loading data...</p>;

    return (
        <input className="col-11 header__label__input " placeholder="Czego poszukujesz?"
               name={"name"}  type="text" value={searchName} onChange={e=>setSearchName(e.target.value)}/>
    )
};
