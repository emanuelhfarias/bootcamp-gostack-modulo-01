function logMiddleware(req, _, next) {
  console.time('Request');
  console.log(`Method: ${req.method} ${req.url}`);
  next();
  console.timeEnd('Request');
}

module.exports = {logMiddleware};