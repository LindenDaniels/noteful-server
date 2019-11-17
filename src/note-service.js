const NoteService = {
    getAllNotes(knexInstance) {
      return knexInstance
        .select('*')
        .from('notes')
        .then(note => {
          return note;
        });
    },
  
    addNote(knexInstance, note) {
      return knexInstance
        .insert(note)
        .into('notes')
        .returning('*')
        .then(note => {
          return note[0];
        });
    },
  
    getNoteById(knexInstance, id) {
      return knexInstance
        .from('note')
        .select('*')
        .where('id', id)
        .first();
    },
  
    deleteNote(knexInstance, id) {
      return knexInstance('note')
        .where({ id })
        .delete();
    }
  };
  
  module.exports = NoteService;