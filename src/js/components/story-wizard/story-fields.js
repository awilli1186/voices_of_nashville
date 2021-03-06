import React from 'react';

let StoryFields = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Story Details</h2>
        <ul className="form-fields">
          <li>
            <label>Title</label>
            <input type="text" ref="title" placeholder='Title' defaultValue={this.props.fieldValues.title} />
          </li>
          <li>
            <label>Story</label>
            <textarea type="text" ref="story" placeholder='Story Discription' defaultValue={this.props.fieldValues.story} />
          </li>
          <li>
            <label>Submitter Name</label>
            <input type="text" ref="name" placeholder='First and Last Name'defaultValue={this.props.fieldValues.name} />
          </li>
          <li>
            <label>Historic Date</label>
            <input type="text" ref="date" placeholder='mm-dd-yyyy' defaultValue={this.props.fieldValues.date} />
          </li>
          <li className="form-footer">
            <button className="btn btn-default pull-left" onClick={this.props.previousStep}>Back</button>
            <button className="btn btn-primary pull-right" onClick={this.saveAndContinue}>Save &amp; Continue</button>
          </li>
      </ul>
      </div>
    )
  },

  saveAndContinue: function(e) {
    e.preventDefault()

    // Get values via this.refs
    let data = {
      title : React.findDOMNode(this.refs.title).value,
      story : React.findDOMNode(this.refs.story).value,
      name : React.findDOMNode(this.refs.name).value,
      date : React.findDOMNode(this.refs.date).value
    }

    this.props.saveValues(data)
    this.props.nextStep()
  }
})

export default StoryFields;
