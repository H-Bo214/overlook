import './css/style.scss';
import './images/hotel-sign-bw-medium.jpg';
import './images/hotel-red.jpg';
import domUpdates from '../src/domUpdates';
import Rooms from './room';
import Bookings from './booking';
import Hotel from './hotel';
import User from './user';

let rooms, bookings, hotel, currentUser;
// date shows up with no 0 in the front of single digit months and date. Will need to add
// in for formatting. 
let today = new Date() 
let todaysDate = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
let loginButton = document.querySelector('.login-button');
let rightSection = document.querySelector('.right-section')

rightSection.addEventListener('click', function() {
  clientButtonHandler(event)
});

loginButton.addEventListener('click', userLogin);

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
//This function fetches all users
function userLogin() {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json())
  .then(clientsData => loadClientPage(clientsData))
  .catch(errors => console.log(errors))
};

function loadClientPage(clientsData) {
  // console.log('clientsData', clientsData);
  let usernameLoginInput = document.querySelector('.username-login-input');
  let passwordLoginInput = document.querySelector('.password-login-input');
  loginErrors()
  if (usernameLoginInput.value === 'manager' && passwordLoginInput.value === 'overlook2020') {
    domUpdates.displayManagerPage()
  } else if (usernameLoginInput.value.includes('customer') && passwordLoginInput.value === 'overlook2020') {
    let clientID = checkPasswordNumbers(usernameLoginInput.value)
    let verifiedClient = checkPassword(clientID, clientsData);
    fetchNeededData(verifiedClient)
  }
}
// This function fetches the current clients room and booking data
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
   rooms = new Rooms(allRooms);
  //  console.log('roomsInstantiation', rooms);
   bookings = new Bookings(allBookings);
  //  console.log('bookingsInstantiation', bookings);
   hotel = new Hotel(rooms, bookings);
  //  console.log('hotelInstantiation', hotel);
   currentUser = new User(currentClient, allBookings, allRooms)
  //  console.log('date', date);
  domUpdates.displayClientPage(currentUser);
}

function checkPasswordNumbers(usernameLoginInput) {
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

function clientButtonHandler(event) {
  let clientDate = document.getElementById('client-date').value;
  if (event.target.classList.contains('client-search-room-button')) {
    checkInputValue(clientDate)
  }
  if (event.target.closest(".client-available-rooms")) {
      let bookId = event.target.closest(".client-book-room-button").getAttribute("data-id");
      //  currentUser.postBooking(bookId, clientDate)
  }
  if (event.target.closest('.post-modal')) {
    let postModalParent = document.querySelector('.post-modal')
    postModalParent.classList.add('hide');
  }
}

function checkInputValue(dateValue) {
  if (dateValue === '') {
    domUpdates.noDateEnteredMessage()
  } else {
    let filterSelection  = document.querySelector('.filter-input')
    let availableRooms = hotel.findAvailableRoomsByDate(dateValue, filterSelection.value);     
    domUpdates.displayAvailableRoomsFromSearch(availableRooms)
    availableRooms = [];
  }
}


