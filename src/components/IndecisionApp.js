import React from 'react';
import AddOption from './AddOption';//or AddOption.js
import Header from './Header';
import Options from './Options';
import Action from './Action';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  //ES6 class propoerties(remove the constructor)
  //1-install transfrom class propertie
  //2-remove constructor:
  //3-transforme event handlers to arrow function
    constructor(props) {
      super(props);
      this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
      this.handlePick = this.handlePick.bind(this);
      this.handleAddOption = this.handleAddOption.bind(this);
      this.handleDeleteOption = this.handleDeleteOption.bind(this);
      this.clearSelectedOption = this.clearSelectedOption.bind(this);
      this.state = {
        options: props.options,
        SelectedOption:undefined
      };
    }
    clearSelectedOption(){
      this.setState(()=>
      ({SelectedOption:undefined})
      )
    }

    componentDidMount() {
      try {
        const json = localStorage.getItem('options');
        const options = JSON.parse(json);
  
        if (options) {
          this.setState(() => ({ options }));
        }
      } catch (e) {
        // Do nothing at all
      }
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        const json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
      }
    }
    componentWillUnmount() {
      console.log('componentWillUnmount');
    }
    handleDeleteOptions() {
      this.setState(() => ({ options: [] }));
    }
    handleDeleteOption(optionToRemove) {
      this.setState((prevState) => ({
        options: prevState.options.filter((option) => optionToRemove !== option)
      }));
    }
    handlePick() {
      const randomNum = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomNum];
      this.setState((prevState)=>({
        SelectedOption:option
      }))
      //alert(option);
    }
    handleAddOption(option) {
      if (!option) {
        return 'Enter valid value to add item';
      } else if (this.state.options.indexOf(option) > -1) {
        return 'This option already exists';
      }
  
      this.setState((prevState) => ({
        options: prevState.options.concat(option)
      }));
    }
    render() {
      const subtitle = 'Put your life in the hands of a computer';
  
      return (
        <div>
          <Header subtitle={subtitle} />
          <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
          <Options
            options={this.state.options}
            handleDeleteOptions={this.handleDeleteOptions}
            handleDeleteOption={this.handleDeleteOption}
          />
          <AddOption
            handleAddOption={this.handleAddOption}
          />
          </div>
          </div>
          <OptionModal
          SelectedOption={this.state.SelectedOption}
          clearSelectedOption={this.clearSelectedOption}
          />
        </div>
      );
    }
  }
  
  IndecisionApp.defaultProps = {
    options: []
  };
  
  // const User = (props) => {
  //   return (
  //     <div>
  //       <p>Name: {props.name}</p>
  //       <p>Age: {props.age}</p>
  //     </div>
  //   );
  // };
