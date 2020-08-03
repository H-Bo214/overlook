let domUpdates = {

  // Manager Page landing 
  displayManagerPage(hotel) {
    let loginHeader = document.querySelector('.login-header');
    let loginParent = document.querySelector('.login-parent');
    let managerHeader = document.querySelector('.manager-header');
    let managerLandingParent = document.querySelector('.manager-landing-parent');
    loginHeader.classList.add('hide');
    loginParent.classList.add('hide');
    managerHeader.classList.remove('hide');
    managerLandingParent.classList.remove('hide');
    this.loadManagerData(hotel);
  },

  //Client Page landing
  displayClientPage(currentClient) {
    let loginHeader = document.querySelector('.login-header');
    let loginParent = document.querySelector('.login-parent');
    let clientHeader = document.querySelector('.client-header');
    let clientLandingParent = document.querySelector('.client-landing-parent');
    loginHeader.classList.add('hide');
    loginParent.classList.add('hide');
    clientHeader.classList.remove('hide');
    clientLandingParent.classList.remove('hide');
    this.loadClientData(currentClient)
  },

  displayClientTotalSpent(currentClient) {
    let clientTotalSpent = document.querySelector('.client-total-spent');
    let clientTotalMoneySpent = currentClient.getTotalMoneySpent();
    clientTotalSpent.innerHTML = `<p class= "client-total">$${clientTotalMoneySpent}</p>`;
  },

  displayWelcomeMessage(currentClient) {
    let welcomeMessage = document.querySelector('.client-welcome-message');
    let firstName = currentClient.name.split(" ")[0];
    welcomeMessage.innerHTML = `Welcome ${firstName}`;
  },

  displayClientBookings(currentClient) {
    let myBookings = document.querySelector('.client-past-bookings');
    let bookings = currentClient.getMyBookings()
    bookings.forEach(booking => {
      let bookingDetails =
        ` <ul class= "past-bookings">
          <label class="label client-past-dates" for="date">Date:</label>
          <li>${booking.date}</li>
          <label class="label client-past-dates" for="room number">Room Number:</label>
          <li>${booking.roomNumber}</li>
        </ul>
      `
      myBookings.insertAdjacentHTML("beforeend", bookingDetails)
    })
  },

  displayLoginErrorMessage() {
    let usernameLoginInput = document.querySelector('.username-login-input');
    let passwordLoginInput = document.querySelector('.password-login-input');
    let loginErrorMessage = document.querySelector('.login-error-msg')
    loginErrorMessage.classList.remove('hide')
    usernameLoginInput.addEventListener('focus', (event) => loginErrorMessage.classList.add('hide'))
    passwordLoginInput.addEventListener('focus', (event) => loginErrorMessage.classList.add('hide'))
  },

  noDateEnteredMessage() {
    let clientDateInput = document.getElementById('client-date')
    let needDateMessage = document.querySelector('.need-date-message');
    needDateMessage.classList.remove('hide');
    clientDateInput.addEventListener('focus', (event) => {
      needDateMessage.classList.add('hide');
    })
  },


  // Client Section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  displayAvailableRoomsFromSearch(availableRooms) {
    if (availableRooms.length === 0) {
      let noRoomsMsg = document.querySelector('.no-rooms-available-message');
      noRoomsMsg.classList.remove('hide')
    } else {
      let clientAvailableRooms = document.querySelector('.client-available-rooms')
      clientAvailableRooms.innerText = '';
      availableRooms.forEach(room => {
        let availableRoomDetails =
          ` <ul class="single-room-details-card" id=${room.number}>
            <li><span>Room #: </span>${room.number}</li>
            <li><span>Room Type: </span>${room.roomType}</li>
            <li><span>Has bidet: </span>${room.bidet}</li>
            <li><span>Bed size: </span>${room.bedSize}</li>
            <li><span>Number of beds: </span>${room.numBeds}</li>
            <li><span>Cost per night: </span>${room.costPerNight}</li>
        <button class="client-book-room-button" data-id="${room.number}" type="button" name="Book Now">Book Now</button>
      </ul>`
        clientAvailableRooms.insertAdjacentHTML("beforeend", availableRoomDetails)
      })
    }
  },

  loadClientData(currentClient) {
    this.displayClientTotalSpent(currentClient);
    this.displayWelcomeMessage(currentClient);
    this.displayClientBookings(currentClient);
  },
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  postModal(postResult) {
    let postModal = document.querySelector('.post-modal');

    postModal.classList.remove('hide');
    postModal.innerHTML = `
      <div class="close-modal-parent">  
      <p>Thank you for booking!</p>
        <button class="close-modal" type ="button" name="close thank you message"data-id="close">X</button>
      </div>
        `
    // let closeModal = document.querySelector('.close-modal');
    // closeModal.addEventListener('click', function closeMessage() {
    //   let postModal = document.querySelector('.post-modal');
    //   postModal.classList.add('hide');
    // })
  },

  // closeMessage() {
  //   let postModal = document.querySelector('.post-modal');
  //   postModal.classList.add('hide');
  // }

















// Manager search section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  displaySearchedUserInfo(displaySearchedUser, currentUser) {
    displaySearchedUser.insertAdjacentHTML('beforeend', this.displaySearchedClientPage(currentUser))
  },

  displaySearchedClientPage(currentUser) {
    let managerClientHeader = document.querySelector('.manager-client-header');
    let managerClientLandingParent = document.querySelector('.manager-client-landing-parent');
    managerClientHeader.classList.remove('hide');
    managerClientLandingParent.classList.remove('hide');
    this.loadSearchedClientData(currentUser)

  },

  loadSearchedClientData(currentUser) {
    this.displaySearchedClientTotalSpent(currentUser);
    this.displaySearchedWelcomeMessage(currentUser);
    this.displaySearchedClientBookings(currentUser);
  },

  displaySearchedClientTotalSpent(currentUser) {
    let searchedClientTotalSpent = document.querySelector('.searched-client-total-spent');
    let searchedClientTotalMoneySpent = currentUser.getTotalMoneySpent();
    searchedClientTotalSpent.innerHTML = `<p class= "client-total">$${searchedClientTotalMoneySpent}</p>`;
  },

  displaySearchedWelcomeMessage(currentUser) {
    let currentClient = document.querySelector('.searched-client-welcome-message');
    currentClient.innerHTML = `Client Name: ${currentUser.name}`;
  },

  displaySearchedClientBookings(currentUser) {
    let myBookings = document.querySelector('.searched-client-past-bookings');
    let bookings = currentUser.getMyBookings()
    console.log('currentUser', currentUser);
    bookings.forEach(booking => {
      let bookingDetails =
        ` <ul class= "past-bookings">
        <label class="label client-past-dates" for="date">Date:</label>
        <li>${booking.date}</li>
        <label class="label client-past-dates" for="room number">Room Number:</label>
        <li>${booking.roomNumber}</li>
      </ul>
    `
      myBookings.insertAdjacentHTML("beforeend", bookingDetails)
    })
  },

  displayManagerAvailableRoomsFromSearch(searchedAvailableRooms) {
    if (searchedAvailableRooms.length === 0) {
      let noRoomsMsg = document.querySelector('.searched-no-rooms-available-message');
      noRoomsMsg.classList.remove('hide')
    } else {
      let clientAvailableRooms = document.querySelector('.searched-client-available-rooms')
      clientAvailableRooms.innerText = '';
      searchedAvailableRooms.forEach(room => {
        let availableRoomDetails =
          ` <ul class="single-room-details-card" id=${room.number}>
          <li><span>Room #: </span>${room.number}</li>
          <li><span>Room Type: </span>${room.roomType}</li>
          <li><span>Has bidet: </span>${room.bidet}</li>
          <li><span>Bed size: </span>${room.bedSize}</li>
          <li><span>Number of beds: </span>${room.numBeds}</li>
          <li><span>Cost per night: </span>${room.costPerNight}</li>
      <button class="client-book-room-button" data-id="${room.number}" type="button" name="Book Now">Book Now</button>
    </ul>`
        clientAvailableRooms.insertAdjacentHTML("beforeend", availableRoomDetails)
      })
    }
  },

  loadManagerData(hotel) {
    this.displayNumRoomsAvailableToday(hotel);
    this.displayPercentOccupancy(hotel);
    // this.displayClientBookings(currentClient);
  },

  displayNumRoomsAvailableToday(hotel) {
    let roomsAvailable = document.querySelector('.rooms-available');
    let totalRoomsAvailable = hotel.findRoomsAvailableToday();
    roomsAvailable.innerHTML = `<p class= "total-rooms">There are currently ${totalRoomsAvailable} rooms available.</p>`;
  },

  displayPercentOccupancy(hotel) {
    let currentOccupancy = document.querySelector('.current-occupancy');
    let percentRoomsAvailable = hotel.findOccupancyPercentage();
    currentOccupancy.innerHTML = `<p class= "percent-occupied">We are currently at ${percentRoomsAvailable}% occupancy.</p>`;
  },

}



export default domUpdates;