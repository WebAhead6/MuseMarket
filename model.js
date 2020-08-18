const db = require("./database/connection");

function getAllPosts() {
  return db.query("SELECT * FROM users_posts").then((results) => {
    return results.rows;
  });
}
function getUser(username) {
  console.log(username);
  return db
    .query(
      `
          SELECT user_name
           FROM users 
          WHERE user_name = $1
          `,
      [username]
    )

    .then((results) => results.rows);
}

module.exports = { getAllPosts, getUser };
