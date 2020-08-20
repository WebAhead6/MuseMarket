const db = require("./database/connection");

function getAllPosts() {
  return db.query("SELECT * FROM users_posts").then((results) => {
    return results.rows;
  });
}
function createNewLike(data) {
  const values = [data.user_id, data.post_id];
  console.log("hoon", values);
  return db.query(
    `INSERT INTO like_posts(user_id, post_id) VALUES($1,$2)`,
    values
  );
}

function createNewUser(data) {
  return new Promise((resolve, reject) => {
    const values = [data.name, data.password, data["confirm password"]];

    if (values[1] !== values[2]) {
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
        if (result.rows.length !== 0) {
          resolve(result.rows[0]);
          console.log(result.rows[0]);
        } else {
          resolve(null);
        }
      })
      .catch(reject);
  });
}

function getUserPage(userName) {
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

function login(data) {
  return new Promise((resolve, reject) => {
    const values = [data.name, data.password];
    db.query("select * from users where user_name=$1 and password=$2", values)
      .then((result) => {
        console.log(result.rows[0].user_name);
        if (
          result.rows[0].user_name !== values[0] ||
          result.rows[0].password !== values[1]
        ) {
          return reject(
            new Error(
              "The name or passowrd is incorrect ,or maybe you don't have an account please sign up"
            )
          );
        }
        return resolve(data);
      })
      .catch(reject);
  });
}

module.exports = {
  createNewLike,
  createNewUser,
  getUser,
  getAllPosts,
  login,
  getUserPage,
};
