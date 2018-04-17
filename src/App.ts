import * as Koa from 'koa'
import {User} from './UserModel'
import * as tracer from 'tracer'

const logger = tracer.console()

const app = new Koa()

app.use(async (ctx, next) => {
  logger.log(1)
  ctx.body = await d1()
})

async function d1 () {
  logger.log(2)
  return await d2()
}

async function d2 () {
  logger.log(3)
  const user = await User.findOne({}).then()
  logger.log('hello')
  logger.log('user:', user)
  return user
}

app.listen(3013)
