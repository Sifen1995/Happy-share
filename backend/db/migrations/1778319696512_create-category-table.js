/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL
    );

    -- This change prevents the "Duplicate Key" error
    INSERT INTO categories (name) 
    VALUES ('funny'), ('learn'), ('heartwarming'), ('good news')
    ON CONFLICT (name) DO NOTHING; 
  `);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE IF EXISTS categories;`);
};