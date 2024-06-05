// Database.js

import * as SQLite from 'expo-sqlite';

// Open or create the SQLite database
const db = SQLite.openDatabase('mydb.db');

// Initialize the database (create tables if they don't exist)
const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, postId INT, comment TEXT)',
      [],
      () => console.log('Table created successfully'),
      error => console.error('Error creating table: ', error)
    );
  });
};

// Add a comment to the database
const addCommentToDB = (postId, comment) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO comments (postId, comment) VALUES (?, ?)',
      [postId, comment],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log('Comment added successfully');
        } else {
          console.warn('Failed to add comment');
        }
      },
      error => console.error('Error adding comment: ', error)
    );
  });
};

// Fetch comments for a specific post from the database
const fetchCommentsFromDB = postId => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM comments WHERE postId = ?',
        [postId],
        (_, { rows }) => {
          const comments = rows._array;
          resolve(comments);
        },
        error => {
          console.error('Error fetching comments: ', error);
          reject(error);
        }
      );
    });
  });
};

// Export database functions
export { initDatabase, addCommentToDB, fetchCommentsFromDB };
