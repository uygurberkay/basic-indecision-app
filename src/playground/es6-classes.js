
class Person {
    constructor(name = 'Anonymous',age=18) {
        this.name = name ,
        this.age = age
    }
    getGreeting() {
        return `Hi, I am ${this.name} :) and ${this.age} years old`
    }


}
class Student extends Person {
    constructor(name,age,major){
        super(name,age)
        this.major = major
    }
    hasMajor() {
        return !!(this.major)
    }
    getGreeting() {
        let greetings = super.getGreeting()
        if(this.hasMajor()){
            greetings += ` Their major is ${this.major }`
        }

        return greetings

    }
}

class Traveler extends Person {
    constructor(name,age,location){
        super(name,age)
        this.location = location
    }
    hasLocation(){
        return !!this.location
    }
    getGreeting(){
        let greetings = super.getGreeting()
        if(this.location){
            greetings += ` I'm visiting ${this.location}.`
        }
        return greetings
    }
}

const me = new Traveler('Berkay Uygur',23,'Isparta')
console.log(me.getGreeting())
const other = new Traveler()
console.log(other.getGreeting())