// import React, {Component } from "react";
//
// export const AddBtns = ({movies, setBookMovie, option}) => {
//
//     const handleSubmit = (index, e, isWishList) => {
//         e.preventDefault();
//         e.target.parentElement.style.display = "none"
//         const adInfo = document.createElement("span")
//         adInfo.innerText = "Dodano do Listy"
//         adInfo.style.color = "green"
//         adInfo.style.margin = "5px"
//         adInfo.style.fontWeight = "bold"
//         e.target.parentElement.parentElement.appendChild(adInfo)
//
//         console.log(index)
//         let movie = movies[index]
//
//
//         setBookMovie({
//                 login: "",
//                 password: "",
//                 title: movie.title,
//                 description: movie.overview,
//                 url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
//                 type: option,
//                 date: new Date,
//                 popularity: movie.popularity,
//                 vote_average: movie.vote_average,
//                 vote_count: movie.vote_count,
//                 wishlist: isWishList
//             }
//         )
//     }
//
//     return(
//         <div className=" search__list__buttons  col-12">
//             <button className="search__list__buttons__add btn  "
//                     onClick={(e, index = null) => handleSubmit(index, e, false)}>Dodaj
//             </button>
//             <button className="search__list__buttons__wishList btn "
//                     onClick={(e, index = null) => handleSubmit(index, e, true,)}>Dodaj Lista Życzeń
//             </button>
//         </div>
//     )
//
// }