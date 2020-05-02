import React from "react"
import { Link } from "react-router-dom"
import format from "date-fns/format"
import { Segment, Item, Icon, List, Button, Label } from "semantic-ui-react"

import EventListAttendee from "./EventListAttendee"
import { objToArr } from "../../../app/common/utils/helpers"

const renderAttendees = attendees =>
  attendees &&
  objToArr(attendees).map(attendee => (
    <EventListAttendee key={attendee.id} attendee={attendee} />
  ))

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
