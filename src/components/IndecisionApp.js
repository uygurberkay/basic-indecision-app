import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';


export default class IndecisionApp extends React.Component {
    state = {
        options : [],
        selectedOption: undefined
    }
    handleDeleteOptions = () =>{ 
        this.setState(()=>({
            options : []
        }))
    };
    handleDeleteOption = (optionToRemove) => {
        this.setState((privState)=> ({
            options: privState.options.filter(options => {
                return optionToRemove !== options 
            })
        }));
    }
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(()=>({
            selectedOption : option
        }));
    }
    handleClearSelectedOption = () => {
        this.setState(()=> ({
            selectedOption : undefined
        }))
    }
    handleAddOption = (option) => {
        if (!option) {
          return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
          return 'This option already exists';
        }
    
        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }));
      }
      /*Not necessary anymore */
    // constructor(props){
    //     super(props);
    //     this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
    //     this.handlePick = this.handlePick.bind(this);
    //     this.handleAddOption = this.handleAddOption.bind(this);{} 
    //     this.handleDeleteOption = this.handleDeleteOption.bind(this);
    //     this.state = {
    //         options: []
    //       };
    // }

    componentDidMount(){  // Only works on class base components
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)
            if(options){
                this.setState(()=>({
                    options
                }))    
            }
        } catch (e) {
            // Do nothing 
        }
    } 
    componentDidUpdate(prevProps,prevState){
        if(prevProps.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json)
            console.log('Saving Data')
        }
    }
    componentWillUnmount(){
        console.log('Component did unmount')
    }
    render(){
        const subtitle = 'Put your life in the hands of a computer'

        return(
            <div>
                <Header  subtitle={subtitle}/>
                <div className='container'>
                    <Action 
                        hasOptions={this.state.options.length > 0}
                        handlePick = {this.handlePick}
                    />
                    <div className='widget'>
                        <Options 
                            options = {this.state.options}
                            handleDeleteOptions = {this.handleDeleteOptions}
                            handleDeleteOption = {this.handleDeleteOption}
                        />
                        <AddOption 
                            handleAddOption = {this.handleAddOption}
                        />
                    </div>
                </div>
                <OptionModal 
                    selectedOption= {this.state.selectedOption}
                    handleClearSelectedOption = {this.handleClearSelectedOption}
                />
            </div>
        );
    }
}


IndecisionApp.defaultProps = {
    options: []
}

