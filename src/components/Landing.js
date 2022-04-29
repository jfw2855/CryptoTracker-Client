import '../landing.css'

const Landing = (props) => {

const {user} = props
  return (
    <>
    <div className='landing-container'>
        <section className="wrapper">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
        
        </section>
        <div className='title-container'>
            <h1 className='title'>CryptoTracker</h1>
            <h4 className='blurb'>Track all of your crypto investments in one place</h4>
            <div className='button-container'>
                <button className='signup-btn'>Sign Up</button> <button className='login-btn'>Login</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Landing
