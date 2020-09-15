const assert = require('assert');
const app = require('../../app.js');

describe('app test', function() {
    it('not found desynchronisation', function () {
        assert.equal(app.checkIfNotDesynchronisation('./test/content/good_sync/data', './test/content/good_sync/manager.json'), true);
    });
    it('found desynchronisation 1', function () {
        assert.equal(app.checkIfNotDesynchronisation('../content/bad_sync_1/data', '../content/bad_sync_1/manager.json'), false);
    });
});