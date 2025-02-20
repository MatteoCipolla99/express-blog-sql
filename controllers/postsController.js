const connection = require("../data/db");
const postsData = require("../data/postsData");

//index
function index(req, res) {
  const sql = `SELECT * FROM posts`;
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
}
//show

function show(req, res) {
  const id = req.params.id;
  const sql = "SELECT * FROM posts WHERE id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Posts not found" });
    res.json(results[0]);
  });
}

//create
const create = (req, res) => {
  const id = postsData[postsData.length - 1].id + 1;

  const newPost = {
    id: id,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };

  postsData.push(newPost);

  res.status(201).json(newPost);
};

//update
const update = (req, res) => {
  const { id } = req.params;

  const post = postsData.find((post) => post.id === id);

  if (!post) {
    return res.sendStatus(404);
  }

  post.title = req.body.title;
  post.content = req.body.content;
  post.image = req.body.image;
  post.tags = req.body.tags;

  res.json(post);
};

//modify

const modify = (req, res) => {
  const { id } = req.params;

  const post = postsData.find((post) => post.id === id);

  if (!post) {
    return res.sendStatus(404);
  }

  post.title = req.body.title;
  post.content = req.body.content;
  post.image = req.body.image;
  post.tags = req.body.tags;

  res.json(post);
};

//destroy

function destroy(req, res) {
  const { id } = req.params;
  connection.query("DELETE FROM posts WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete posts" });
    res.sendStatus(204);
  });
}
module.exports = {
  index,
  show,
  create,
  update,
  modify,
  destroy,
};
