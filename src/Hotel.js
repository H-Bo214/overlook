class Hotel {
  constructor(allRooms, allBookings) {
    this.allRooms = allRooms;
    this.allBookings = allBookings;
  }

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
        console.log('availableRooms', availableRooms);
      }
      return availableRooms;
    }, []);
  }
 
  findRoomsWithoutFilter(date) {
    let allRooms = this.allRooms.allRooms;
    let bookedRooms = this.findBookedRoomsByDate(date);
    return allRooms.reduce((availableRooms, room) => {
      if (!bookedRooms.includes(room.number)) {
        availableRooms.push(room)
      }
      return availableRooms;
    }, []);
  }


  filterRoomsByType(filterSelection) {
    let filteredRooms = this.allRooms.allRooms.filter(room => room.roomType.includes(filterSelection));
    console.log('filteredRooms', filteredRooms);
    return filteredRooms;
  }





}









export default Hotel;