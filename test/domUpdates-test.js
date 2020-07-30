const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');

import domUpdates from '../src/domUpdates';

chai.use(spies);

describe('domUpdates', function() {
  beforeEach(() => {
    

    

    global.document = {};
    chai.spy.on(document, ['getElementById', 'querySelector', 'querySelectorAll'], () => {
      return {
        innerText: '',
        insertAdjacentHTML: () => {},
        forEach: () => {}
      }
    });
  });

})