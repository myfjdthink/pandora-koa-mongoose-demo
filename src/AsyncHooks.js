var createNamespace = require('cls-hooked').createNamespace;
var session = createNamespace('my session');

async function main () {
  const fake = new Fake()
  const result = await fake.query(233)    // end 方法内将拿不到 session user
  // const result = await fake.query(233).then()  // end 方法内可以拿到 session user
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

