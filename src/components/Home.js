import CryptosIndex from './cryptos/CryptosIndex'

const Home = (props) => {
  // const { msgAlert, user } = props
  //   console.log('props in home', props)
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
