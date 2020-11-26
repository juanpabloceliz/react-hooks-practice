import { useState, useEffect } from 'react'

const useCharacters = url => {
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setCharacters(data.results))
            .catch(e => console.log(e))
    }, [url])

    return characters
}

export default useCharacters