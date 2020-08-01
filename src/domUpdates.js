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
  


  // clientLogin(allClientData)
  // will need to invoke displayPastBooking, displayPresentBooking, displayUpcomingBooking, displayTotalAmountSpent, 

  // displayClientPage(currentClient)
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


  loadClientData(currentClient) {
    this.displayClientTotalSpent(currentClient);
    this.displayWelcomeMessage(currentClient);
    this.displayClientBookings(currentClient);
    }, 





//   <ul>
//   <label class="label client-past-room" for="room">Room:</label>
//   <li>${booking.roomNumber}</li>
// </ul>`


}












export default domUpdates;