import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, {StyleRoot} from 'radium';

class App extends Component {
  state = { //object
    persons: [ //property 
      { id: 'de', name: 'Korey', age: 28 }, //array of js objects 
      { id: 'rsd', name: 'Steve', age: 46 },
      { id: 'efsd', name: 'Glenn', age: 20 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice(); //copies the full array and get stored 
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1); //removes one element form the array 
    this.setState({ persons: persons }) //sent the state to the updated persons 

  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    }); //execute this function on every element of the array 

    const person = { //creating a new object with the person selected as to not edit the reference object 

      ...this.state.persons[personIndex]
    
    
    };

    person.name = event.target.value; //ooints to the value of the text input box to update the name 

    const persons = [...this.state.persons]; //updating the state with the new person on the copy
    persons[personIndex] = person; //the one position that is updated [personIndex]

    this.setState({  
      persons: persons

    }) //setting the copy of the persons array where the updates happened  to the state array

  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow }); //Set showPersons to whatever doesShow isn't 

  }
  render() {

    const style = {  //in-line styles 
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1x solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if (this.state.showPersons) { //if showPersons is true then the div is assigned to the the variable 
      persons = (
        <div>
          {this.state.persons.map((person, index) => {   //mapping the array of objects to a Person component, passing in the index of the array
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })}
        </div>
      );

      style.backgroundColor = "red"; //asssigning a style in the if statement 
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }
    
    const classes = [];
    
    //Dynamically assigning a class 
    if (this.state.persons.length <= 2) {
      classes.push('red'); //push red class into the classes array 
    }

    if (this.state.persons.length <=1) {
      classes.push('bold'); //classes = [red, bold]
    }

    return (
      <StyleRoot>
      <div className="App">
        <h1>React App</h1>
        <p className={classes.join(' ')}>This is really working</p>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
      </StyleRoot> 
    );

    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi I am a react app' ));
  }
}

export default Radium(App);
