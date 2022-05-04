import React, { useState, useEffect } from 'react'
import { getAllFavorites, deleteFavorite } from '../../api/favorites'
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import { getSeveral } from '../../api/cryptos'
import { Link, useNavigate } from 'react-router-dom'
import { BsFillTrashFill } from 'react-icons/bs'

const cardContainerLayout = {
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'row wrap',
}

const FavoritesIndex = (props) => {

  
  const { user } = props
  const [favorites, setFavorites] = useState(null)
  const [mData, setMData] = useState(null)
  const [updated, setUpdated] = useState(false)
  const navigate = useNavigate()

  let coins = []
  let query = ''

  // fetches data from the backend server to get a user's favorite coins
  useEffect(() => {
    const fetchData = async () => {
      const getFavs = await getAllFavorites(user)
      setFavorites(getFavs)
      // creates a query string of user's favorites
      getFavs.data.favorites.map((crypto) => {
        coins.push(crypto.coinGeckId)
        query = coins.join().replace(',', '%2C')
      })
      //gets daily market data of favorite coins
      const favoriteData = await getSeveral(query)
      setMData(favoriteData)
      setUpdated(false)
    }
    fetchData()
  }, [updated])

  // function that redirects user to home page if they do not have any favorited coins
  const onAddSome = () => {
    navigate('/home')
  }

  // shows loader while awaiting for favorites backend resp
  if (favorites == null) {
    return <span class="loader"></span>
  }
  // shows an add coins card if user has no favorited coins
  else if (favorites.data.favorites.length === 0) {
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <div className="signin-container">
            <div className="no-favorites">
              <h3>Looks like you don't have any favorites!</h3>
              <Button
                className="sign-button"
                variant="warning"
                type="submit"
                onClick={onAddSome}
              >
                Let's Add Some!
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // handle function that removes favorited coins from user's favorites
  const handleDelete = (e, favoritesId) => {
    e.preventDefault()
    deleteFavorite(user, favoritesId)
      .then(() => setUpdated(true))
      .catch((err) => console.log(err))
  }

  // loads spinner while awaiting for market data (mData)
  if (!mData) {
    return <span class="loader"></span>
  }

  // maps over market data to create favorite cards
  let favoriteCards = mData.data.map((crypto) => (
    <Link to={`/crypto/${crypto.id}`}>
      <Card
        bg="transparent"
        text="white"
        border="white"
        style={{ width: '16rem' }}
        className="text-centered m-2"
      >
        <Card.Img variant="top" src={crypto.image} />
        <Card.Body>
          <Card.Title>
            {crypto.name} ({crypto.symbol})
            <BsFillTrashFill
              onClick={(e) => handleDelete(e, crypto.id)}
              fontSize="22px"
              style={{ color: 'white', float: 'right' }}
            />
          </Card.Title>
          <ListGroup className="list-group-flush" bg="transparent" text="white">
            <ListGroupItem>
              Market Cap Rank: <strong>{crypto.market_cap_rank}</strong>
            </ListGroupItem>
            <ListGroupItem>
              Current Price:{' '}
              <strong>
                $
                {crypto.current_price > 1
                  ? crypto.current_price.toLocaleString('en-US')
                  : crypto.current_price.toPrecision(4)}
              </strong>
            </ListGroupItem>
            <ListGroupItem>
              24Hr Change:
              <span
                className={
                  crypto.price_change_percentage_24h > 0 ? 'green' : 'red'
                }
              >
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </span>
            </ListGroupItem>
          </ListGroup>
        </Card.Body>
      </Card>
    </Link>
  ))

  return (
    <>
      <h1 className="logo">Your Favorites</h1>
      <div style={cardContainerLayout}>{favoriteCards}</div>
    </>
  )
}

export default FavoritesIndex