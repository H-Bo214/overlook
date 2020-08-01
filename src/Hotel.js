class Hotel {
  constructor(allRooms, allBookings){
    this.allRooms = allRooms;
    this.allBookings = allBookings;
  }

  findBookedRoomsByDate(date) {
    // let allBookings = this.allBookings.allBookings;
    return this.allBookings.allBookings.reduce((bookedRooms, booking) => {
      if (booking.date === date) {
        bookedRooms.push(booking.roomNumber)
      }
      return bookedRooms;
    }, []);
  };

  findAvailableRoomsByDate(date) {
    // let allRooms = this.allRooms.allRooms;
    let bookedRooms = this.findBookedRoomsByDate(date);

    return this.allRooms.allRooms.reduce((availableRooms, room) => {
      if (!bookedRooms.includes(room.number)) {
        availableRooms.push(room)
      }
      return availableRooms;
    }, []);
  };









}









export default Hotel;