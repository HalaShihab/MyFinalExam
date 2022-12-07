var attempts = 0;
var down = 1;
var right = 1;
var xPos = 0;
var yPos = 0;
var studentsArr = [];
var liIndex = 0;

let displayNumber1 = document.getElementById("displayNumber1");
let outerBox = document.getElementById("containerNumber5");
let innerBox = document.getElementById("boxNumber5");
let students = document.getElementById("displayNumber6");
let inputsStudents = inputNumber7.querySelectorAll("input");

function loadingPage() {
  moveBox();
  createStudents();
}

/*****************************#1************************************ */
function displayMovies_Books() {
  var booksArr = [];
  var moviesArr = [];
  // create 2 books
  booksArr.push(
    new Book("JavaScript: The Definitive Guide", 32.39, "David Flanagan", 2015)
  );
  booksArr.push(
    new Book("JavaScript: The Good Parts", 7.16, "Douglas Crockford", 2015)
  );
  // create 2 movies
  moviesArr.push(
    new Movie("Daniel Spellbound", 500, " Matthew Fernandes", [
      "Alex Barima",
      "Catherine Disher",
      " Lynn Rafferty",
      "Chantel Riley",
    ])
  );
  moviesArr.push(
    new Movie("Romantic Killer", 400, "Kazuya Ichikawa", ["Gakuto Kajiwara"])
  );

  booksArr.forEach(function (book) {
    element = document.createElement("li");
    element.appendChild(document.createTextNode(book.displayBook()));
    displayNumber1.appendChild(element);
  });
  moviesArr.forEach(function (movie) {
    element = document.createElement("li");
    element.appendChild(document.createTextNode(movie.displayMovie()));
    displayNumber1.appendChild(element);
  });
}
/*****************************#2************************************ */
function pullInfo() {
  let myPromise = new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        resolve(data); // 10 users
      })
      .catch((err) => reject(err));
  });
  // this Api will retrieve 10 users but will show one user to be clearer
  myPromise.then(
    function (value) {
      document.getElementById("displayNumber2").innerHTML = JSON.stringify(
        value[0] // 1 user
      );
    },
    function (error) {
      document.getElementById("displayNumber2").innerHTML = error;
    }
  );
}
/*****************************#3************************************ */
function powerBallLottery() {
  let myPromise = new Promise(function (resolve, reject) {
    do {
      var randomNumbers = createTwoRandomNumbers();
      attempts++;
    } while (randomNumbers[0] !== randomNumbers[1]);
    resolve(randomNumbers);
  });
  myPromise.then(
    function (numbers) {
      document.getElementById("displayNumber3").innerHTML =
        "Two matched random numbers are  " +
        " " +
        numbers +
        "<br>" +
        "Attempts to create two matched numbers is " +
        " " +
        attempts;
    },
    function (error) {
      document.getElementById("displayNumber3").innerHTML = error;
    }
  );
}
function createTwoRandomNumbers() {
  var min = 0;
  var max = 292000000;
  var randomNumbers = [];
  var randomNumbersLength = 2;
  for (var i = 0; i < randomNumbersLength; i++) {
    randomNumbers.push(Math.floor(Math.random() * (max - min) + min));
  }
  return randomNumbers;
}

/*****************************#4************************************ */
function validate(e) {
  e.preventDefault();
  var userName = document.getElementById("username");
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var confirmPassword = document.getElementById("password2");

  var usernameError = document.getElementById("usernameError");
  var emailError = document.getElementById("emailError");
  var passwordError = document.getElementById("passwordError");
  var password2Error = document.getElementById("password2Error");

  if (userName.value == "" || userName.value.length !== 7) {
    usernameError.innerHTML = "please provide name with 7 characters long";
    userName.style.borderColor = "red";
    userName.focus();
  }
  if (!validateEmail(email.value)) {
    emailError.innerHTML = "Please enter valid email";
    email.style.borderColor = "red";
    email.focus();
  }

  if (password.value == "" || password.value.length !== 6) {
    passwordError.innerHTML = "please provide password with 6 characters long";
    password.style.borderColor = "red";
    password.focus();
  }
  if (confirmPassword.value == "" || password.value !== confirmPassword.value) {
    password2Error.innerHTML =
      "please provide password matched to previous password";
    confirmPassword.style.borderColor = "red";
    confirmPassword.focus();
  }

  return true; // form data will send to the server correctly
}

function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}
/*****************************#5************************************ */
function moveBox() {
  if (yPos >= 170 || yPos < 0) {
    down *= -1;
    var randomColor = createRandomColor();
    innerBox.style.backgroundColor = "#" + randomColor;
  }
  if (xPos >= 270 || xPos < 0) {
    right *= -1;
    var randomColor = createRandomColor();
    innerBox.style.backgroundColor = "#" + randomColor;
  }
  xPos += right;
  yPos += down;
  innerBox.style.top = yPos + "px";
  innerBox.style.left = xPos + "px";
  setTimeout(moveBox, 20);
}
function createRandomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}
/*****************************#6************************************ */

function Student(firstName, lastName, studentId, enrolled, avgGrade) {
  this.fName = firstName;
  this.lName = lastName;
  this.stuId = studentId;
  this.enroll = enrolled;
  this.avgG = avgGrade;

  this.studentsList = function () {
    return `${this.fName}
     ${this.lName} 
     ${this.stuId}
     ${this.enroll} 
     ${this.avgG}`;
  };
}

function createStudents() {
  studentsArr.push(new Student("Hala", "Shihab", 102673, true, 200));
  studentsArr.push(new Student("Nancy", "Brown", 134823, false, 150));
  studentsArr.push(new Student("Ali", "Sam", 100978, true, 230));
  studentsArr.push(new Student("zina", "mahmoud", 167230, true, 300));
  studentsArr.push(new Student("salma", "mazen", 194293, false, 160));
}

function displayStudents() {
  students.innerHTML = "";
  studentsArr.forEach(function (std) {
    liStu = document.createElement("li");
    liStu.appendChild(document.createTextNode(std.studentsList()));
    students.appendChild(liStu);
  });
}

/*****************************#7************************************ */
students.addEventListener("click", function (event) {
  let liItems = Array.from(students.children);
  liIndex = liItems.indexOf(event.target);

  // stuArr = event.target.innerText.split(" ");
  // console.log(stuArr);
  // for (i = 0; i <= 5; i++) {
  //   stuArr[i] == true
  //     ? (inputsStudents[i].checked = "checked")
  //     : (inputsStudents[i].value = stuArr[i]);
  // }

  inputsStudents[0].value = studentsArr[liIndex].fName;
  inputsStudents[1].value = studentsArr[liIndex].lName;
  inputsStudents[2].value = studentsArr[liIndex].stuId;
  inputsStudents[3].checked = studentsArr[liIndex].enroll;
  inputsStudents[4].value = studentsArr[liIndex].avgG;
});

function changeStudentInfo() {
  studentsArr[liIndex].fName = inputsStudents[0].value;
  studentsArr[liIndex].lName = inputsStudents[1].value;
  studentsArr[liIndex].stuId = inputsStudents[2].value;
  studentsArr[liIndex].enroll = inputsStudents[3].checked;
  studentsArr[liIndex].avgG = inputsStudents[4].value;

  displayStudents();
}
