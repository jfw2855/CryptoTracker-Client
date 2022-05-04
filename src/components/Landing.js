import '../landing.css'
import { Link } from 'react-router-dom'

// creates a landing background for crypto tracker app
const Landing = () => {
  return (
    <>
      <div className="landing-container">
        <section className="wrapper">
          <div id="stars"></div>
          <div id="stars2"></div>
        </section>
        <div className="title-container">
          <h1 className="title">CryptoTracker</h1>
          <h4 className="blurb">
            Track all of your crypto investments in one place
          </h4>
          <div className="button-container">
            <Link type="button" className="signup-btn" to="sign-up">
              Sign Up
            </Link>{' '}
            <Link type="button" to="sign-in" className="login-btn">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
