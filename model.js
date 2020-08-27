const db = require("./database/connection");
const fs = require("fs");
const { Console } = require("console");
function userData(name) {
  return db.query("select * from users where user_name=$1", [name]);
}

function login(username) {
  return new Promise((resolve, reject) => {
    userData(username)
      .then((result) => {
        if (result.rows.length === 0) {
          reject(
            new Error(
              "The name is incorrect ,or maybe you don't have an account please sign up"
            )
          );
        }
        resolve(result.rows[0]);
      })
      .catch(reject);
  });
}
function createNewLike(data) {
  const values = [data.user_id, data.post_id];
  return db.query(
    `INSERT INTO like_posts(user_id, post_id) VALUES($1,$2)`,
    values
  );
}
function createNewUser(username, password) {
  return new Promise((resolve, reject) => {
    getUser(username).then((userData) => {
      if (userData) return reject(new Error("user name exist"));

      db.query(`INSERT INTO users(user_name, password) VALUES($1,$2)`, [
        username,
        password,
      ])
        .then(resolve)
        .catch(reject);
    });
  });
}
function getUser(userName) {
  return new Promise((resolve, reject) => {
    userData(userName)
      .then((result) => {
        if (result.rows.length !== 0) {
          resolve(result.rows[0]);
        } else {
          resolve(null);
        }
      })
      .catch(reject);
  });
}
function getUserPage(username) {
  userData(username).then((results) => results.rows);
}

function getAllPosts() {
  return db.query("SELECT * FROM users_posts").then((results) => {
    return results.rows;
  });
}
async function getAllPostsWithLike(userId) {
  const allPosts = await getAllPosts();
  const userLikes = await getLikes(userId);
  return allPosts.map((post) => {
    post.isliked = userLikes.some((likeData) => {
      return likeData.post_id === post.id;
    });
    return post;
  });
}

function addNewPost(data) {
  const values = [
    data.user_id,
    data["instrument type"],
    data.description,
    data.price,
    data["contact info"],
  ];
  return db.query(
    `INSERT INTO  users_posts( user_id,instrument_type, description ,price,contact_info) VALUES($1,$2,$3,$4,$5)`,
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
  getAllPostsWithLike,
};
