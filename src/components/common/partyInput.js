var React = require('react');

var Input = React.createClass({
  render: function() {
    return (
      <div >
        <form>
          <input type="text"
                 placeholder={this.props.partyType}
                 name={this.props.inputOneName}
                 className="input"
                 onChange={this.props.onChange}
                 value={this.props.inputOneValue} />
          <input type="text"
                 placeholder={this.props.partyType}
                 name={this.props.inputTwoName}
                 className="input"
                 onChange={this.props.onChange}
                 value={this.props.inputTwoValue} />
        </form>
      </div>
    );
  }
});

module.exports = Input;
