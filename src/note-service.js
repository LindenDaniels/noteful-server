const NoteService = {
    getAllNotes(knexInstance) {
      return knexInstance
        .select('*')
        .from('notes')
        .then(note => {
          return note;
        });
    },
  
    addNote(knexInstance, newNote) {
      return knexInstance
        .insert(newNote)
        .into('notes')
        .returning("*")
        .then(rows => {
          return rows[0];
        })
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