import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa'
import {addOne, getAllList, editOne, tickOne, delOne} from '../controllers/list' 

import schema from '../graphql/schema'

const router = require('koa-router')()

router.post('/addOne', addOne)
      .post('/editOne', editOne)
      .post('/tickOne', tickOne)
      .post('/delOne', delOne)
      .get('/getAllList', getAllList)

router.post('/graphql', async (ctx, next) => {
        await graphqlKoa({schema: schema})(ctx, next)
      })
      .get('/graphql', async (ctx, next) => {
        await graphqlKoa({schema: schema})(ctx, next)
      })
      .get('/graphiql', async (ctx, next) => {
        await graphiqlKoa({endpointURL: '/graphql'})(ctx, next)
      })

module.exports = router
