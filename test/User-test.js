import { expect } from 'chai';
import User from '../src/User';

describe('User', function () {
  let user, myBookings, myRooms, myMoneySpent, allBookings, allRooms, myBookingDetails;

  beforeEach(function () {
    myBookings = [{
        "id": "5fwrgu4i7k55hl6sz",
        "userID": 20,
        "date": "2020/04/22",
        "roomNumber": 15,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t5",
        "userID": 20,
        "date": "2020/01/24",
        "roomNumber": 24,
        "roomServiceCharges": []
      }
    ];

    myRooms = [{
        "number": 15,
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 500
      },
      {
        "number": 24,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 2,
        "costPerNight": 500
      },
    ];

    allBookings = [{
        "id": "5fwrgu4i7k55hl6sz",
        "userID": 20,
        "date": "2020/04/22",
        "roomNumber": 15,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t5",
        "userID": 20,
        "date": "2020/01/24",
        "roomNumber": 24,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t6",
        "userID": 13,
        "date": "2020/01/10",
        "roomNumber": 12,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t7",
        "userID": 16,
        "date": "2020/02/16",
        "roomNumber": 7,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t8",
        "userID": 1,
        "date": "2020/02/05",
        "roomNumber": 12,
        "roomServiceCharges": []
      },
    ];

    allRooms = [{
        "number": 15,
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 500
      },
      {
        "number": 24,
        "roomType": "suite",
        "bidet": false,
        "bedSize": "full",
        "numBeds": 2,
        "costPerNight": 500
      },
      {
        "number": 12,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "king",
        "numBeds": 1,
        "costPerNight": 491.14
      },
      {
        "number": 7,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 429.44
      },
      {
        "number": 19,
        "roomType": "single room",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 2,
        "costPerNight": 340.17
      },
    ];

    myMoneySpent = "1000.00";

    myBookingDetails = [{
      "date": "2020/04/22",
      "roomNumber": 15
    }, {
      "date": "2020/01/24",
      "roomNumber": 24
    }];

    user = new User({
      "id": 20,
      "name": "Kennedi Emard"
    }, allBookings, allRooms)

  });

  it('should be a function', function () {
    expect(User).to.be.a('function');
  });

  it.only('should be an instance of User', function () {
    expect(user).to.be.an.instanceof(User);
  });

  it.only('should have an id', function () {
    expect(user.id).to.equal(20);
  });

  it.only('should have a name', function () {
    expect(user.name).to.equal('Kennedi Emard');
  });

  it.only('should have all of this users bookings', function () {
    expect(user.allClientBookings).to.deep.equal(myBookings);
  });

  it.only('should have all of this users rooms they have stayed in', function () {
    expect(user.clientRoomsStayedIn).to.deep.equal(myRooms);
  });

  it.only('should have the total money spent on stays', function () {
    expect(user.totalMoneySpent).to.equal('1000.00');
  });

  it.only('should have a method to get total money spent', function () {
    expect(user.getTotalMoneySpent()).to.equal('1000.00');
  });

  it.only('should have a method to get rooms stayed in', function () {
    expect(user.findMyRooms(allRooms)).to.deep.equal(myRooms);
  });

  it.only('should get the date and room number of my bookings', function () {
    expect(user.getMyBookings()).to.deep.equal(myBookingDetails);
  });

});