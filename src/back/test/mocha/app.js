const assert = require('assert')
const app = require('../../app.js')

describe('app test', function () {
  it('not found desynchronisation with one note', function () {
    assert.strictEqual(app.checkIfNotDesynchronisation('./test/content/good_sync_1/data', './test/content/good_sync_1/manager.json'), true)
  })

  it('not found desynchronisation with two notes', function () {
    assert.strictEqual(app.checkIfNotDesynchronisation('./test/content/good_sync_2/data', './test/content/good_sync_2/manager.json'), true)
  })

  it('found desynchronisation with one note but incorret manager file', function () {
    assert.strictEqual(app.checkIfNotDesynchronisation('./test/content/bad_sync_1/data', './test/content/bad_sync_1/manager.json'), false)
  })

  it('found desynchronisation with two notes but missing one note file', function () {
    assert.strictEqual(app.checkIfNotDesynchronisation('./test/content/bad_sync_2/data', './test/content/bad_sync_2/manager.json'), false)
  })

  it('found desynchronisation with one note but with a wrong name', function () {
    assert.strictEqual(app.checkIfNotDesynchronisation('./test/content/bad_sync_3/data', './test/content/bad_sync_3/manager.json'), false)
  })

  it('delete note 1 in manager', function () {
    const managerBeforeDelete = { number_increment: 2, note: [{ number: 1, title: 'test' }, { number: 2, title: 'test' }] }
    const managerAfterDelete = { number_increment: 2, note: [{ number: 2, title: 'test' }] }
    assert.deepEqual(app.deleteNoteInManager(managerBeforeDelete, 1), managerAfterDelete)
  })

  it('modify title of note 2 in manager', function () {
    const managerBeforeTitleModification = { number_increment: 2, note: [{ number: 1, title: 'test' }, { number: 2, title: 'test' }] }
    const managerAfterTitleModification = { number_increment: 2, note: [{ number: 1, title: 'test' }, { number: 2, title: 'test2' }] }
    assert.deepEqual(app.changeNoteTitleInManager(managerBeforeTitleModification, 2, 'test2'), managerAfterTitleModification)
  })
})
