const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('=== DATABASE CONTENT ===\n');

// View Users
console.log('📋 USERS TABLE:');
console.log('─'.repeat(80));
db.all('SELECT id, username, email, created_at FROM users', [], (err, rows) => {
  if (err) {
    console.error('Error reading users:', err);
  } else {
    if (rows.length === 0) {
      console.log('No users found.');
    } else {
      rows.forEach((row, index) => {
        console.log(`\nUser ${index + 1}:`);
        console.log(`  ID: ${row.id}`);
        console.log(`  Username: ${row.username}`);
        console.log(`  Email: ${row.email}`);
        console.log(`  Created: ${row.created_at}`);
      });
    }
  }
  
  console.log('\n' + '─'.repeat(80));
  
  // View Todos
  console.log('\n📝 TODOS TABLE:');
  console.log('─'.repeat(80));
  db.all('SELECT t.id, t.user_id, u.username, t.title, t.description, t.completed, t.deadline, t.created_at FROM todos t LEFT JOIN users u ON t.user_id = u.id ORDER BY t.created_at DESC', [], (err, rows) => {
    if (err) {
      console.error('Error reading todos:', err);
    } else {
      if (rows.length === 0) {
        console.log('No todos found.');
      } else {
        rows.forEach((row, index) => {
          console.log(`\nTodo ${index + 1}:`);
          console.log(`  ID: ${row.id}`);
          console.log(`  User: ${row.username} (ID: ${row.user_id})`);
          console.log(`  Title: ${row.title}`);
          console.log(`  Description: ${row.description || '(empty)'}`);
          console.log(`  Completed: ${row.completed === 1 ? '✅ Yes' : '❌ No'}`);
          console.log(`  Deadline: ${row.deadline || '(not set)'}`);
          console.log(`  Created: ${row.created_at}`);
        });
      }
    }
    
    console.log('\n' + '─'.repeat(80));
    console.log('\n✅ Done!');
    db.close();
  });
});


