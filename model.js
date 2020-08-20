const db = require("./database/connection");

function login(data) {
  return new Promise((resolve, reject) => {
    const values = [data.name, data.password];
    db.query("select * from users where user_name=$1 and password=$2", values)
      .then((result) => {
        console.log(result.rows);
        if (result.rows.length === 0) {
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

function getUserPage(username) {
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

function getAllPosts() {
  return db.query("SELECT * FROM users_posts").then((results) => {
    return results.rows;
  });
}

function addNewPost(data) {
  const values = [
    data.user_id,
    data["instrument type"],
    data.description,
    data.price,
    data["contact info"],
    data.urlImage,
  ];
  console.log(values);
  return db.query(
    `INSERT INTO  users_posts( user_id,instrument_type, description ,price,contact_info, imgUrl) VALUES($1,$2,$3,$4,$5,$6)`,
    values
  );
}
function getLikes(user_id) {
  return db
    .query(
      `select * from users_posts inner join
  like_posts ON like_posts.post_id = users_posts.id where like_posts.user_id = $1 `,
      [user_id]
    )
    .then((results) => results.rows);
}
module.exports = {
  getLikes,
  createNewLike,
  createNewUser,
  getUser,
  getAllPosts,
  login,
  getUserPage,
  addNewPost,
};
