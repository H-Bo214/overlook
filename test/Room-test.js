import { expect } from 'chai';
import Rooms from '../src/Room';

describe('Rooms', function() {
 let rooms, allRooms

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

  allRooms = new Rooms(rooms)
  });

  it.only('should be a function', function() {
    expect(Rooms).to.be.a('function');
  });

  it.only('should be an instance of Rooms', function() {
    expect(allRooms).to.be.an.instanceof(Rooms);
  });

});