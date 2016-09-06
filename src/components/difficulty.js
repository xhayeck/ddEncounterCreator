var React = require('react');

var Difficulty = React.createClass({
  getInitialState: function() {
    return {
      difficulty: '',
      image: ''
    };
  },

  comparison: function() {
    if(this.props.challenge.partySize > 0) {
      if(this.props.xp.adjDifRat < this.props.challenge.easy) {
        this.state.difficulty = 'Trivial';
        this.state.image = '../images/trivial.gif'
        this.setState({difficulty: this.state.difficulty});
      } else if(this.props.xp.adjDifRat < this.props.challenge.medium) {
        this.state.difficulty = 'Easy';
        this.state.image = '../images/easy.gif'
        this.setState({difficulty: this.state.difficulty});
      } else if(this.props.xp.adjDifRat < this.props.challenge.hard) {
        this.state.difficulty = 'Medium';
        this.state.image = '../images/medium.gif'
        this.setState({difficulty: this.state.difficulty});
      } else if(this.props.xp.adjDifRat < this.props.challenge.deadly) {
        this.state.difficulty = 'Hard';
        this.state.image = '../images/hard.gif'
        this.setState({difficulty: this.state.difficulty});
      } else {
        this.state.difficulty = 'Deadly';
        this.state.image = '../images/deadly.gif'
        this.setState({difficulty: this.state.difficulty});
      }
    }
  },

  render: function() {
    return (
      <div className="party" >
        <h3>Encounter Difficulty</h3>
        <input type="button" value="How Hard Is This Fight Going To Be?" onClick={this.comparison} />
        <div className={this.state.difficulty}>
          <h1>{this.state.difficulty}</h1>
          <img className="image" src={this.state.image} />
        </div>
      </div>
    );
  }
});

module.exports = Difficulty;
