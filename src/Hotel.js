class Hotel {
  constructor(allRooms, allBookings, clientsData, todaysDate) {
    this.allRooms = allRooms;
    this.allBookings = allBookings;
    this.allUsers = clientsData;
    this.date = this.formatDates(todaysDate);
    this.roomsAvailableToday = this.findRoomsAvailableToday();
    this.percentRoomAvailable = this.findPercentOfAvailableRooms();
    this.totalRevenue = this.getTotalRevenue()
  };

  // have test
  findBookedRoomsByDate(date) {
    let allBookings = this.allBookings.allBookings;
    return allBookings.reduce((bookedRooms, booking) => {
      if (booking.date === date) {
        bookedRooms.push(booking.roomNumber)
      }
      return bookedRooms;
    }, []);
  };

// not sure if test needed
  findAvailableRoomsByDate(date, filterSelection) {
    if (filterSelection === 'none') {
     return this.findRoomsWithoutFilter(date);
    }
     else {
     return this.findRoomsWithFilter(date, filterSelection)
    }
  };

//have test
  findRoomsWithFilter(date, filterSelection) {
    let allRooms = this.allRooms.allRooms;
    let bookedRooms = this.findBookedRoomsByDate(date);
    return allRooms.reduce((availableRooms, room) => {
      if (!bookedRooms.includes(room.number) && room.roomType === filterSelection) {
        availableRooms.push(room)
        // console.log('availableRooms', availableRooms);
      }
      return availableRooms;
    }, []);
  };
 //have test
  findRoomsWithoutFilter(date) {
    let allRooms = this.allRooms.allRooms;
    let bookedRooms = this.findBookedRoomsByDate(date);
    return allRooms.reduce((availableRooms, room) => {
      if (!bookedRooms.includes(room.number)) {
        availableRooms.push(room)
      }
      return availableRooms;
    }, []);
  };
//has test
  findRoomsAvailableToday() {
   let roomNumsBookedToday = this.allBookings.allBookings.filter(booking => {
     if (booking.date === this.date) {
       return booking.roomNumber
     }
   })
     let numAvailableRooms = (this.allRooms.allRooms.length - roomNumsBookedToday.length)
     return numAvailableRooms;
  };
//has test
  formatDates(date) {
    let dateArray = date.split('/');
    let month = dateArray[1];
    let year = dateArray[0];
    let day = dateArray[2];
    if (month <= 9 || day <= 9) {
      let unformattedDate = `${year}/0${month}/0${day}`;
      return unformattedDate
    } 
  }

  findPercentOfAvailableRooms() {
    let percent = (this.roomsAvailableToday / this.allRooms.allRooms.length) * 100;
    let num = parseInt(percent)
    num.toFixed(0)
    return `${num}`
  }

  getTotalRevenue() {
    let matchingBookings = this.allBookings.allBookings.filter(booking => booking.date === this.date);
    let profits = matchingBookings.reduce((acc, match) => {
      this.allRooms.allRooms.forEach(room => {
        if (room.number === match.roomNumber) {
          acc = room.costPerNight + acc
        }
      })
      return acc
    }, 0)
    return profits
  }

  findSearchedUser(name) {
    // console.log('name in findSearch', typeof name);
    // console.log('allUsers', this.allUsers);
    return this.allUsers.users.find(user => user.name === name)
  }








};

export default Hotel;