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
    // console.log('currentClientName', currentClient.name);
  },


  

}




// Promise.all([
//   fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()),
//   fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()),
// ]).then(data => reassignData(data[0].rooms, data[1].bookings, currentClient))







export default domUpdates;