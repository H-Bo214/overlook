import { expect } from 'chai';
import Hotel from '../src/Hotel';
import BookingRepo from '../src/Booking-repo';
import Rooms from '../src/Room';

describe('Hotel', function() {
 let bookings, allBookings, rooms, allRooms, hotel

  beforeEach(function() {
    allRooms = [{
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
      "number": 13,
      "roomType": "single room",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 2,
      "costPerNight": 340.17
    },
    {
      "number": 6,
      "roomType": "junior suite",
      "bidet": true,
      "bedSize": "king",
      "numBeds": 2,
      "costPerNight": 340.17
    },
  ];

  allBookings = [{
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
    "roomNumber": 13,
    "roomServiceCharges": []
  },
// Booked room for 2020/08/01
  {
    "id": "2w2w2w2w2w2w2w2w2w",
    "userID": 1,
    "date": "2020/08/01",
    "roomNumber": 6,
    "roomServiceCharges": []
  }
];

  rooms = new Rooms(allRooms);
  bookings = new BookingRepo(allBookings);
  hotel = new Hotel(rooms, bookings);
});

  it.only('should be a function', function() {
    expect(Hotel).to.be.a('function');
  });

  it.only('should be an instance of Hotel', function() {
    // console.log('hotel', hotel);
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  it.only('should find booked rooms by date', function() {
    expect(hotel.findBookedRoomsByDate("2020/08/01")).to.deep.equal([6])
  });

  it.only('should find booked rooms by date', function() {
    expect(hotel.findBookedRoomsByDate("2020/08/01")).to.deep.equal([6])
  });

  it.only('should find available rooms by date and room type', function() {
    expect(hotel.findRoomsWithFilter("2020/08/01", 'residential suite')).to.deep.equal([allRooms[0]])
  });

  it.only('should filter rooms date', function() {
    expect(hotel.findRoomsWithoutFilter('2020/08/01')).to.deep.equal([allRooms[0], allRooms[1], allRooms[2], allRooms[3], allRooms[4]])
  });



});
