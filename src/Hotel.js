class Hotel {
  constructor(allRooms, allBookings, clientsData, todaysDate) {
    this.allRooms = allRooms;
    this.allBookings = allBookings;
    this.allUsers = clientsData;
    this.date = this.formatDates(todaysDate);
    this.roomsAvailableToday = this.findRoomsAvailableToday();
    this.percentRoomAvailable = this.findOccupancyPercentage();
    this.totalRevenue = this.getTotalRevenue()
  };

  findBookedRoomsByDate(date) {
    let allBookings = this.allBookings.allBookings;
    return allBookings.reduce((bookedRooms, booking) => {
      if (booking.date === date) {
        bookedRooms.push(booking.roomNumber)
      }
      return bookedRooms;
    }, []);
  };

  findAvailableRoomsByDate(date, filterSelection) {
    if (filterSelection === 'none') {
     return this.findRoomsWithoutFilter(date);
    }
     else {
     return this.findRoomsWithFilter(date, filterSelection)
    }
  };

  findRoomsWithFilter(date, filterSelection) {
    let allRooms = this.allRooms.allRooms;
    let bookedRooms = this.findBookedRoomsByDate(date);
    return allRooms.reduce((availableRooms, room) => {
      if (!bookedRooms.includes(room.number) && room.roomType === filterSelection) {
        availableRooms.push(room)
      }
      return availableRooms;
    }, []);
  };

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

  findRoomsAvailableToday() {
    let allBookings = this.allBookings.allBookings;
    let allRooms = this.allRooms.allRooms;
    let numRoomsBookedToday = allBookings.filter(booking => booking.date === this.date)
    let numAvailableRooms = (allRooms.length - numRoomsBookedToday.length)
    return numAvailableRooms;
  };

  formatDates(date) {
    let dateArray = date.split('/');
    let month = dateArray[1];
    let year = dateArray[0];
    let day = dateArray[2];
    if (month <= 9 || day <= 9) {
      let dateFormat = `${year}/0${month}/0${day}`;
      return dateFormat;
    } 
  }

  findOccupancyPercentage() {
    let percent = (this.roomsAvailableToday / this.allRooms.allRooms.length) * 100;
    let remainingPercent = 100 - percent;
    let num = parseInt(remainingPercent)
    num.toFixed(0)
    return `${num}`
  }

  getTotalRevenue() {
    let allRooms = this.allRooms.allRooms;
    let allBookings = this.allBookings.allBookings;
    let matchingBookings = allBookings.filter(booking => booking.date === this.date);
    let revenue = matchingBookings.reduce((todaysTotal, match) => {
      allRooms.forEach(room => {
        if (room.number === match.roomNumber) {
          todaysTotal += room.costPerNight; 
        };
      });
      return todaysTotal;
    }, 0);
    revenue = Number(revenue.toFixed(2))
    return revenue;
  }

  findSearchedUserName(name) {
    return this.allUsers.users.find(user => user.name === name)
  }

  deleteABooking(managerBookingID) {
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: managerBookingID
        })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

};

export default Hotel;