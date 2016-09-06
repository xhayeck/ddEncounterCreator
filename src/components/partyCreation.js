var React = require('react');
var Input = require('./common/partyInput');
var Buttons = require('./common/buttons');

var PcParty = React.createClass({
  getInitialState: function() {
    return {
      full: false
    };
  },

  onChange: function(key, event) {
    var field = event.target.name;
    var value = event.target.value;
    this.props.total[key][field] = value;
    this.setState({total: this.props.total});
    this.state.full = true;
    for(var i in this.props.total) {
      if(!this.props.total[i].players || !this.props.total[i].levels) {
        this.state.full = false;
      }
    }
    if(this.state.full) {
      this.calculate();
    }
  },

  xpLookup: function(level) {
      var xpLevels = {
    	1: [25, 50, 75, 100],
    	2: [50, 100, 150, 200],
    	3: [75, 150, 225, 400],
    	4: [125, 250, 375, 500],
    	5: [250, 500, 750, 1100],
    	6: [300, 600, 900, 1400],
    	7: [350, 750, 1100, 1700],
    	8: [450, 900, 1400, 2100],
    	9: [550, 1100, 1600, 2400],
    	10: [600, 1200, 1900, 2800],
    	11: [800, 1600, 2400, 3600],
    	12: [1000, 2000, 3000, 4500],
    	13: [1100, 2200, 3400, 5100],
    	14: [1250, 2500, 3800, 5700],
    	15: [1400, 2800, 4300, 6400],
    	16: [1600, 3200, 4800, 7200],
    	17: [2000, 3900, 5900, 8800],
    	18: [2100, 4200, 6300, 9500],
    	19: [2400, 4900, 7300, 10900],
    	20: [2800, 5700, 8500, 12700]
    };
    return xpLevels[level]
  },

  groupSize: function(size) {
    if(size < 3) {
      this.props.partyResults.group = '(Small)';
    }
    if(size > 2 && size < 6) {
      this.props.partyResults.group = '(Normal)';
    }
    if(size > 5) {
      this.props.partyResults.group = '(Large)'
    }
    this.setState({partyResults: this.props.partyResults});
  },

  calculate: function() {
    var easy = 0;
    var medium = 0;
    var hard = 0;
    var deadly = 0;
    var level = 0;
    var numberOfPlayers = 0;
    var totalPlayers = 0;
    this.props.total.forEach(function(entry) {
      level = parseInt(entry.levels);
      numberOfPlayers = parseInt(entry.players);
      totalPlayers += numberOfPlayers;
      if(level > 20) {
        level = 20;
      }
      var levelArray = this.xpLookup(level);
      easy += levelArray[0] * numberOfPlayers;
      medium += levelArray[1] * numberOfPlayers;
      hard += levelArray[2] * numberOfPlayers;
      deadly += levelArray[3] * numberOfPlayers;
    }, this);
    this.groupSize(totalPlayers);
    this.props.partyResults.partySize = totalPlayers;
    this.props.partyResults.easy = easy;
    this.props.partyResults.medium = medium;
    this.props.partyResults.hard = hard;
    this.props.partyResults.deadly = deadly;
    return this.setState({partyResults: this.props.partyResults});
  },

  addRow: function() {
    this.props.total.push({players: '', levels: ''});
    this.setState({total: this.props.total});
    this.state.full = false;
  },

  subRow: function() {
    this.props.total.pop();
    return this.setState({total: this.props.total});
  },

  render: function() {
    var LevelInputs = this.props.total.map(function(currentRow, index) {
      return <Input key={index}
                    partyType={this.props.partyType}
                    inputOneName="players"
                    inputTwoName="levels"
                    onChange={this.onChange.bind(this, index)}
                    inputOneValue={this.props.total[index].players}
                    inputTwoValue={this.props.total[index].levels} />
    }, this);

    return (
      <div className="party">
        <h3>Party</h3>
          <h5>
            <p className="inputTitle">Number of Characters</p>
            <p className="inputTitle">Character Levels</p>
          </h5>
          {LevelInputs}
        <br />
        <div>
          <Buttons addRow={this.addRow}
                   subRow={this.subRow} />
          <br />
          <h3>Results</h3>
          <p>Total Party Size: {this.props.partyResults.partySize} {this.props.partyResults.group}</p>
          <p>Easy: {this.props.partyResults.easy}</p>
          <p>Medium: {this.props.partyResults.medium}</p>
          <p>Hard: {this.props.partyResults.hard}</p>
          <p>Deadly: {this.props.partyResults.deadly}</p>
        </div>
      </div>
    );
  }

});

module.exports = PcParty;
