console.log('App.js is running!');

/*JSX - JavaScript XML */
const app = {
    title : 'Some title',
    subtitle: 'Some Subtitle',
    options:['One','Two']
}
const onFormSubmit = (e) =>{
    e.preventDefault()
    const option = e.target.elements.option.value  // e.target[0].value (similar)
    console.log(option)
    // console.log(e.target[0].value)
    if(option){
        app.options.push(option)
        e.target.elements.option.value = ''
        render()
    }
}


const removeAll = () =>{
    app.options.splice(0,app.options.length)
    render()
}
const onMakeDecision = ()=>{
    const randomNum = Math.floor(Math.random() * app.options.length)
    const option = app.options[randomNum]
    alert(option)
}
const render = () =>{

    const template = (
        <div>
            <h1>{app.title}</h1> 
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length >= 0 ? 'Here are your options' : 'No options'}</p>
            <button disabled={app.options.length===0} onClick={onMakeDecision}>What should I do ? </button>
            <ol>
            {
                app.options.map((option)=>{
                    return <li key='option'>Item : {option}</li>
                })
            }
            </ol>
            <form onSubmit={onFormSubmit}> 
                <input type='text' name='option' placeholder="Options" autocomplete="off"></input>
                {<button>Add Option</button>} {<button onClick={()=>{removeAll()}}>Remove All</button>}
            </form>
            
        </div>
    );
    var appRoot = document.getElementById('app');
    ReactDOM.render(template, appRoot);
}
render()



/* Create a templateTwo var JSX expression */

const getLocation = (location) =>{
    if(location){
        return <p>Location : {user.loc}</p>
    }
}

const user={ 
    name: 'Damla',
    age : 23,
    loc : 'Aydın'
}



/*Count example */
let count = 0
const addOne = ( )=>{
    count++
    renderCounterApp();
}
const removeOne = () =>{
    count--
    renderCounterApp();
}
const reset =  () =>{
    count = 0
    renderCounterApp();
}
const renderCounterApp = ()=>{
    const templateTwo =(
        <div>
            <h1>Count : {count}</h1>
            <div>
                <button onClick={()=>{addOne()}}>+1</button>
                <button onClick={()=>{removeOne()}}>-1</button>
                <button onClick={()=>{reset()}}>Reset</button>
            </div>
                </div>
    )
    const appRoot2 = document.getElementById('app2');
    ReactDOM.render(templateTwo,appRoot2);
}
renderCounterApp();