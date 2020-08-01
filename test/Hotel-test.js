import { expect } from 'chai';
import Hotel from '../src/Hotel';
import Bookings from '../src/Booking';
import Rooms from '../src/Room';

describe('Hotel', function() {
 let bookings, allBookings, rooms, allRooms, hotel

  beforeEach(function() {
    rooms = [{
      "number": 15,
      "roomType": "residential suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 358.4
    },
    {
      "number": 24,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 2,
      "costPerNight": 477.38
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
      "number": 12,
      "roomType": "single room",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 2,
      "costPerNight": 340.17
    },
  ];

  bookings = [{
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 9,
    "date": "2020/04/22",
    "roomNumber": 15,
    "roomServiceCharges": []
  },
  {
    "id": "5fwrgu4i7k55hl6t5",
    "userID": 43,
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
    "userID": 20,
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

  allRooms = new Rooms(rooms)
  allBookings = new Bookings(bookings)
  hotel = new Hotel(allRooms, allBookings)
  });

  it.only('should be a function', function() {
    expect(Hotel).to.be.a('function');
  });

  it.only('should be an instance of Hotel', function() {
    expect(hotel).to.be.an.instanceof(Hotel);
  });

});
