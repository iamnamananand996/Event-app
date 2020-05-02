import React, { Component } from "react"
import { connect } from "react-redux"
import { reduxForm, Field } from "redux-form"
import { Grid, Header, Segment, Form, Button } from "semantic-ui-react"

import TextInput from "../../../app/common/form/TextInput"
import TeaxtArea from "../../../app/common/form/TextArea"
import DateInput from "../../../app/common/form/DateInput"
import { createEvent } from "../eventActions"
import { validate } from "../../../app/common/form/formValidate"

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  handleScriptLoad = () => this.setState({ scriptLoaded: true })

  onFormSubmit = values => {
    const { createEvent, history } = this.props
    values.venueLatLng = this.state.venueLatLng

    createEvent(values)
    history.push("/events")
  }

  render() {
    const { invalid, submitting, pristine } = this.props
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
                disabled={invalid || submitting || pristine}
              >
                Submit
              </Button>
              <Button type="button" onClick={this.props.history.goBack}>
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(
  null,
  { createEvent }
)(reduxForm({ form: "eventForm", validate })(EventForm))
