const connection = require("../data/db");

const postsData = require("../data/postsData");

//index
const index = (req, res) => {
  let postsFiltered = postsData;
  const { tag } = req.query;
  if (tag) {
    postsFiltered = postsFiltered.filter((post) => post.tags.includes(tag));
  }
  res.json(postsFiltered);
};

//show

const show = (req, res) => {
  const id = parseInt(req.params.id);

  const post = postsData.find((post) => post.id === id);

  if (!post) {
    return res.sendStatus(404);
  }
  res.json(post);
};

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

const destroy = (req, res) => {
  const { id } = req.params;

  const postIndex = postsData.findIndex((post) => post.id === id);

  if (postIndex < 0) {
    return res.sendStatus(404);
  }

  postsData.splice(postIndex, 1);

  console.log(postsData);

  res.sendStatus(204);
};

module.exports = {
  index,
  show,
  create,
  update,
  modify,
  destroy,
};
