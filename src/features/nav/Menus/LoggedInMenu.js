import React from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, Image, Dropdown } from "semantic-ui-react"

const LoggedInMenu = ({ signOut, profile, auth, notificationCount }) => (
  <Menu.Item position="right">
    <Menu.Item
      as={NavLink}
      to="/notification"
      name={String(notificationCount)}
      icon="bell"
    />
    <Image avatar spaced="right" src={profile.photoURL || "/assets/user.png"} />
    <Dropdown pointing="top left" text={profile.displayName}>
      <Dropdown.Menu>
        <Dropdown.Item
          as={Link}
          to="/createEvent"
          text="Create Event"
          icon="plus"
        />
        <Dropdown.Item
          as={Link}
          to="/myevents"
          text="My Events"
          icon="calendar"
        />
        <Dropdown.Item
          as={Link}
          to={`/profile/${auth.uid}`}
          text="My Profile"
          icon="user"
        />
        <Dropdown.Item text="Sign Out" icon="power" onClick={signOut} />
      </Dropdown.Menu>
    </Dropdown>
  </Menu.Item>
)

export default LoggedInMenu
