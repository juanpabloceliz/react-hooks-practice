import React, { useState, useEffect, useReducer } from 'react'

const initialState = {
    favorites: []
}

const favoritesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITES':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        default:
            return state
    }
}

function Characters() {

    const [characters, setCharacters] = useState([])

    const [favorites, dispatch] = useReducer(favoritesReducer, initialState)

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/')
            .then(response => response.json())
            .then(data => setCharacters(data.results))
            .catch(e => console.log(e))
    }, [])

    const handleClick = favorite => {
        dispatch({ type: 'ADD_TO_FAVORITES', payload: favorite})
    }

    return (
        <div className='Characters'>

            {favorites.favorites.map(favorite => (
                <li key={favorite.id}>
                    {favorite.name}
                </li>
            ))}

            {characters.map(character => (
                <div className="item" key={character.id}>
                    <h2>{character.name}</h2>
                    <button type='button' onClick={() => handleClick(character)}>
                        Agregar a favoritos
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Characters
