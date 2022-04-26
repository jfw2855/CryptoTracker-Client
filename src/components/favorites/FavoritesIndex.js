import React, { useState, useEffect } from 'react'
import { getAllFavorites } from '../../api/favorites'
import { Spinner, Card, Button, Form } from 'react-bootstrap'
import { getSeveral } from '../../api/cryptos'
import { Link, useNavigate } from 'react-router-dom'
 import { BsFillTrashFill } from "react-icons/bs";
import { deleteFavorite } from '../../api/favorites';


const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const FavoritesIndex = (props) => {
    
    //   const navigate = useNavigate()
    
    const [favorites, setFavorites] = useState(null)
    const [mData, setMData] = useState(null)
    const [updated, setUpdated] = useState(false)

    let coins = []
    let query = ''
    const { user } = props    
    useEffect(() => {
        const fetchData = async() => {
            const getFavs = await getAllFavorites(user)
            setFavorites(getFavs)
            // console.log('getFavs', getFavs)
                getFavs.data.favorites.map((crypto) => {
                    coins.push(crypto.coinGeckId)
                    query = coins.join().replace(',', '%2C')
                    // console.log('the coins', crypto.coinGeckId)
                })
                console.log('favorites in use effect', favorites)           
                const favoriteData = await getSeveral(query)
                console.log('the coins', favoriteData)
                setMData(favoriteData)
            setUpdated(false)
        }
        fetchData()
    }, [updated])
    
    console.log('favorites when null', favorites)



        if (favorites == null) {
                return<Spinner animation="border" className role="status">
                <span className="visually-hidden">Loading</span>
                </Spinner>
            }
    //    else if (favorites.data.favorites.length > 0) {            
    //         const favoriteData = getSeveral(query)
    //         console.log('the coins', favoriteData)
    //         setMData(favoriteData)
    //     }
        else if (favorites.data.favorites.length === 0) {
            return (
                <h1>No favorites!</h1>
            )
    }
    
    
    const handleDelete = (e, favoritesId) => {
        e.preventDefault()
        
        deleteFavorite(user, favoritesId)
        .then(() => setUpdated(true))
        .catch((err) => console.log(err))
        
        
        
    }
    
    // console.log when you know favs are empty, vs when there are favs vs waiting for a response
    // if empty load "add favorites"
    
    
    if (!mData) {
        return<Spinner animation="border" role="status">
            <span className="visually-hidden">Loading</span>
          </Spinner>
    } 
    
    
    
    
    console.log('market favortie data', mData)
    let favoriteCards = mData.data.map((crypto) => (
        <Card key={crypto.id} style={{ width: '30%' }} className="text-centered m-2">
        <Card.Header>{crypto.name} ({crypto.symbol})</Card.Header>
        <Card.Body>
        <img src={crypto.image} alt={crypto.name} />
      </Card.Body>
      <Card.Footer>
        Price: ${crypto.current_price}
                <Link style={{ color: "black" }} to={`/crypto/${crypto.id}`}>View Coin</Link>
                <Form onClick={(e) => handleDelete(e, crypto.id)}>                  
                    <Button type="button" variant="danger">
                        <BsFillTrashFill fontSize="18px" />
                    </Button>
                </Form>
      </Card.Footer>
    </Card>
  ))

  

  return (
    <>
          <h1 className='logo'>Your Favorites</h1>
          <div style={cardContainerLayout}>
            {favoriteCards}
        </div>
    </>
  )
}

export default FavoritesIndex
