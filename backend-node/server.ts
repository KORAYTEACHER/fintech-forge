import { io, server } from './src/app';

const startServer = async () => {
  const port = process.env.PORT || 5050;

  server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

io.on('connection', socket => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

startServer();
