const errorHandler = (error, res) => {
  switch (error.code) {
    case 404:
      return res.status(404).json({ message: error.message });
    default:
      return res.status(500).json(error);
  }
};


const generatePaginationMeta = (dbResult, limit, page) => {
  const paginationMeta = {
    pageCount: Math.ceil(dbResult.count / limit),
    totalCount: dbResult.count,
    outputCount: dbResult.rows.length,
    pageSize: limit,
    currentPage: page + 1
  };
  return paginationMeta;
};

export { errorHandler, generatePaginationMeta };
