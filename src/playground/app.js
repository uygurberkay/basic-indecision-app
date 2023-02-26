class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: props.options
          };
    }
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
    handleDeleteOptions(){ 
        this.setState(()=>({
            options : []
        }))
    };
    handleDeleteOption(optionToRemove){
        this.setState((privState)=> ({
            options: privState.options.filter(options => {
                return optionToRemove !== options 
            })
        }));
    }
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
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
    render(){
        const subtitle = 'Put your life in the hands of a computer'

        return(
            <div>
                <Header  subtitle={subtitle}/>
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick = {this.handlePick}
                />
                <Options 
                    options = {this.state.options}
                    handleDeleteOptions = {this.handleDeleteOptions}
                    handleDeleteOption = {this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption = {this.handleAddOption}
                />
            </div>
        );
    }
}
const Header = (props) =>{
    return(
        <div>
            <h1>{props.title}</h1>         
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
}
Header.defaultProps = {
    title: 'Indecision'
}
IndecisionApp.defaultProps = {
    options: []
}
// class Header extends React.Component {
//     render() {
//         return(
//             <div>
//                 <h1>{this.props.title}</h1>         
//                 <h2>{this.props.subtitle}</h2>
//             </div>
//         );
//     }
// }
const Action = (props) =>{
        return(
            <div>
                <button  
                    onClick={props.handlePick}
                    disabled={!props.hasOptions}
                >
                    What should I do ? 
                </button>
            </div>
        );
    
}
const Options = (props) =>{
    return (
        <div>
        <button onClick={props.handleDeleteOptions}>Remove All</button>
        {props.options.length === 0 && <p>Please add an option to start</p>}
            <ol>
                {
                props.options.map((option)=>(
                    <Option 
                        key={option} 
                        optionText = {option}
                        handleDeleteOption = {props.handleDeleteOption}
                    />
                ))
                }
            </ol>
            Length : {props.options.length}
        </div>
    );
}
const Option = (props)=> {
    return (
        <div>
            {props.optionText}
            <button 
                onClick={(e)=>{
                    props.handleDeleteOption(props.optionText)
                }}
            > 
                Remove  
            </button>
        </div>
    );
}
// class Option extends React.Component {
//     render(){
//         return (
//             <div>
//                 <li> Item : {this.props.optionText}</li>
//             </div>
//         );
//     }
// }

class AddOption extends React.Component {
    constructor(props){
        super(props)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.state = {
            error: undefined
        }
    }
   handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({
        error 
    }));

    if(!error){
        e.target.elements.option.value = ''
    }
  }
    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}> 
                    <input type='text' name='option' placeholder="Options" autocomplete="off"></input>
                    {<button>Add Option</button>}
                </form>
            </div>
        );
    }
}
const User = (props) =>{
    return (
        <div>
            <p>Name : {props.name}</p>
            <p>Age : {props.age}</p>
        </div>
    )
}

ReactDOM.render(<IndecisionApp />,document.getElementById('app'))