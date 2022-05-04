import CryptosIndex from './cryptos/CryptosIndex'

const Home = (props) => {

const {user} = props
  return (
    <>
      <CryptosIndex
      user = {user}
      />
    </>
  )
}

export default Home
