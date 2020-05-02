import React, { Component } from "react"
import { connect } from "react-redux"
import { reduxForm, Field } from "redux-form"
import { withFirestore } from "react-redux-firebase"
import { Grid, Header, Segment, Form, Button } from "semantic-ui-react"

import TextInput from "../../../app/common/form/TextInput"
import TeaxtArea from "../../../app/common/form/TextArea"
import DateInput from "../../../app/common/form/DateInput"
import { createEvent, updateEvent, cancelToggle } from "../eventActions"
import { validate } from "../../../app/common/form/formValidate"

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  async componentDidMount() {
    const { firestore, match } = this.props
    await firestore.setListener(`events/${match.params.id}`)
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props
    await firestore.unsetListener(`events/${match.params.id}`)
  }

  handleScriptLoad = () => this.setState({ scriptLoaded: true })

  onFormSubmit = async values => {
    const {
      initialValues,
      createEvent,
      updateEvent,
      history,
      event
    } = this.props
    values.venueLatLng = this.state.venueLatLng

    if (initialValues.id) {
      if (Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = event.venueLatLng
      }
      await updateEvent(values)
      history.goBack()
    } else {
      createEvent(values)
      history.push("/events")
    }
  }

  render() {
    const {
      invalid,
      submitting,
      pristine,
      event,
      cancelToggle,
      loading
    } = this.props
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name"
              />

              <Field
                name="description"
                type="text"
                rows={3}
                component={TeaxtArea}
                placeholder="Tell us about your event"
              />
              <Header sub color="teal" content="Event Location Details" />
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                placeholder="Event Date"
              />
              <Button
                positive
                type="submit"
                loading={loading}
                disabled={invalid || submitting || pristine}
              >
                Submit
              </Button>
              <Button
                disabled={loading}
                type="button"
                onClick={this.props.history.goBack}
              >
                Cancel
              </Button>
              {event && (
                <Button
                  onClick={() => cancelToggle(!event.cancelled, event.id)}
                  type="button"
                  color={event.cancelled ? "green" : "red"}
                  content={
                    event.cancelled ? "Reactivate Event" : "Cancel Event"
                  }
                  floated="right"
                />
              )}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = ({ firestore: { ordered }, async: { loading } }) => {
  let event = {}
  if (ordered.events) {
    event = ordered.events[0]
  }

  return {
    // "initialValues" provides the redux-form the initial data to populate with
    initialValues: event,
    loading,
    event
  }
}

export default withFirestore(
  connect(
    mapStateToProps,
    { createEvent, updateEvent, cancelToggle }
  )(
    reduxForm({ form: "eventForm", enableReinitialize: true, validate })(
      EventForm
    )
  )
)
