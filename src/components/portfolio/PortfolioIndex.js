import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { viewPortfolio } from '../../api/portfolio'

const PortfolioIndex = (props) => {

  const [assets,setAssets] = useState(null)
  const { user,msgAlert} = props
  let assetsDisplay = null


  useEffect(() => {
    viewPortfolio(user)
      .then((res) => {
        setAssets(res.data.portfolio[0].assets)
        //console.log('this IS PORTFOLIO', res.data.portfolio)
      })
      .catch((err) => console.log(err))
  }, [])
  
  if(!assets) {
    return <p>Loading...</p>
  } else {
    console.log('portfolio!!!!',assets)
  }


  

  return (
    <>
      <h1 className='logo'>Portfolio</h1>
    </>
  )
}

export default PortfolioIndex
