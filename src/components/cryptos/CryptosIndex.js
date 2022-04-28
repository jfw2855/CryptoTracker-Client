import React, { useState, useEffect, Fragment } from 'react'
import { getCryptos } from '../../api/cryptos'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner, Card, Row, Col, ListGroup, Button } from 'react-bootstrap'
import { BsStar, BsFillStarFill } from "react-icons/bs";
import { getAllFavorites, deleteFavorite, createFavorite } from '../../api/favorites'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const CryptosIndex = (props) => {

  const navigate = useNavigate()
  const { user } = props


  const [favorites, setFavorites] = useState([])
  const [updated, setUpdated] = useState(false)
  const [fav, setFav] = useState(false)


  const [cryptos, setResults] = useState(null)
  let assetsDisplay = null
  let starFav = null


  useEffect(() => {
    const fetchData = async () => {
      getCryptos()
        .then((res) => 
        setResults(res.data)
      )
      if (user) {      
        getAllFavorites(user)
          .then((res) => {
            setFavorites(res.data.favorites)
            setUpdated(false)
          // console.log('index favs', res)
        })
      } else {
        console.log('no user')
      }
    }
    fetchData()
  }, [updated])
  
  console.log('the response', cryptos)
  console.log('favorite on index', favorites)



  if (!cryptos) {
    return <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading</span>
    </Spinner>
  }
  
 const handleFavorite = (e, id) => {
    e.preventDefault()

    // createFavorite(user, crypto)
    if (items.includes(id)) {
      // delete route
      deleteFavorite(user, id)
        .then(() => setUpdated(true))
        .catch((err) => console.log(err))

    } else {
      // add favorite
      createFavorite(user, id)
        .then(() => setUpdated(true))
        .catch((err) => console.log(err))
    }
  }

  

  const items = []
   if (favorites.length > 0) {
      for (let i = 0; i < favorites.length; i++){
      items.push(favorites[i].coinGeckId)
    }
  }
  console.log('a match', items)  
  

  if (cryptos.length > 0) {
    assetsDisplay = cryptos.map((crypto) => {
    return (
    <ListGroup.Item key={crypto._id}>
              <Link style={{ textDecoration: 'none', color: 'black' }} to={`/crypto/${crypto.id}`}>
                <Row style={{ alignItems: 'center' }}>
                  <Col>
                  <BsFillStarFill onClick={(e) => handleFavorite(e, crypto.id)} style={ items.includes(crypto.id) ? {color:'orange'} : {color:'black'} }type = "button" fontSize="14px" />
                    <span style={{ marginLeft: 5 }}>{crypto.market_cap_rank}</span>
                  </Col>
                  <Col>
                    <img src={crypto.image} alt={crypto.name} width={25} style={{ backgroundColor: "white" }} /> <strong>{crypto.name}</strong> {crypto.symbol.toUpperCase()}
                  </Col>
                  <Col>
                    ${crypto.current_price > 1 ? crypto.current_price.toLocaleString('en-US') : crypto.current_price.toPrecision(4)}
                  </Col>
                  <Col>
                    <span style={crypto.price_change_percentage_24h > 0 ? { color: 'green' } : { color: "red" }}>{crypto.price_change_percentage_24h.toFixed(2)}%</span>
                  </Col>
                  <Col>
                    ${crypto.market_cap.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </Col>
                </Row>
              </Link>
            </ListGroup.Item>
        
          )
        })
  }

  return (
    <>
        
      <ListGroup style={{ width: '85%' }}>
        <ListGroup.Item>
          <Row style={{ fontWeight: 'bold' }}>
            <Col>
              Rank
            </Col>
            <Col>
              Name
            </Col>
            <Col>
              Price
            </Col>
            <Col>
              24h %
            </Col>
            <Col>
              Market Cap
            </Col>
          </Row>
        </ListGroup.Item>
        {assetsDisplay}
        
      </ListGroup>
    </>
  )
}

export default CryptosIndex
