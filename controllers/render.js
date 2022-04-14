module.exports = (httpStatus) => (req, res) => {
  res.status(httpStatus).send(req.render);
};
