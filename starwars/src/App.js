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

const Button = styled.button`
  margin-left: 1rem;
  width: 8rem;
  height: 3rem;
  border-radius: .5rem;
  font-size: 1rem;
  &:hover {
    background-color: black;
    color: white;
  }
`

const App = () => {
  const mount = 'mount'
  const [characters, setCharacters] = useState([])
  const [previous, setPrevious] = useState()
  const [next, setNext] = useState()

  useEffect(() => {
    axios.get('https://swapi.co/api/people/')
      .then(res => {
        setCharacters(res.data.results)
        setPrevious(res.data.previous)
        setNext(res.data.next)
        return res.data
      })
      .catch(err => {
        return err.response
      })

  }, [mount])

  const getCharacters = (list) => {
    let url = list === 'next' ? next : previous 
    return axios.get(`${url}`)
            .then(res => {
              setCharacters(res.data.results)
              setPrevious(res.data.previous)
              setNext(res.data.next)
              return res.data
            })
            .catch(err => {
              return err.response
            })
  }
 
  console.log(previous)
  console.log(next)

  if(!characters) return <h2>loading...</h2>

  return (
    <div className="App">
      <h1 className="Header">React Wars</h1>
      {previous && <Button onClick={() => getCharacters('previous')}>Previous</Button>}
  { next && <Button onClick={() => getCharacters('next')}>Next</Button> }
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