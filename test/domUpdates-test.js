const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
import domUpdates from '../src/domUpdates';
import User from '../src/User';


describe.skip('domUpdates', function() {
  beforeEach(() => {
    let user, myBookings, myRooms, myMoneySpent, allBookings, allRooms, myBookingDetails;

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



    global.document = {};
    chai.spy.on(document, [ 'querySelector', 'classList', 'add' ], () => {
      return {
        innerHTML: '',
        // add: ''
        // insertAdjacentHTML: () => {},
        // forEach: () => {}
      }
    });
  });

  it.only('should spy on displayHeader', function() {
    domUpdates.displayClientPage();
    expect(document.querySelector).to.have.been.called(1)
    // expect(document.querySelector).to.have.been.called.with('.login-header')
  });

 
})