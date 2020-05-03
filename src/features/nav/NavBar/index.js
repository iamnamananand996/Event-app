import React, { Component } from "react"
import { connect } from "react-redux"
import { NavLink, Link, withRouter } from "react-router-dom"
import { withFirebase } from "react-redux-firebase"
import { Menu, Container, Button } from "semantic-ui-react"

import LoggedInMenu from "../Menus/LoggedInMenu"
import SignedOutMenu from "../Menus/SignedOutMenu"
import { openModal } from "../../modals/modalActions"

import firebase from "../../../app/config/firebase"

class NavBar extends Component {
  state = {
    notificationCount: 0
  }
  async componentDidUpdate() {
    const firestore = firebase.firestore()
    const eventsRef = await firestore.collection("activity").get()
    // console.log("did mount", eventsRef.docs.length)
    this.setState({ notificationCount: eventsRef.docs.length })
  }

  handleSignIn = () => {
    this.props.openModal("LoginModal")
  }

  handleRegister = () => {
    this.props.openModal("RegisterModal")
  }

  handleSignOut = () => {
    this.props.firebase.logout()
    this.props.history.push("/")
  }

  render() {
    const { auth, profile } = this.props
    const authenticated = auth.isLoaded && !auth.isEmpty
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="assets/logo.png" alt="logo" />
            Events App
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="All Events" />
          {authenticated ? (
            [
              <Menu.Item
                key={1}
                as={NavLink}
                to="/myevents"
                name="My Events"
              />,
              <Menu.Item key={2}>
                <Button
                  as={Link}
                  to="/createEvent"
                  floated="right"
                  inverted
                  content="Create Event"
                />
              </Menu.Item>,
              <LoggedInMenu
                key={3}
                auth={auth}
                profile={profile}
                notificationCount={this.state.notificationCount}
                signOut={this.handleSignOut}
              />
            ]
          ) : (
            <SignedOutMenu
              signIn={this.handleSignIn}
              register={this.handleRegister}
            />
          )}
        </Container>
      </Menu>
    )
  }
}

const mapStateToProps = ({ firebase: { auth, profile } }) => ({
  auth,
  profile
})

export default withRouter(
  withFirebase(
    connect(
      mapStateToProps,
      { openModal }
    )(NavBar)
  )
)
