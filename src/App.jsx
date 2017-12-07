import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      month: [],
      life: [],
      status: false
    };
  }

  search(URL, stateName){
    fetch(URL)
    .then(response => response.json())
    .then(json => {
      this.setState({ [stateName]: json });
    });
  }

  componentDidMount(){
    this.search('https://fcctop100.herokuapp.com/api/fccusers/top/recent', 'month');
    this.search('https://fcctop100.herokuapp.com/api/fccusers/top/alltime', 'life');
  }

  render(){
    const {month, life} = this.state;
    return(
      <div className='container'>
        <h1 className='text-center'>Leaderboard</h1>
        <div className="row">
          <div className="col-md-3"><h5>#</h5></div>
          <div className="col-md-3"><h5>Camper Name</h5></div>
          <div className="col-md-3" onClick={() => this.setState({status: false})}><h5>Points in past 30 days</h5></div>
          <div className="col-md-3" onClick={() => this.setState({status: true})}><h5>All time points</h5></div>
        </div>
        {
          this.state.status
          ?
          life.map(person => (
            <div className="row">
              <div className="col-md-3">{life.indexOf(person)+1}</div>
              <div className="col-md-3">{person.username}</div>
              <div className="col-md-3">{person.recent}</div>
              <div className="col-md-3">{person.alltime}</div>
            </div>
          ))
          :
          month.map(person => (
            <div className="row">
              <div className="col-md-3">{month.indexOf(person)+1}</div>
              <div className="col-md-3">{person.username}</div>
              <div className="col-md-3">{person.recent}</div>
              <div className="col-md-3">{person.alltime}</div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default App;
