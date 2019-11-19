DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name TEXT NOT NULL,
  modified TIMESTAMP WITH TIME ZONE NOT NULL default now(),
  content TEXT,
  folder_id INTEGER REFERENCES folders(id) ON DELETE CASCADE NOT NULL
)