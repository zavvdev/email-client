const mysql = require("serverless-mysql");

const db = mysql({
  config: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

async function exec(executor, successMessage, errorMessage) {
  try {
    await executor(db);
    await db.end();
    console.log(successMessage);
  } catch (e) {
    console.error(errorMessage, e);
    throw e;
  }
}

function clear() {
  return exec(
    async (db) => {
      // Drop tables with foreign key constraints first
      await db.query(`DROP TABLE IF EXISTS email_folders;`);
      await db.query(`DROP TABLE IF EXISTS folders;`);
      await db.query(`DROP TABLE IF EXISTS emails;`);
      await db.query(`DROP TABLE IF EXISTS users;`);
    },
    "Tables cleared.",
    "Unable to clear tables.",
  );
}

function migrate() {
  return exec(
    async (db) => {
      await db.query(`
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          first_name VARCHAR(50) NOT NULL,
          last_name VARCHAR(50) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          password VARCHAR(60) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await db.query(`
        CREATE TABLE emails (
          id INT AUTO_INCREMENT PRIMARY KEY,
          subject VARCHAR(100) NOT NULL,
          body VARCHAR(500) NOT NULL,
          sender_id INT NOT NULL,
          recipient_email VARCHAR(100) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (sender_id) REFERENCES users(id)
        );
      `);

      await db.query(`
        CREATE TABLE folders (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(50) NOT NULL
        );
      `);

      await db.query(`
        CREATE TABLE email_folders (
          id INT AUTO_INCREMENT PRIMARY KEY,
          folder_id INT NOT NULL,
          email_id INT NOT NULL,
          FOREIGN KEY (folder_id) REFERENCES folders(id),
          FOREIGN KEY (email_id) REFERENCES emails(id)
        );
      `);
    },
    "Tables migrated.",
    "Unable to migrate tables.",
  );
}

function seed() {
  return exec(
    async (db) => {
      await db.query(`
        INSERT INTO folders (name) 
        VALUES 
          ('inbox'),
          ('sent'),
          ('starred'),
          ('spam');
      `);
    },
    "Tables seeded.",
    "Unable to seed tables.",
  );
}

async function main() {
  await clear();
  await migrate();
  await seed();
}

main()
  .catch((e) => {
    console.error("Error setting up database", e);
  })
  .finally(() => {
    process.exit();
  });
