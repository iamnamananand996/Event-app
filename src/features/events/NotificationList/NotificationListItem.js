import React from "react"
import { Link } from "react-router-dom"
import { Segment, Item, Label } from "semantic-ui-react"

const EventListItem = ({ event }) => (
  <Segment.Group>
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image size="tiny" circular src={event.photoURL} />
          <Item.Content>
            <Item.Header as={Link} to={`/event/${event.eventId}`}>
              {event.title}
            </Item.Header>
            <Item.Description>
              {event.hostedBy} has {event.type}
            </Item.Description>
            {event.cancelled && (
              <Label
                style={{ top: -40 }}
                color="red"
                ribbon="right"
                content="Event has been cancelled"
              />
            )}
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  </Segment.Group>
)

export default EventListItem
