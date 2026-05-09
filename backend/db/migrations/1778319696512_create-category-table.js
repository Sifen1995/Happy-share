/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL
    );

    INSERT INTO categories (name) 
    VALUES ('funny'), ('learn'), ('heartwarming'), ('good news');
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS categories;`);
};