module.exports = function () {
  process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });

  process.on('uncaughtException', (err) => {
    console.log('WE GOT AN UNCAUGHT EXCEPTION🎆🎆🎆, shutting down....');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
};
