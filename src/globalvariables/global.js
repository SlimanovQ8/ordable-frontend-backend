let counter = 0;

const increment = () => {
  counter++;
  console.log('counter_updated', counter);
};

const worker = {
  increment,
  counter
};

module.exports = worker