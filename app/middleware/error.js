module.exports = options => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log('catch error: ', err);
    console.log('catch message: ', err.message);
    console.log('catch statusCode: ', err.statusCode);
    let message = err.message || '服务器内部错误!';
    let status = err.status || err.statusCode || 500;

    ctx.status = status;
    ctx.body = {
      message,
    };
  }
};
