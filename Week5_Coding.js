//Hogwarts Houses and Students 
//This class is to just build a student and be able to add a new instance of a new added student
class Student{
    constructor(name,year){
        this.name = name;
        this.year = year;
    }
   describe(){
    return `${this.name} is in year ${this.year}.`
   } 
}

//Create a new class to be able to refer and build/add students into the houses
class House{
    //Allows us to have a place to contain all the houses at this school
    constructor(houseName){ 
        this.houseName = houseName;
        this.students = [];
    }
    addStudent(student){ //This is allowing us to build in a group of students under different houses
        if(student instanceof Student){ //Ensures that is actually an instance of a class and not some random value that is not a string
            this.students.push(student);
        } else{
            throw new Error(`You can only add an instance of a student, ${student} is not a valid argument for a student.`) //Lets user know
            //the error/gives feedback to be able to input correct value
        }
    }
    describe(){
        return `${this.houseName} has ${this.students.length} students in its house.`;
    }
}

//As mentioned in class, this is what drives the application and our ability to make choices, which then drives those choices
class Menu{
    constructor(){
        this.schoolHouse = []; //Although this has not been defined yet
        this.selectedHouse = null; //At this point no houses have been selected since we are just at the beginning of the menu

    }

    //This is where user would enter the application
    start() {
        // We have not defined this showMenuOptionsb yet but will along the process, we are following top down. We are adding now
        //what will be used later. Let's us plan out and know what to add in the code.
        let selection = this.showMainMenuOptions();
        //While is allowing one of these cases to be execute; it will guarantee some type of return or feedback
        while (selection != 0){
            switch (selection){
                case '1':
                this.createHouse();
                break;
                case '2':
                this.viewHouse();
                break;
                case '3':
                this.displayHouses();
                break;
                case '4':
                this.deleteHouse();
                break;
                default:
                selection = 0;    

            }
          selection = this.showMainMenuOptions();
        } 
        //Let's the user know they have exited the menu options
        alert("See ya later!")
    }
    // This is where showMainMenuOptions is now defined and code have a reference on how to execute it
    showMainMenuOptions(){
        return prompt(`
        0) back
        1) add a new house
        2) view House
        3) display houses
        4)) delete House`);
    }
    //Creating a new function passing through houseInfo to allow users to see students in the hosue and to add or remove them
    showHouseMenuOption(houseInfo){
        return prompt (`
        0) back 
        1) add a new student
        2) delete a student
        ---------------------
        ${houseInfo}
        `);
    }
    //This function uses a loop to go through the previous houseName array created to display the different house names input by the user
    //It displays the elements in the array as end result
    displayHouses(){
        let houseString = "";
        for(let i=0; i<this.schoolHouse.length; i++){
            houseString += i+ ") " + this.schoolHouse[i].houseName + "\n";
        }
        if ( houseString === ""){
            alert ("No house name has been entered, please enter a house name.");
        }
        alert(houseString);
    }
    //This is allowing user to input house names so displayHouses function can return elements from array
    createHouse(){
        let houseName = prompt ( "Enter the name of the house: ");
        this.schoolHouse.push(new House (houseName));
    }
// Here wre defining and creating viewHouse function. User can input which house they want to view based of what index value they input from the
//array element position
    viewHouse(){
        let index = prompt( "Enter the index of the house that you would like to view: ");
        //This portion makes it so a known index value has to be greater than -1; index starts at 0, so if value does not = true in this statement
        //nothing will execure or code will not enter the loop
        if(index> -1 && index< this.schoolHouse.length){
        //With the selected index value, code knows which one we are reffering and set that value to selectedHouse based off the index from
        //schoolHouse array we created in beginning of Menu class    
        this.selectedHouse = this.schoolHouse[index];
        let description = " House Name: " + this.selectedHouse.houseName + "\n";
        description += " " + this.selectedHouse.describe() + "\n";
        //This loop is building each house and what students are in the house. When user goes into view this, that info will be displayed
        //It will reflect what has been added up to this point in previous/future prompt inputs
        for(let i=0; i < this.selectedHouse.students.length; i++){
            description += i + ") " + this.selectedHouse.students[i].describe( + "\n")
        }
        let selection1 = this.showHouseMenuOption(description);
        //These cases have not been created yet but will be introduced, top down approach again
        switch (selection1){
            case '1':
                this.createStudent();
                break;
            case '2':
                this.deleteStudent();
                break;   
                 
        }
        }

    }
    //Here we are creating the function tht allows the switch case above previously in the showMainMenuoption function to actually carry out the delete
    deleteHouse(){
        let index = prompt ("Enter the index of the house that you want to remove: ");
        if(index > -1 && index < this.schoolHouse.length){
            //Here we are removing the house from the array value we set previously based on the index value given
            this.schoolHouse.splice(index,1);
        }
    }
   createStudent(){
    //Here in createStudent we are creating the instance of the student
    let name = prompt("Enter the name of the new student you wish to add: ");
    let year = prompt(" Enter the school year of the student: ");
    this.selectedHouse.addStudent(new Student(name,year));
   }
   deleteStudent(){
//Allows us to remove selected student from index
    let index = prompt("Enter the index of the student you wish to remove: ");
    if(index > -1 && index < this.selectedHouse.students.length){
        this.selectedHouse.students.splice(index,1);
    }
   }
   
}

//Creating a new instance of Menu
let menu = new Menu();
//Where you enter the application
menu.start();
