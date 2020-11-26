import React, { useState, useReducer, useMemo, useRef, useCallback } from 'react'
import useCharacters from '../hooks/useCharacters'
import Search from './Search'

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

    const [favorites, dispatch] = useReducer(favoritesReducer, initialState)

    const [search, setSearch] = useState('')

    const searchInput = useRef(null)

    const characters = useCharacters('https://rickandmortyapi.com/api/character/')
    
    const handleClick = favorite => {
        dispatch({ type: 'ADD_TO_FAVORITES', payload: favorite})
    }

    // const handleSearch = () => {
    //     setSearch(searchInput.current.value)
    // }

    const handleSearch = useCallback(
        () => {
            setSearch(searchInput.current.value)
        },[]
    )

    // const filteredUsers = characters.filter((user) => {
    //     return user.name.toLowerCase().includes(search.toLocaleLowerCase())
    // })

    const filteredUsers = useMemo(() =>
        characters.filter((user) => {
            return user.name.toLowerCase().includes(search.toLocaleLowerCase())
        }),
        [characters, search]
    )

    return (
        <div className='Characters'>

            {favorites.favorites.map(favorite => (
                <li key={favorite.id}>
                    {favorite.name}
                </li>
            ))}

            <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

            {filteredUsers.map(character => (
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
