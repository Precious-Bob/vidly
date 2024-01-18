exports.error = async (err, req, res, next) => {
  res.status(500).send('Something failed');
};
