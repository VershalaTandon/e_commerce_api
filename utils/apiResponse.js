const apiResponse = (success, status, error, data) => {
  const responseObj = {
    Success: success,
    Status: status,
    Message: error,
    data: data,
  };
  return responseObj;
};

module.exports = apiResponse;
