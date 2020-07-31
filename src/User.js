class User {
  constructor(currentClient, allBookings, allRooms) {
    this.id = currentClient.id;
    this.name = currentClient.name;
    this.allClientBookings = allBookings.filter(booking => booking.userID === currentClient.id);
    this.clientRoomsStayedIn = this.findMyRooms(allRooms)
    this.totalMoneySpent = this.getTotalMoneySpent();
  }

  getTotalMoneySpent() {
    let totalSpent = this.clientRoomsStayedIn.reduce((roomCost, room) => {
      roomCost += room.costPerNight;
      return roomCost;
    }, 0);
    return totalSpent.toFixed(2);
  };

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






};

  







export default User;