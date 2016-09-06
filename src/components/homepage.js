var React = require('react');
var Party = require('./partyCreation');
var Monsters = require('./monsterParty');
var Difficulty = require('./difficulty')

var Home = React.createClass({
  getInitialState: function() {
    return {
      partyType: ['Characters',
                  'Monsters'],
      total: [[{players: '', levels: ''}],
              [{monsters: '', xp: ''}]],
      results: [{easy: '', medium: '', hard: '', deadly: '', partySize: '', group: ''},
                {totalMonsters: '', totalXp: '', multi: '', adjDifRat: '', encountCR: '', group: '', encountDif: ''}]
    };
  },

  render: function() {
    return (
      <div className="homePage">
        <h1>Create Some Encounters!!!</h1>
        <Party partyType={this.state.partyType[0]}
               total={this.state.total[0]}
               partyResults={this.state.results[0]} />
        <Monsters partyType={this.state.partyType[1]}
                  total={this.state.total[1]}
                  monsterResults={this.state.results[1]}
                  party={this.state.results[0].partySize} />
        <Difficulty challenge={this.state.results[0]}
                    xp={this.state.results[1]} />
      </div>
    );
  }
});


module.exports = Home;
