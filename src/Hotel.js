class Hotel {
  constructor(allRooms, allBookings) {
    this.allRooms = allRooms;
    this.allBookings = allBookings;
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

};

export default Hotel;