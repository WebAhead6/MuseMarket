const db = require("./database/connection");

function getAllPosts() {
  return db.query("SELECT * FROM users_posts").then((results) => {
    return results.rows;
  });
}

function createNewUser(data) {
  return new Promise((resolve, reject) => {
    const values = [data.name, data.password, data["confirm password"]];
    console.log(values);
    if (values[1] !== values[2]) {
      console.log("aaa");
      return reject(new Error("not the same password"));
    }
    getUser(data.name).then((userData) => {
      if (userData) return reject(new Error("user name exist"));

      db.query(`INSERT INTO users(user_name, password) VALUES($1,$2)`, values)
        .then(resolve)
        .catch(reject);
    });
  });
}

function getUser(userName) {
  return new Promise((resolve, reject) => {
    db.query("select * from users where user_name=$1", [userName])
      .then((result) => {
        if (result.rows.length !== 0) resolve(result.rows[0]);
      })
      .catch(reject);
  });
}

module.exports = { createNewUser, getUser, getAllPosts };
