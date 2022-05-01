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
  //   const navigate = useNavigate()

  const [favorites, setFavorites] = useState(null)
  const [mData, setMData] = useState(null)
  const [updated, setUpdated] = useState(false)

  const navigate = useNavigate()

  let coins = []
  let query = ''
  const { user } = props
  useEffect(() => {
    const fetchData = async () => {
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

  const onAddSome = () => {
    navigate('/home')
  }

  if (favorites == null) {
    return <span class="loader"></span>
  }
  //    else if (favorites.data.favorites.length > 0) {
  //         const favoriteData = getSeveral(query)
  //         console.log('the coins', favoriteData)
  //         setMData(favoriteData)
  //     }
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

  const handleDelete = (e, favoritesId) => {
    e.preventDefault()

    deleteFavorite(user, favoritesId)
      .then(() => setUpdated(true))
      .catch((err) => console.log(err))
  }

  // console.log when you know favs are empty, vs when there are favs vs waiting for a response
  // if empty load "add favorites"

  if (!mData) {
    return <span class="loader"></span>
  }

  console.log('market favortie data', mData)
  let favoriteCards = mData.data.map((crypto) => (
    // <Card
    //   key={crypto.id}
    //   style={{ width: '15%' }}
    //   className="text-centered m-2"
    // >
    //   <Card.Header>
    //     {crypto.name} ({crypto.symbol})
    //   </Card.Header>
    //   <Card.Body>
    //     <img src={crypto.image} alt={crypto.name} />
    //   </Card.Body>
    //   <Card.Footer>
    //     Price: ${crypto.current_price}
    //     <Link style={{ color: 'black' }} to={`/crypto/${crypto.id}`}>
    //       View Coin
    //     </Link>
    //     <Form onClick={(e) => handleDelete(e, crypto.id)}>
    //       <Button type="button" variant="danger">
    //         <BsFillTrashFill fontSize="18px" />
    //       </Button>
    //     </Form>
    //   </Card.Footer>
    //   </Card>

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
