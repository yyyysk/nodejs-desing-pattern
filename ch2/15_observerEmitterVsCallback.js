function helloEvents() {
  const eventEmitter = new EventEmitter();
  setTimeout(() => {
    eventEmitter.emit('hello', 'hello world');
  }, 100);

  return eventEmitter;
}

function helloCallback(callback) {
  setTimeout(() => {
    callback('hello world')
  }, 100);
}

// おなじことやってる、２つとも
// 
