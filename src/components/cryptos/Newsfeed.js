import { useEffect } from "react"
import { getCryptoNews } from "../../api/cryptos"
import { Row, Col, ListGroup, Button, Container, Carousel} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'


const Newsfeed = (props) => {
  const { news, trending } = props
  let newsData = []
  let trendingData = []
    // useEffect(()=>{
    //     getCryptoNews()
    //         .then(res=>{
    //             console.log('this is the news',res)
    //         })
    // })

  if (news.length > 0) {
    console.log('news dater', news)
    newsData = news.slice(0, 6).map((article) => {
      return (
            <ListGroup.Item style={{backgroundColor:'transparent', borderTop:'grey 1px solid'}} variant="dark" key={article._id} >
          <a href={article.url}>
                <Row style={{ alignItems: 'center' }}>
                {article.title}
                </Row>
              </a>
            </ListGroup.Item>
          )
        })
  }

  if (trending.length > 0) {
    trendingData = 
      (
      <>
        <div style={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>  
        <h1 className="trend-container" style={{ color: 'white', }}>Trending Coins</h1>
        <Carousel style={{ width: '60%' }}>
          <Carousel.Item>
            <Link to={`/crypto/${trending[0].item.id}`}>
            <img
            className="d-block w-100"
            src={trending[0].item.large}
            alt="First slide"
            />
            <Carousel.Caption>
                <h3 style={{display: 'inline-block', color:'white', backgroundColor:'black'}}>{trending[0].item.name}</h3><br/>
              <p style={{display: 'inline-block', color:'white', backgroundColor:'black'}}>Market Cap Rank: {trending[0].item.market_cap_rank}</p>
            </Carousel.Caption>
            </Link>
          </Carousel.Item>
          <Carousel.Item className="carousel">
            <Link to={`/crypto/${trending[1].item.id}`}>
            <img
              className="d-block w-100"
              src={trending[1].item.large}
              alt="First slide"
              />
            <Carousel.Caption>
              <h3 style={{display: 'inline-block', color:'white', backgroundColor:'black'}}>{trending[1].item.name}</h3><br/>
              <p style={{display: 'inline-block', color:'white', backgroundColor:'black'}}>Market Cap Rank: {trending[1].item.market_cap_rank}</p>
              </Carousel.Caption>
              </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to={`/crypto/${trending[2].item.id}`}>

            <img
              className="d-block w-100"
              src={trending[2].item.large}
              alt="First slide"
              />
            <Carousel.Caption>
              <h3 style={{display: 'inline-block', color:'white', backgroundColor:'black'}}>{trending[2].item.name}</h3><br/>
              <p style={{display: 'inline-block', color:'white', backgroundColor:'black'}}>Market Cap Rank: {trending[2].item.market_cap_rank}</p>
              </Carousel.Caption>
              </Link>
          </Carousel.Item>
          <Carousel.Item>
              <Link to={`/crypto/${trending[3].item.id}`}>

            <img
              className="d-block w-100"
              src={trending[3].item.large}
              alt="First slide"
              />
            <Carousel.Caption>
              <h3 style={{display: 'inline-block', color:'white', backgroundColor:'black'}}>{trending[3].item.name}</h3><br/>
              <p style={{display: 'inline-block', color:'white', backgroundColor:'black'}} >Market Cap Rank: {trending[3].item.market_cap_rank}</p>
              </Carousel.Caption>
              </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to={`/crypto/${trending[4].item.id}`}>

            <img
              className="d-block w-100"
              src={trending[4].item.large}
              alt="First slide"
              />
            <Carousel.Caption>
              <h3 style={{display: 'inline-block', color:'white', backgroundColor:'black'}}>{trending[4].item.name}</h3><br/>
              <p style={{display: 'inline-block', color:'white', backgroundColor:'black'}}>Market Cap Rank: {trending[4].item.market_cap_rank}</p>
              </Carousel.Caption>
              </Link>
          </Carousel.Item>
          
        </Carousel>
        </div>
              </>
      )
  }
  
  
  console.log('trending in news component', trending)
  
  return (
      <Container>
        <Row className="justify-content-md-center">
        <Col className='index-col'>
          {trendingData}
        </Col>
        <Col className='index-col'>
          <h1 style={{color: 'white'}}>Stay Up-To-Date with Crypto</h1>
          {newsData}
        </Col>
        </Row>
      </Container>
  )
}

export default Newsfeed
