import { expect } from 'chai';
import Bookings from '../src/Booking';


describe('Bookings', function() {
  let bookings, allBookings

  beforeEach(function() {
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

  allBookings = new Bookings(bookings)
  });

  it.only('should be a function', function() {
    expect(Bookings).to.be.a('function');
  });

  it.only('should be an instance of Bookings', function() {
    expect(allBookings).to.be.an.instanceof(Bookings);
  });

});