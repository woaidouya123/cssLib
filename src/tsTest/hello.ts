class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");
let name1: string = '123';
name1 = 'smith';
let list: number[] = [1, 2, 3];
enum Color {Red='123', Green=2, Blue=4}
let c: Color = Color.Green;
console.log(c, Color)
document.body.innerHTML = greeter(user);