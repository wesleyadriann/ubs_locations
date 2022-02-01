const log = (...args) => {
  console.log(`[LOG][${new Date().toISOString()}] - `, ...args)
}

module.exports = log
