import React, { Component } from "react"
import format from "date-fns/format"
import { Segment, Grid, Icon } from "semantic-ui-react"

class EventDetailInfo extends Component {
  state = { showMap: false }

  handleMapToggle = () => {
    this.setState(prevState => ({
      showMap: !prevState.showMap
    }))
  }

  render() {
    // console.log(this.props)
    const { event } = this.props

    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="teal" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{event.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>
                {format(event.date, "dddd Do MMMM")} at{" "}
                {format(event.date, "h:mm A")}
              </span>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
    )
  }
}

export default EventDetailInfo
