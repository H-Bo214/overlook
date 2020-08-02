let domUpdates = {

  displayManagerPage() {
    let loginHeader = document.querySelector('.login-header');
    let loginParent = document.querySelector('.login-parent');

    let managerHeader = document.querySelector('.manager-header');
    let managerLandingParent = document.querySelector('.manager-landing-parent');
   
    loginHeader.classList.add('hide');
    loginParent.classList.add('hide');
    managerHeader.classList.remove('hide');
    managerLandingParent.classList.remove('hide');
  },
  
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
    // console.log('currentClientName', currentClient.name);
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

  noDateEnteredMessage() {
    let clientDateInput = document.getElementById('client-date')
    let needDateMessage = document.querySelector('.need-date-message');
    needDateMessage.classList.remove('hide');
    clientDateInput.addEventListener('focus', (event) => {
      needDateMessage.classList.add('hide');
    })
  },

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

    postModal(postResult) {
      let postModal = document.querySelector('.post-modal');
      postModal.classList.remove('hide');
      postModal.innerHTML = `
      <div>  
      <p>Thank you for booking!</p>
        <p class="close-modal" data-id="close">X</p>
      </div>
        `

    },

    closeModal() {
      
      
    }







}












export default domUpdates;