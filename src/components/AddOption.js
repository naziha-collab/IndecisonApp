import React from 'react';

export default class AddOption extends React.Component {

  
  //ES6 class propoerties(remove the constructor)
  //1-install transfrom class propertie
  //2-remove constructor:
  //   state={
  //     error: undefined
  // };
  //   3-transforme event handlers to arrow function
  //   handleAddOption=(e)=>{
  //     e.preventDefault();
  
  //     const option = e.target.elements.option.value.trim();
  //     const error = this.props.handleAddOption(option);
  
  //     this.setState(() => ({ error }));
  
  //     if (!error) {
  //       e.target.elements.option.value = '';
  //     }
  //}



    constructor(props) {
      super(props);
      this.handleAddOption1 = this.handleAddOption1.bind(this);
      this.state = {
        error: undefined
      };
    }
    handleAddOption1(e) {
      e.preventDefault();
  
      const option = e.target.elements.option.value.trim();
      const error = this.props.handleAddOption(option);
  
      this.setState(() => ({ error }));
  
      if (!error) {
        e.target.elements.option.value = '';
      }
    }
    render() {
      return (
        <div>
          {this.state.error && <p>{this.state.error}</p>}
          <form className="add-option" onSubmit={this.handleAddOption1}>
          <input className="add-option__input" type="text" name="option" />
          <button className="button">Add Option</button>
          </form>
        </div>
      );
    }
  }