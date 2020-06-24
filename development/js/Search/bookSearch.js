import React, {useEffect} from "react";

export const BookSearch = ({searchName, setSearchName, setMovies, movies})=> {
    useEffect(() => {
            try {
                if (searchName !== "")
                    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchName}`)
                        .then(response => {
                            if (response.ok) {
                                return (response.json())
                            } else {
                                throw new Error("Error during loading data")
                            }
                        })
                        .then(data => {
                            setMovies(data.items);
                        })
                        .catch(err => console.log(err)
                        );
            } catch (error) {
                console.log(error);
            }

    }, [searchName]);
    if (movies === []) return <p>Loading data...</p>;

    return (
        <input className="col-11 header__label__input " placeholder="Czego poszukujesz?"
               name={"name"}  type="text" value={searchName} onChange={e=>setSearchName(e.target.value)}/>
    )
};
