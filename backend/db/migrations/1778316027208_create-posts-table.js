/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
   CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  text VARCHAR(280) NOT NULL,
  category VARCHAR(20) NOT NULL,
  link TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE IF EXISTS posts;
  `);
};
