const assert = require('assert')
const app = require('../../app.js')

describe('app test', function () {
  it('not found de-synchronisation with one note', function () {
    assert.strictEqual(app.checkIfNotDesynchronisation('./test/mocha/content/good_sync_1/data', './test/mocha/content/good_sync_1/manager.json'), true)
  })

  it('not found de-synchronisation with two notes', function () {
    assert.strictEqual(app.checkIfNotDesynchronisation('./test/mocha/content/good_sync_2/data', './test/mocha/content/good_sync_2/manager.json'), true)
  })

  it('found de-synchronisation with one note but incorrect manager file', function () {
    assert.strictEqual(app.checkIfNotDesynchronisation('./test/mocha/content/bad_sync_1/data', './test/mocha/content/bad_sync_1/manager.json'), false)
  })

  it('found de-synchronisation with two notes but missing one note file', function () {
    assert.strictEqual(app.checkIfNotDesynchronisation('./test/mocha/content/bad_sync_2/data', './test/mocha/content/bad_sync_2/manager.json'), false)
  })

  it('found de-synchronisation with one note but with a wrong name', function () {
    assert.strictEqual(app.checkIfNotDesynchronisation('./test/mocha/content/bad_sync_3/data', './test/mocha/content/bad_sync_3/manager.json'), false)
  })

  it('delete note 1 in manager', function () {
    const managerBeforeDelete = { number_increment: 2, note: [{ number: 1, title: 'test' }, { number: 2, title: 'test' }] }
    const managerAfterDelete = { number_increment: 2, note: [{ number: 2, title: 'test' }] }
    assert.deepStrictEqual(app.deleteNoteInManager(managerBeforeDelete, 1), managerAfterDelete)
  })

  it('modify title of note 2 in manager', function () {
    const managerBeforeTitleModification = { number_increment: 2, note: [{ number: 1, title: 'test' }, { number: 2, title: 'test' }] }
    const managerAfterTitleModification = { number_increment: 2, note: [{ number: 1, title: 'test' }, { number: 2, title: 'test2' }] }
    assert.deepStrictEqual(app.changeNoteTitleInManager(managerBeforeTitleModification, 2, 'test2'), managerAfterTitleModification)
  })
})
