import React, { useState, useEffect } from 'react';
import axios from 'axios'
import styled from 'styled-components'

import Character from './components/character'

import './App.css';

const CharacterList = styled.ul`
  display: flex;
  flex-flow: wrap row;
  justify-content: center;
  height: 30rem;
  padding: 2rem;
`

const App = () => {
  const mount = 'mount'
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    axios.get('https://swapi.co/api/people/')
      .then(res => {
        setCharacters(res.data.results)
        return res.data
      })
      .catch(err => {
        return err.response
      })

  }, [mount])
 
  if(!characters) return <h2>loading...</h2>

  return (
    <div className="App">
      <h1 className="Header">React Wars</h1>
      <CharacterList>
        {
          characters.map((character, indx) => {
            return <Character 
                    key={indx}
                    mount={mount}
                    birth_year={character.birth_year}
                    height={character.height}
                    gender={character.gender}
                    homeworld={character.homeworld}
                    name={character.name}
                     />
          })
        }
      </CharacterList>
    </div>
  );
}

export default App;