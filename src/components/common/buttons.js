var React = require('react');

var Buttons = React.createClass({
  render: function() {
    return (
      <div>
        <input type="button" value="Add Row" onClick={this.props.addRow} />
        <input type="button" value="Remove Row" onClick={this.props.subRow} />
      </div>
    );
  }
})

module.exports = Buttons;
