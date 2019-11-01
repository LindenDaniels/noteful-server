const FolderService = {
    getAllFolders(knexInstance) {
      return knexInstance
        .select('*')
        .from('folders')
        .then(folders => {
          return folders;
        });
    },
  
    addFolder(knexInstance, folder) {
      return knexInstance
        .insert(folder)
        .into('folders')
        .returning('*')
        .then(folder => {
          return folder[0];
        });
    },
  
    getById(knexInstance, id) {
      return knexInstance
        .from('folders')
        .select('*')
        .where('id', id)
        .first();
    }
  };
  module.exports = FolderService;