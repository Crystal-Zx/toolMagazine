const promisesAplusTests = require('promises-aplus-tests')
const adapter = require('./adapter.cjs')

promisesAplusTests(adapter, err => {
  if (err) {
    console.error(err)
  } else {
    console.log('Tests passed!')
  }
})
