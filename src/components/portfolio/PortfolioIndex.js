import React, { useState, useEffect} from 'react'
import {Row, Col, ListGroup } from 'react-bootstrap'
import { viewPortfolio, getPData } from '../../api/portfolio'
import { Link } from 'react-router-dom'
import {BsPlusLg,BsArrowLeftRight,BsTrash,BsCashCoin} from 'react-icons/bs'
import CreateCoinModal from './CreateCoinModal'
import { addCoinAsset, deleteCoin } from '../../api/coin'
import CreateTransactionModal from './CreateTransactionModal'
import { createTransaction,removeAllTransactions,showCoinPurchases} from '../../api/transaction'
import Plot from 'react-plotly.js'

const PortfolioIndex = (props) => {

  // mData == Market Data -> state var to set current market data of user's assets
  const [mData, setMData] = useState(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [newTransOpen, setNewTransOpen] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [coinName,setCoinName] = useState(null)
  const [coinnames,setCoinnames] = useState(null)
  const [coinValues,setCoinValues] = useState(null)
  const [balance,setBalance] = useState(0)
  const { user,msgAlert} = props
  let assetsDisplay = null
  let query = ""
  let addNewTransModal
  let piechart
  let chartData

  // calls backend server for portfolio assets then uses info to make an external api call to grab market data
  useEffect(() => {
    setUpdated(false)
    const fetchData = async () => {
      const respAssets = await viewPortfolio(user)
      const respCoins = respAssets.data.portfolio[0].assets
      let coinnameArr = []
      let coinQtyArr = []
      let tempBal = 0
      let coinObj = {}
      // creates query string for external api & creates coinObj
      for (let i in respCoins) {
        query+=`${respCoins[i].coinGeckId}%2C`
        coinnameArr.push(respCoins[i].coinGeckId)
        coinObj[respCoins[i].coinGeckId]=respCoins[i]
      }
      const respMData = await getPData(query)

      // updates the response data with average price and quantity of assets
      for (let i in respMData.data) {
        //currCoin == current coin
        let currCoin =respMData.data[i]
        currCoin.avgPrice = coinObj[currCoin.id].avgPrice
        currCoin.quantity = coinObj[currCoin.id].quantity
        currCoin.coinImg = currCoin.image
        currCoin.coinId = coinObj[currCoin.id]._id
        // adds profit loss amount and precentage to currCoin object; pl == profit loss
        currCoin.pl_amount =(((currCoin.current_price/currCoin.avgPrice)-1))*(currCoin.avgPrice*currCoin.quantity)
        currCoin.pl_precentage = (((currCoin.current_price/currCoin.avgPrice)-1))*100
        coinQtyArr.push(currCoin.quantity*currCoin.current_price)
        tempBal+=(currCoin.current_price*currCoin.quantity)
      }
      setBalance(tempBal)
      setCoinnames(coinnameArr)
      setCoinValues(coinQtyArr)
      setMData(respMData.data)
    }
    // determines if portfolio has any coins to render
    const initialFetch = async () => {
      // work around to allow portfolio to be updated
      await viewPortfolio(user)
      let checkPortfolio = await viewPortfolio(user)
      if (checkPortfolio.data.portfolio[0].assets.length>0) {
        fetchData()
      } else {
        setBalance(0)
        return setMData([])
      }
    }
    initialFetch()
  }, [updated])

  // handle function to create new transaction
  const handleCreate = (e) => {
    setCreateOpen(true)
  }

  // handle function to add a transaction to a preexisting coin
  const handleAddTrans = (e,coinId) => {
    setCoinName(coinId)
    setNewTransOpen(true)
  }

  const handleDelete = (e, coinId,name) => {
    e.preventDefault()    
    deleteCoin(user, coinId)
      .then(() => removeAllTransactions(user,name))
      .then(()=>setUpdated(true))
    .catch((err) => console.log(err))   
  }
  
  let layout = {
    title: {
      text: "Allocation",
      font: {
        color: 'white',
        size: 23,
      }
    },
    annotations: [
      {
        showarrow: false,
        text: '',
        x: 0.82,
        y: 0.5
      }
    ],
    height: 400,
    width: 500,
    legend: {
      orientation: 'h',
      traceorder: 'normal',
      font: {
        family: 'sans-serif',
        size: 12,
        color: 'white'
      },
      borderwidth: 2,
      bordercolor:'white'
    },
    paper_bgcolor:'transparent',
    grid: {rows: 1, columns: 1}
  };


  if(!mData) {
    return <span class="loader"></span>
  }
  else if (mData === [] ) {
    return <button onClick={handleCreate}>Add Transaction</button>
  }


  if (coinName !== null) {
    addNewTransModal = <CreateCoinModal
      coinId={coinName}
      show={newTransOpen}
      user={user}
      msgAlert={msgAlert}
      triggerRefresh={() => setUpdated(prev => !prev)}
      createTransaction={createTransaction}
      showCoinPurchases={showCoinPurchases}
      addCoinAsset={addCoinAsset}
      handleClose={() => {
        setUpdated(true)
        setCoinName(null)
        setNewTransOpen(false)
      }}
    />  
  } 


  if(mData.length>0) {
    if (coinValues.length>0) {
      chartData = [{
        values: coinValues,
        labels: coinnames,
        name: 'Crypto Assets',
        hoverinfo: 'label+percent+name',
        hole: 0.8,
        type: 'pie'
      }]
      piechart = <Plot data={chartData} layout={layout}/>
    }

    assetsDisplay = mData.map( (coin,index) => (
        <ListGroup.Item style={{backgroundColor:'transparent',borderTop:'1px grey solid', color:'white'}} key={coin._id}>
            <Row style={{alignItems:'center'}}>
                <Col md={3}>
                <img src={coin.image} alt={coin.name} width={25} style={{borderRadius:'50%'}}/> <strong>{coin.name}</strong> {coin.symbol.toUpperCase()}
                </Col>
                <Col>
                ${coin.current_price>1?coin.current_price.toLocaleString('en-US'):coin.current_price.toPrecision(4)}
                </Col>
                <Col>
                <span style={coin.price_change_percentage_24h>0?{color:'green',fontWeight:'bold'}:{color:"red",fontWeight:'bold'}}>{coin.price_change_percentage_24h.toFixed(2)}%</span>
                </Col>
                <Col>
                <Row>{(coin.current_price*coin.quantity).toLocaleString('en-US', {style:'currency',currency:'USD'})}</Row>
                <Row>{coin.quantity} {coin.symbol.toUpperCase()}</Row>

                </Col>
                <Col>
                ${coin.avgPrice>1?coin.avgPrice.toLocaleString('en-US'):coin.avgPrice.toPrecision(4)}
                </Col>
                <Col style={coin.pl_precentage>0?{color:'green'}:{color:"red"}}>
                  <Row>{coin.pl_amount>0?`+${coin.pl_amount.toLocaleString('en-US', {style:'currency',currency:'USD'})}`:`-${(-1*coin.pl_amount).toLocaleString('en-US', {style:'currency',currency:'USD'})}`} </Row>
                  <Row>{coin.pl_precentage.toFixed(2)}% </Row>
                </Col>
                <Col>
                &nbsp;<BsPlusLg type='button' onClick={(e)=>handleAddTrans(e,coin.id)}/> &nbsp;&nbsp;
                  <Link 
                    style={{ fontSize:'115%',textDecoration: 'none'}} 
                    to={`/transaction/${coin.id}`} 
                    state={{currPrice:coin.current_price,daily:coin.price_change_percentage_24h,symbol:coin.symbol,img:coin.coinImg,name:coin.name,coinId:coin.coinId}}>
                      <BsArrowLeftRight/> 
                  </Link>
                  &nbsp;&nbsp;<BsTrash type='button' onClick={(e) => handleDelete(e, coin.coinId,coin.id)}/>
                </Col>
            </Row>
        </ListGroup.Item>
        
    ))
}

  

  return (
    <>
    <div className='portfolio-container'>
      <h3 className='title'>Portfolio</h3>
      <div className='portfolio-detail'>
        {piechart}
        <div className="balance">
          <p>Current Balance</p>
          <h3>{balance.toLocaleString('en-US', {style:'currency',currency:'USD'})}</h3>
          <button className="transaction-btn" onClick={handleCreate}><BsCashCoin/> Add Transaction</button>
        </div>
      </div>
      <ListGroup style={{width:'75%'}}>
        <ListGroup.Item style={{backgroundColor:'transparent',color:'white',fontWeight:'bold',fontSize:'25px'}}>Crypto Assets</ListGroup.Item>
        <ListGroup.Item style={{backgroundColor:'transparent',borderTop:'1px grey solid',color:'white',fontWeight:'bold'}} >
          <Row >
            <Col md={3}>
            Name
            </Col>
            <Col>
            Price
            </Col>
            <Col>
            24H (%)
            </Col>
            <Col>
            Holdings
            </Col>
            <Col>
            Avg. Buy Price
            </Col>
            <Col>
            Profit/Loss
            </Col>
            <Col>
            Actions
            </Col>
          </Row>
        </ListGroup.Item>
        {assetsDisplay}
      </ListGroup>
      </div>
      {addNewTransModal}
      <CreateTransactionModal
        show={createOpen}
        user={user}
        msgAlert={msgAlert}
        triggerRefresh={() => setUpdated(prev => !prev)}
        createTransaction={createTransaction}
        showCoinPurchases={showCoinPurchases}
        addCoinAsset = {addCoinAsset}
        handleClose={() => {
          setCreateOpen(false)
          setUpdated(true)
        }
        }
      />  
    </>
  )
}

export default PortfolioIndex
