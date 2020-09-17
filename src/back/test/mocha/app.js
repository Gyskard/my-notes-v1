const assert = require('assert');
const app = require('../../app.js');

describe('app test', function() {
    it('not found desynchronisation with one note', function () {
        assert.strictEqual(app.checkIfNotDesynchronisation('./test/content/good_sync_1/data', './test/content/good_sync_1/manager.json'), true);
    });

    it('not found desynchronisation with two notes', function () {
        assert.strictEqual(app.checkIfNotDesynchronisation('./test/content/good_sync_2/data', './test/content/good_sync_2/manager.json'), true);
    });

    it('found desynchronisation with one note but incorret manager file', function () {
        assert.strictEqual(app.checkIfNotDesynchronisation('../content/bad_sync_1/data', '../content/bad_sync_1/manager.json'), false);
    });
    
    it('found desynchronisation with two notes but missing one note file', function () {
        assert.strictEqual(app.checkIfNotDesynchronisation('../content/bad_sync_2/data', '../content/bad_sync_2/manager.json'), false);
    });
});