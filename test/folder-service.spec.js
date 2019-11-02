require('dotenv').config();
const knex = require('knex');

const FolderService = require('../src/folder-service');

describe('Folder service object', function() {
  let db;

  let testFolders = [
    {
      folder_name: 'Important',
      id: 1
    },
    {
      folder_name: 'Super',
      id: 2
    },
    {
      folder_name: 'Spangley',
      id: 3
    }
  ];

  let newFolder = [ { id: 4, folder_name: 'Grocery' } ];

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
    return db.raw('TRUNCATE folders RESTART IDENTITY CASCADE')
  });

  beforeEach('Insert test data into folder table', () => {
    return db.into('folders').insert(testFolders);
  });

  describe.only('getAllFolders', () => {
    it('it returns all folders from folders table', () => {
      return FolderService.getAllFolders(db).then(folders => {
        expect(folders).to.have.members(testFolders);
      });
    });
  });

  describe('addFolder', () => {
    it('it should add a folder to the folder table', () => {
      return FolderService.addFolder(db, newFolder).then(folder => {
        expect(folder).to.equal(newFolder);
      });
    });
  });
});