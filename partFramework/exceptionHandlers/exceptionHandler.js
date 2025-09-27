module.exports = function (exception, loader, command) {
    return {
      data: {
        massege: exception?.message,
        reason: exception?.reason
      },
      statusCode: exception?.statusCode
    };
  };