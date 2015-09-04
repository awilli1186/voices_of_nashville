import React from 'react';
import Parse from '../../parse';
import $ from 'jquery';
import SearchFields from '../story-wizard/search-fields';
import StoryFields from '../story-wizard/story-fields';
import MediaFields from '../story-wizard/media-fields';
import Confirmation from '../story-wizard/confirmation';
import Success from '../story-wizard/success';
import assign from 'object-assign';


let fieldValues = {
  location   : null,
  title      : '',
  story      : '',
  name       : '',
  date       : '',
  media      : null,
  tag        : ''
}

let StoryForm = React.createClass({
  getInitialState() {
    return {
      step : 1
    }
  },

  saveValues(field_value) {
    return function() {
      fieldValues = assign({}, fieldValues, field_value)
    }.bind(this)()
  },

  nextStep() {
    this.setState({
      step : this.state.step + 1
    })
  },

  previousStep() {
    this.setState({
      step : this.state.step - 1
    })
  },

  submitStory() {

    let point = new Parse.GeoPoint(fieldValues.location.coordinates);
    let Story = Parse.Object.extend("Story");
    let story = new Story();

    story.set('location', point);
    story.set('address', fieldValues.location.placeName);
    story.set('title', fieldValues.title);
    story.set('story', fieldValues.story);
    story.set('name', fieldValues.name);
    story.set('date', fieldValues.date);
    story.set('media', fieldValues.media);

    story.save(story).then(function(object) {
    });
    this.nextStep()
  },

  showStep() {
    switch (this.state.step) {
      case 1:
        return <SearchFields  fieldValues={fieldValues}
                              nextStep={this.nextStep}
                              saveValues={this.saveValues} />
      case 2:
        return <StoryFields  fieldValues={fieldValues}
                             nextStep={this.nextStep}
                             previousStep={this.previousStep}
                             saveValues={this.saveValues} />
      case 3:
        return <MediaFields  fieldValues={fieldValues}
                             nextStep={this.nextStep}
                             previousStep={this.previousStep}
                             saveValues={this.saveValues} />

      case 4:
        return <Confirmation fieldValues={fieldValues}
                             previousStep={this.previousStep}
                             submitStory={this.submitStory}
                             nextStep={this.nextStep} />

      case 5:
        return <Success />

    }
  },

  render() {
    let style = {
      width : (this.state.step / 5 * 100) + '%'
    }

    return (
      <main>
        <span className="progress-step">Step {this.state.step}</span>
        <progress className="progress1" style={style}></progress>
        {this.showStep()}
      </main>
    )
  }
})

export default StoryForm;
