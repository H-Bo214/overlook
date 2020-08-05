import { expect } from 'chai';
import BookingRepo from '../src/Booking-repo';

describe('BookingRepo', function () {
  let bookings, allBookings

  beforeEach(function () {
    allBookings = [{
      "id": "5fwrgu4i7k55hl6sz",
      "userID": 9,
      "date": "2020/04/22",
      "roomNumber": 1,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6t5",
      "userID": 43,
      "date": "2020/01/24",
      "roomNumber": 2,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6t6",
      "userID": 13,
      "date": "2020/01/10",
      "roomNumber": 3,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6t7",
      "userID": 20,
      "date": "2020/02/16",
      "roomNumber": 4,
      "roomServiceCharges": []
    },
    {
      "id": "5fwrgu4i7k55hl6t8",
      "userID": 1,
      "date": "2020/02/05",
      "roomNumber": 5,
      "roomServiceCharges": []
    },
    {
      "id": "2w2w2w2w2w2w2w2w2w",
      "userID": 1,
      "date": "2020/08/01",
      "roomNumber": 6,
      "roomServiceCharges": []
    }
    ];

    bookings = new BookingRepo(allBookings);
  });

  it('should be a function', function () {
    expect(BookingRepo).to.be.a('function');
  });

  it('should be an instance of BookingRepo', function () {
    expect(bookings).to.be.an.instanceof(BookingRepo);
  });

});