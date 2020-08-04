import './css/style.scss';
import './images/hotel-red.jpg';
import domUpdates from '../src/domUpdates';
import RoomRepo from './Room-repo';
import BookingRepo from './Booking-repo';
import Hotel from './hotel';
import User from './user';

let rooms, bookings, hotel, currentUser;
let today = new Date();
let todaysDate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

let loginButton = document.querySelector('.login-button');
let rightSection = document.querySelector('.right-section');
let managerRightSection = document.querySelector('.manager-right-section');

rightSection.addEventListener('click', clientButtonHandler);
loginButton.addEventListener('click', userLogin);
managerRightSection.addEventListener('click', managerButtonHandler);

function loginErrors() {
  let usernameLoginInput = document.querySelector('.username-login-input');
  let passwordLoginInput = document.querySelector('.password-login-input');
  if (usernameLoginInput.value === '' || passwordLoginInput.value === '') {
    domUpdates.displayLoginErrorMessage()
  } else if (passwordLoginInput.value !== 'overlook2020') {
    domUpdates.displayLoginErrorMessage();
  }
}

function userLogin() {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(response => response.json())
    .then(clientsData => loadClientPage(clientsData))
    .catch(errors => console.log(errors))
};

function loadClientPage(clientsData) {
  let usernameLoginInput = document.querySelector('.username-login-input');
  let passwordLoginInput = document.querySelector('.password-login-input');
  let verifiedClient;
  loginErrors()
  if (usernameLoginInput.value === 'manager' && passwordLoginInput.value === 'overlook2020') {
    verifiedClient = {}
    fetchNeededData(verifiedClient, clientsData)

  } else if (usernameLoginInput.value.includes('customer') && passwordLoginInput.value === 'overlook2020') {
    let clientID = checkPasswordNumbers(usernameLoginInput.value)
    verifiedClient = checkPassword(clientID, clientsData);
    fetchNeededData(verifiedClient, clientsData);
  }
}

function fetchNeededData(verifiedClient, clientsData) {
  Promise.all([
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(response => response.json()),
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').
    then(response => response.json()),
  ])
  .then(data => reassignData(data[0].rooms, data[1].bookings, verifiedClient, clientsData))
}

function reassignData(allRooms, allBookings, currentClient, clientsData) {
  rooms = new RoomRepo(allRooms);
  bookings = new BookingRepo(allBookings);
  hotel = new Hotel(rooms, bookings, clientsData, todaysDate);
  currentUser = new User(currentClient, allBookings, allRooms)
  if (currentUser.id === undefined) {
    domUpdates.displayManagerPage(hotel);
  } else {
    domUpdates.displayClientPage(currentUser);
  }
}

function checkPasswordNumbers(usernameLoginInput) {
  let id1;
  usernameLoginInput = usernameLoginInput.split('');
  let two = usernameLoginInput[usernameLoginInput.length - 2];
  let indexMinusTwo = parseInt(two)
  let one = usernameLoginInput[usernameLoginInput.length - 1];
  let indexMinusOne = parseInt(one)
  if (typeof indexMinusTwo === "number") {
    id1 = usernameLoginInput[usernameLoginInput.length - 2] + usernameLoginInput[usernameLoginInput.length - 1];
    id1 = parseInt(id1)
    return id1
  } else if (typeof indexMinusOne === 'number') {
    id1 = (usernameLoginInput[usernameLoginInput.length - 1])
    id1 = parseInt(id1);
    return id1
  } else {
    return
  }
}

function checkPassword(clientID, clientsData) {
  let correctUser = clientsData.users.find(user => user.id === clientID);
  return correctUser
}

function clientButtonHandler(event) {
  let clientDate = document.getElementById('client-date').value;
  if (event.target.classList.contains('client-search-room-button')) {
    checkInputValue(clientDate);
  }
  if (event.target.closest(".client-available-rooms")) {
    let bookId = event.target.closest(".client-book-room-button").getAttribute("data-id");
    currentUser.postBooking(bookId, clientDate);
  }
}

function checkInputValue(dateValue) {
  if (dateValue === '') {
    domUpdates.noDateEnteredMessage();
  } else {
    let filterSelection = document.querySelector('.filter-input');
    let availableRooms = hotel.findAvailableRoomsByDate(dateValue, filterSelection.value);
    domUpdates.displayAvailableRoomsFromSearch(availableRooms);
    availableRooms = [];
  }
}

function managerButtonHandler(event) {
  let managerDateValue = document.getElementById('manager-client-date').value;
  let bookingIDInput = document.querySelector('.booking-id-input').value;
  if (event.target.classList.contains('manager-client-search-button')) {
    let name = document.querySelector('.manager-client-name-input').value;
    searchedNameCheckInputValue(name);
  }
  if (event.target.classList.contains('manager-client-search-room-button')) {
    searchedDateCheckInputValue(managerDateValue);
  }
  if (event.target.closest(".searched-client-available-rooms")) {
    let managerBookId = event.target.closest(".manager-client-book-room-button").getAttribute("data-id");
    currentUser.postBooking(managerBookId, managerDateValue);
  }
  if (event.target.classList.contains('delete-booking-button')) {
    deleteBookingCheckInputValue(bookingIDInput);
  }
}

function searchedNameCheckInputValue(name) {
  if (name === '') {
    domUpdates.noClientNameEntered();
  } else {
    let searchedUser = hotel.findSearchedUserName(name);
    currentUser = new User(searchedUser, bookings.allBookings, rooms.allRooms);
    domUpdates.displaySearchedClientPage(currentUser);
  }
}

function searchedDateCheckInputValue(managerDateValue) {
  if (managerDateValue === '') {
    domUpdates.noDateEnteredMessageManager();
  } else {
    let searchedFilterSelection = document.querySelector('.searched-filter-input');
    let searchedAvailableRooms = hotel.findAvailableRoomsByDate(managerDateValue, searchedFilterSelection.value);
    domUpdates.displayManagerAvailableRoomsFromSearch(searchedAvailableRooms);
    searchedAvailableRooms = [];
  }
}

function checkForFutureDate(bookingIDInput) {
  let allBookings = hotel.allBookings.allBookings;
  todaysDate = hotel.formatDates(todaysDate);
  let newBookingID = parseInt(bookingIDInput);
  allBookings.forEach(booking => {
    if (booking.date > todaysDate && booking.id === newBookingID) {
      hotel.deleteABooking(newBookingID);
    } else {
      domUpdates.displayCannotDeleteBookingMessage();
    }
  })
}

function deleteBookingCheckInputValue(bookingIDInput) {
  if (bookingIDInput === '') {
    domUpdates.displayNeedBookingIDMessage();
  } else {
    checkForFutureDate(bookingIDInput);
  }
}