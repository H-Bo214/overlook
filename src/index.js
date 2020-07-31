import './css/style.scss';
import './images/hotel-sign-bw-medium.jpg';
import domUpdates from '../src/domUpdates';
import Rooms from './room';
import Bookings from './booking';
import Hotel from './hotel';
import User from './user';
// import fetches from '../src/fetches';

let loginButton = document.querySelector('.login-button');

loginButton.addEventListener('click', userLogin);
loginButton.addEventListener('keydown', userLogin);





function loginErrors() {
  let usernameLoginInput = document.querySelector('.username-login-input');
  let passwordLoginInput = document.querySelector('.password-login-input');
  let loginErrorMessage = document.querySelector('.login-error-msg')
  if (usernameLoginInput.value === '' || passwordLoginInput.value === '') {
    loginErrorMessage.classList.remove('hide')
  } else if (passwordLoginInput.value !== 'overlook2020') {
    loginErrorMessage.classList.remove('hide')
  }
}

function userLogin() {
  // let usernameLoginInput = document.querySelector('.username-login-input');
  // let passwordLoginInput = document.querySelector('.password-login-input');
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json())
  .then(clientsData => loadClientPage(clientsData))
  .catch(errors => loginErrors(errors))

  
}

// function loadClientPage(allClients)
function loadClientPage(clientsData) {
  let usernameLoginInput = document.querySelector('.username-login-input');
  let passwordLoginInput = document.querySelector('.password-login-input');

  if (usernameLoginInput.value === 'manager' && passwordLoginInput.value === 'overlook2020') {
    domUpdates.displayManagerPage()
  } else if (usernameLoginInput.value.includes('customer') && passwordLoginInput.value === 'overlook2020') {
    // console.log('usernameLoginInput.value', usernameLoginInput.value)
    let clientID = checkPasswordNumbers(usernameLoginInput.value)
    let verifiedClient = checkPassword(clientID, clientsData);
    console.log('verifiedClient', verifiedClient);
    fetchNeededData(verifiedClient)
    // domUpdates.displayClientPage(verifiedClient)
  }
    // for (let i = 1; clientsData.length; i++) {
    //   if (usernameLoginInput.value === `customer${i}` && passwordLoginInput.value === 'overlook2020') {
    //     let currentClient = clientsData[i - 1] 
    //     // domUpdates.displayClientPage(currentClient);
    //     domUpdates.displayClientPage(currentClient);
  
    //   }
    // }
    
  
}

function fetchNeededData(verifiedClient) {
Promise.all([
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').
  then(response => response.json()),
])
.then(data => reassignData(data[0].rooms, data[1].bookings, verifiedClient))
}

function reassignData(allRooms, allBookings, currentClient) {
  //instantiate rooms by passing in all rooms
  let rooms = new Rooms(allRooms);
  //instantiate bookings by passing in allBookings
  let bookings = new Bookings(allBookings);
  // instantiate hotel passing in the new instantiated rooms and bookings.
  let hotel = new Hotel(rooms, bookings);
  // instantiate a new user with the currentClient and pass in necessary properties. 
  let currentUser = new User(currentClient, allBookings, allRooms)
  domUpdates.displayClientPage(currentUser);
  console.log('currentUserMoneySpent', currentUser.totalMoneySpent);
  console.log('rooms', rooms);
  console.log('bookings', bookings);
  console.log('hotel', hotel);
  console.log('currentUser', currentUser);
}

function checkPasswordNumbers(usernameLoginInput) {
  // console.log('usernameLoginInput', usernameLoginInput);
  let id1;
  usernameLoginInput = usernameLoginInput.split('')
  let two = usernameLoginInput[usernameLoginInput.length - 2]
  let indexMinusTwo = parseInt(two)
  let one = usernameLoginInput[usernameLoginInput.length - 1]
  let indexMinusOne = parseInt(one)
  if (typeof indexMinusTwo === "number") {
    id1 = usernameLoginInput[usernameLoginInput.length - 2] + usernameLoginInput[usernameLoginInput.length - 1]
    id1 = parseInt(id1)
    return id1
  } else if (typeof indexMinusOne === 'number') {
    id1 = (usernameLoginInput[usernameLoginInput.length - 1])
    id1 = parseInt(id1)
    return id1
  } else {
    return
  }
}

function checkPassword(clientID, clientsData) {
  let correctUser = clientsData.users.find(user => user.id === clientID)
  return correctUser
}