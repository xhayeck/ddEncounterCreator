var React = require('react');
var Input = require('./common/partyInput');
var Buttons = require('./common/buttons')

var MonsterParty = React.createClass({
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
      if(!this.props.total[i].monsters || !this.props.total[i].xp) {
        this.state.full = false;
      }
    }
    if(this.state.full) {
      this.calculate();
    }
  },

  addRow: function() {
    this.props.total.push({monsters: '', xp: ''});
    this.setState({total: this.props.total});
    this.state.full = false;
  },

  subRow: function () {
    this.props.total.pop();
    return this.setState({total: this.props.total});
  },

  groupcats: function(number) {
    var categories = ["none", "single", "pair", "group", "gang",	"mob", "horde"];
    this.props.monsterResults.group = '('+ categories[number] + ')';
    this.setState({monsterResults: this.props.monsterResults});
  },

  multiplierLookup: function(number) {
    multipliers = [0.5, 1, 1.5, 2 , 2.5, 3, 4, 5];
    this.props.monsterResults.multi = multipliers[number];
    this.setState({monsterResults: this.props.monsterResults});
    return multipliers[number];
  },

  getCR: function(xp) {
    var cr = 0;
    var crXPLookup = [25, 50, 100, 200, 450, 700, 1100, 1800, 2300, 2900, 3900, 5000, 5900, 7200, 8400, 10000, 11500, 13000, 15000, 18000, 20000, 22000, 25000, 33000, 41000, 50000, 62000, 75000, 90000, 105000, 120000, 135000, 155000];
    for(var i = 0; i < crXPLookup.length; i++) {
      if(crXPLookup[i] <= xp) {
        cr++;
      }
    }
    var crLookup = [
    "0","1/8","1/4","1/2","1","2","3","4","5",
    "6","7","8","9","10","11","12","13","14","15",
    "16","17","18","19","20","21","22","23","24","25",
    "26","27","28","29","30"]
    this.props.monsterResults.encountCR = crLookup[cr];
    this.setState({monsterResults: this.props.monsterResults});
  },

  calculate: function() {
    var multiplier = 0;
    var totsMonsters = 0;
    var mon = 0
    var totsXp = 0;
    this.props.total.forEach(function(entry) {
      totsMonsters += parseInt(entry.monsters);
      mon = parseInt(entry.monsters);
      totsXp += mon * parseInt(entry.xp);
    });
    if (totsMonsters > 0) multiplier++;
  	if (totsMonsters > 1) multiplier++;
  	if (totsMonsters > 2) multiplier++;
  	if (totsMonsters > 6) multiplier++;
  	if (totsMonsters > 10) multiplier++;
  	if (totsMonsters > 14) multiplier++;
    this.groupcats(multiplier);
    this.props.monsterResults.totalMonsters = totsMonsters;
    this.props.monsterResults.totalXp = totsXp;
    if(this.props.party >= 1 && this.props.party < 3) {
      multiplier++;
    } else if(this.props.party >= 6) {
      multiplier--;
    }
    var multip = this.multiplierLookup(multiplier);
    var adjustedXP = totsXp * multip;
    this.props.monsterResults.adjDifRat = adjustedXP;
    this.getCR(adjustedXP);
    return this.setState({monsterResults: this.props.monsterResults});
  },

  render: function() {
    var LevelInputs = this.props.total.map(function(currentRow, index) {
      return <Input key={index}
                    partyType={this.props.partyType}
                    inputOneName="monsters"
                    inputTwoName="xp"
                    onChange={this.onChange.bind(this, index)}
                    inputOneValue={this.props.total[index].monsters}
                    inputTwoValue={this.props.total[index].xp} />
    }, this);
    return (
      <div className="party">
        <h3>Monsters</h3>
        <h5>
          <p className="inputTitle">Number of Monsters</p>
          <p className="inputTitle">Monster XP</p>
        </h5>
        {LevelInputs}
        <div>
          <br />
            <Buttons addRow={this.addRow}
                     subRow={this.subRow} />
        </div>
        <div>
          <h3>Results</h3>
          <p>Total Monsters: {this.props.monsterResults.totalMonsters} {this.props.monsterResults.group}</p>
          <p>Total XP: {this.props.monsterResults.totalXp}</p>
          <p>Difficulty Multiplier: {this.props.monsterResults.multi}</p>
          <p>Adjusted Difficulty Rating: {this.props.monsterResults.adjDifRat} XP</p>
          <p>Encounter Challenge Rating: {this.props.monsterResults.encountCR}</p>
        </div>
    </div>
    );
  }
});

module.exports = MonsterParty;
