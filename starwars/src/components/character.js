import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import './StarWars.css'

const ListItem = styled.li`
    border: 1px solid black;
    border-radius: .5rem;
    width: 33%;
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, .7);
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
            <p>{birth_year}</p>
            <p>{home}</p>
            <p>{height}</p>
            <p>{gender === 'n/a' ? ' ' : gender}</p>
        </ListItem>
    )
}

export default Character