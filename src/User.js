import domUpdates from '../src/domUpdates'
class User {
  constructor(currentClient, allBookings, allRooms) {
    this.id = currentClient.id;
    this.name = currentClient.name;
    this.allClientBookings = allBookings.filter(booking => booking.userID === currentClient.id);
    this.clientRoomsStayedIn = this.findMyRooms(allRooms)
    this.totalMoneySpent = this.getTotalMoneySpent();
  }
  // has test
  getTotalMoneySpent() {
    let totalSpent = this.clientRoomsStayedIn.reduce((roomCost, room) => {
      roomCost += room.costPerNight;
      return roomCost;
    }, 0);
    return totalSpent.toFixed(2);
  };
  // has test
  findMyRooms(allRooms) {
    let myRooms = allRooms.reduce((allMyRooms, room) => {
      this.allClientBookings.forEach(booking => {
        if (booking.roomNumber === room.number) {
          allMyRooms.push(room);
        };
      });
      return allMyRooms;
    }, []);
    return myRooms;
  };
  // has test
  getMyBookings() {
    let myStays = this.allClientBookings.reduce((allStays, booking) => {
      let stays = {}
      stays.date = booking.date;
      stays.roomNumber = booking.roomNumber;
      stays.id = booking.id;
      allStays.push(stays)
      return allStays;
    }, []);
    return myStays;
  };

  postBooking(room, dates) {
    let roomNumbers = parseInt(room)
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID: this.id,
          date: dates,
          roomNumber: roomNumbers
        })
      })
      .then(response => response.json())
      .then(data => domUpdates.postModal(data))
      .catch(err => console.error(err))
  }

};

export default User;