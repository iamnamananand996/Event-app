import React, { Component } from "react"
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firebase"
import { Grid, Loader } from "semantic-ui-react"

import EventList from "../EventList"
import { getMyEventsForDashboard } from "../eventActions"

const query = [
  {
    collection: "activity",
    orderBy: ["timestamp", "desc"],
    limit: 5
  }
]

class EventDashboard extends Component {
  state = {
    moreEvents: false,
    initialLoading: true,
    loadedEvents: [],
    contextRef: {}
  }

  async componentDidMount() {
    const next = await this.props.getMyEventsForDashboard()

    if (next && next.docs && next.docs.length > 1) {
      this.setState({ moreEvents: true, initialLoading: false })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
      })
    }
  }

  getNextEvents = async () => {
    const { events } = this.props
    let lastEvent = events && events[events.length - 1]
    let next = await this.props.getMyEventsForDashboard(lastEvent)

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({ moreEvents: false })
    }
  }

  handleContextRef = contextRef => this.setState({ contextRef })

  render() {
    const { loading } = this.props
    const { loadedEvents, moreEvents } = this.state

    // if (initialLoading) return <LoadingSpinner inverted={true} />

    return (
      <Grid>
        <Grid.Column width={2}>
          <div />
        </Grid.Column>
        <Grid.Column width={12}>
          <div ref={this.handleContextRef}>
            <EventList
              loading={loading}
              moreEvents={moreEvents}
              events={loadedEvents}
              getNextEvents={this.getNextEvents}
            />
          </div>
        </Grid.Column>
        <Grid.Column width={2}>
          <div />
        </Grid.Column>
        <Grid.Column width={2}>
          <div />
        </Grid.Column>
        <Grid.Column width={12}>
          <Loader active={loading} />
        </Grid.Column>
        <Grid.Column width={2}>
          <div />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = ({ events, async, firestore }) => ({
  events,
  loading: async.loading,
  activities: firestore.ordered.activity
})

export default connect(
  mapStateToProps,
  { getMyEventsForDashboard }
)(firestoreConnect(query)(EventDashboard))
