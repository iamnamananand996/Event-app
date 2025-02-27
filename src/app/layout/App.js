import React from "react"
import { Container } from "semantic-ui-react"
import { Switch, Route } from "react-router-dom"
import Loadable from "react-loadable"

import LoadingSpinner from "../../app/layout/LoadingSpinner"
import { AuthenticatedUser } from "../../features/auth/authWrapper"

const AsyncHomePage = Loadable({
  loader: () => import("../../features/home"),
  loading: LoadingSpinner
})

const AsyncNotification = Loadable({
  loader: () => import("../../features/events/Notification"),
  loading: LoadingSpinner
})

const AsyncEventDashboard = Loadable({
  loader: () => import("../../features/events/EventDashboard"),
  loading: LoadingSpinner
})

const AsyncMyEvent = Loadable({
  loader: () => import("../../features/events/MyEvent"),
  loading: LoadingSpinner
})
const AsyncNavBar = Loadable({
  loader: () => import("../../features/nav/NavBar"),
  loading: LoadingSpinner
})
const AsyncCreateEventForm = Loadable({
  loader: () => import("../../features/events/EventForm/CreateEventForm"),
  loading: LoadingSpinner
})
const AsyncManageEventForm = Loadable({
  loader: () => import("../../features/events/EventForm/ManageEventForm"),
  loading: LoadingSpinner
})

const AsyncUserDetail = Loadable({
  loader: () => import("../../features/user/UserDetail"),
  loading: LoadingSpinner
})

const AsyncEventDetail = Loadable({
  loader: () => import("../../features/events/EventDetail"),
  loading: LoadingSpinner
})
const AsyncModalManager = Loadable({
  loader: () => import("../../features/modals/ModalManager"),
  loading: LoadingSpinner
})
const AsyncNotFound = Loadable({
  loader: () => import("./NotFound"),
  loading: LoadingSpinner
})

const App = () => (
  <div>
    <AsyncModalManager />
    <Switch>
      <Route exact path="/" component={AsyncHomePage} />
    </Switch>

    <Route
      path="/(.+)"
      render={() => (
        <div>
          <AsyncNavBar />
          <Container className="main">
            <Switch>
              <Route path="/events" component={AsyncEventDashboard} />
              <Route path="/event/:id" component={AsyncEventDetail} />
              <Route
                path="/manage/:id"
                component={AuthenticatedUser(AsyncManageEventForm)}
              />

              <Route
                path="/profile/:id"
                component={AuthenticatedUser(AsyncUserDetail)}
              />

              <Route
                path="/createEvent"
                component={AuthenticatedUser(AsyncCreateEventForm)}
              />
              <Route
                path="/myevents"
                component={AuthenticatedUser(AsyncMyEvent)}
              />
              <Route
                path="/notification"
                component={AuthenticatedUser(AsyncNotification)}
              />
              <Route component={AsyncNotFound} />
            </Switch>
          </Container>
        </div>
      )}
    />
  </div>
)

export default App
