require('dotenv').config();
const knex = require('knex');

const NotesService = require('../src/Notes/notes-service');

describe('Note service object', function() {
  let db;

  let testNotes = [
    { content: 'Im a test note',
      note_name: 'Important',
      id: 1,
      folder_id: 1
    },
    { content: 'So am I',
      note_name: 'Super',
      id: 2,
      folder_id: 1
    },
    { content: 'Me too',
      note_name: 'Spangley',
      id: 3,
      folder_id: 1
    }
  ];

  let newNote = [{ note_name: 'Grocery', content: 'Get some cheese', id: 4, folder_id: 2, modified: new Date()}];

  before('Get database instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  after('Close database', () => {
    db.destroy();
  });

  beforeEach('Reset the test database', () => {
    return db('notes').truncate();
  });

  beforeEach('Insert test data into note table', () => {
    return db.into('notes').insert(testNotes);
  });

  describe('getAllNotes', () => {
    it('it returns all notes from notes table', () => {
      return NotesService.getAllNotes(db).then(notes => {
        expect(notes).to.eql(testNotes);
      });
    });
  });

  describe('addNote', () => {
    it('it should add a note to the note table', () => {
      return NotesService.insertNote(db, newNote).then(note => {
        expect(note).to.have.deep.members(newNote);
      });
    });
  });
});