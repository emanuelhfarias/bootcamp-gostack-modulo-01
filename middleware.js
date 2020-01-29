function logMiddleware(req, _, next) {
  console.time('Request');
  console.log(`Method: ${req.method} ${req.url}`);
  next();
  console.timeEnd('Request');
}

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({error: 'User name is required.'});
  }
  return next();
}

module.exports = {logMiddleware, checkUserExists};