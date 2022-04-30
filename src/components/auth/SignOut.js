import { useNavigate } from 'react-router-dom'
import '../../landing.css'

import { Button, ButtonGroup } from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
  const { msgAlert, clearUser, user } = props
  console.log(props)

  const navigate = useNavigate()

  const onSignOut = () => {
    signOut(user)
      .finally(() =>
        msgAlert({
          heading: 'Signed Out Successfully',
          message: messages.signOutSuccess,
          variant: 'success',
        })
      )
      .finally(() => navigate('/'))
      .finally(() => clearUser())
  }

  const onCancel = () => {
    navigate('/home')
  }

  return (
    <>
      <div className="landing-container">
        <section className="wrapper">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
        </section>
        <div className="signin-container signout-form mx-auto">
          <div className="row">
            <div className="col-sm-10 col-md-8 mx-auto mt-5">
              <h2>Are you sure you want to sign out?</h2>
              <small>We hate to see you go...</small>
              <br />
              <ButtonGroup>
                <Button variant="secondary" onClick={onSignOut}>
                  Sign Out
                </Button>
                <Button variant="warning" onClick={onCancel}>
                  Cancel
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignOut
