var createNamespace = require('cls-hooked').createNamespace;
var session = createNamespace('my session');
var util = require('util');

async function main () {
  const fake = new Fake()
  // const result = await fake.query(233)    // not work, function end  ession.get('user') is undefined
  const result = await util.promisify(fake.query)(233) // work
  // const result = await fake.query(233).then()  // work
  console.log('result ', result)
}

function Fake () {
  // empty
}

Fake.prototype.query = function (ct) {
  this.ct = ct
  console.log('session user :', session.get('user'))
  console.log('set query ct', ct)
  return this
}

Fake.prototype.end = function (callback) {
  const self = this
  setTimeout(function () {
    console.log('session user :', session.get('user'))
    console.log('do query ', self.ct)
    callback(self.ct)
  })
}

Fake.prototype.then = function (resolve, reject) {
  const self = this
  let promise = new Promise(function (innerResolve) {
    self.end(innerResolve)
  })
  return promise.then(resolve, reject)
}

session.run(function () {
  session.set('user', 'flag')
  main().then()
})

