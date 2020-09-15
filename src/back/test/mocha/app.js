const assert = require('assert');
const app = require('../../app.js');

describe('app test', function() {
    it('not found desynchronisation', function () {
        assert.equal(app.checkIfNotDesynchronisation('./content/good_sync/data', './content/good_sync/manager.json'), true);
    });
});