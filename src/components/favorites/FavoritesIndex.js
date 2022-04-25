import React, { useState, useEffect } from 'react'
import { getAllFavorites } from '../../api/favorites'
import { Spinner, Card } from 'react-bootstrap'
import { showCrypto } from '../../api/cryptos'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const FavoritesIndex = (props) => {

//   const navigate = useNavigate()

  const [favorites, setFavorites] = useState(null)
    const { user } = props
    
  useEffect(() => {
    getAllFavorites(user)
      .then((res) => {
        setFavorites(res.data.favorites)
        // console.log(res.data)
      })
      .catch((err) => console.log(err))
  }, [])
    console.log('the favorites', favorites)

    
        if (!favorites) {
            return<Spinner animation="border" role="status">
            <span className="visually-hidden">Loading</span>
          </Spinner>
    } 
    

    let coins = []
        favorites.map((crypto) => {
            showCrypto(crypto.coinGeckId)
            coins.push(crypto.coinGeckId)
        // console.log('the coins', crypto.coinGeckId)
    })
    console.log('the coins', coins)
    
    
    
    
    
//     let favoriteCards = cryptos.map((crypto) => (
//         <Card key={crypto.id} style={{ width: '30%' }} className="text-centered m-2">
//         <Card.Header>{crypto.name} ({crypto.symbol})</Card.Header>
//         <Card.Body>
//         <img src={crypto.image} alt={crypto.name} />
//       </Card.Body>
//       <Card.Footer>
//         Price: ${crypto.current_price}
//         <Link style={{color : "black"}} to={`/crypto/${crypto.id}`}>View Coin</Link>
//       </Card.Footer>
//     </Card>
//   ))

  

  return (
    <>
      <h1 className='logo'>Top Cryptos</h1>
    </>
  )
}

export default FavoritesIndex
