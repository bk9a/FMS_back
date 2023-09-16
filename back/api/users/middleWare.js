module.exports.list = (req, res, next) => {
  const { page } = req.query;
  const pager = { limit: 5, offset: 0 };
  if (page && page.number && page.size) {
    pager.limit = parseInt(page.size + "");
    pager.offset = parseInt(page.size + "") * (parseInt(page.number + "") - 1);
  }
  req.pager = pager;
  next();
};
