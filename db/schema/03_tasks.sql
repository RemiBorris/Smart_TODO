-- Drop and recreate Tasks table

DROP TABLE IF EXISTS tasks CASCADE;
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE
);
