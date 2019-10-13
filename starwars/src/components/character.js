import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import './StarWars.css'

const ListItem = styled.li`
    border: 1px solid black;
    border-radius: .5rem;
    width: 30%;
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, .7);
    margin: 1rem 0 0 1rem;
`

function Character(props) {
    const { name, birth_year, homeworld, height, gender } = props
    const [home, setHome] = useState()

    useEffect(() => {
        axios.get(`${homeworld}`)
            .then(res => {
                setHome(res.data.name)
                return res.data
            })
            .catch(err => {
              return err.response
            })
    })

    return (
        <ListItem>
            <h4>{name}</h4>
            <p>Born: {birth_year}</p>
            <p>Homeworld: {home}</p>
            <p>Height: {height}</p>
            <p>{(gender === 'n/a' || gender === 'none' )? ' ' : gender}</p>
        </ListItem>
    )
}

export default Character