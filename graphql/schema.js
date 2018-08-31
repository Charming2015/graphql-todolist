import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  isOutputType,
  isInputType,
  GraphQLInputObjectType,
  GraphQLInputType
} from 'graphql';
import {addOne, editOne, delOne, tickOne} from '../controllers/graphqlHandler.js' 
import mongoose from 'mongoose'

const List = mongoose.model('List') // 引入Info模块

const objType = new GraphQLObjectType({
  name: 'meta',
  fields: {
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    }
  }
})
let ListType = new GraphQLObjectType({
  name: 'List',
  fields: {
    _id: {
      type: GraphQLID
    },
    id: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    desc: {
      type: GraphQLString
    },
    date: {
      type: GraphQLString
    },
    checked: {
      type: GraphQLBoolean
    },
    meta: {
      type: objType
    }
  }
})
const listFields = {
  type: new GraphQLList(ListType),
  args: {},
  resolve (root, params, options) {
    return List.find({}).exec() // 数据库查询
  }
}
let queryType = new GraphQLObjectType({
    name: 'getAllList',
    fields: {
      lists: listFields,
    }
})

const outputType = new GraphQLObjectType({
  name: 'output',
  fields: () => ({
    id:     { type: GraphQLString},
    success:   { type: GraphQLBoolean },
  })
});

const inputType = new GraphQLInputObjectType({
  name: 'input',
  fields: () => ({
    id:          { type: GraphQLString },
    desc:        { type: GraphQLString },
    title:       { type: GraphQLString },
    date:        { type: GraphQLString },
    checked:        { type: GraphQLBoolean }
  })
});
let MutationType = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    delOne: {
      type: outputType,
      description: 'del',
      args: {
        id: { type: GraphQLString }
      },
      resolve: (value, args) => {
      	console.log(args)
      	let result = delOne(args)
        return result
      }
    },
    editOne: {
      type: outputType,
      description: 'edit',
      args: {
        listObj: { type: inputType }
      },
      resolve: (value, args) => {
      	console.log(args)
      	let result = editOne(args.listObj)
        return result
      }
    },
    addOne: {
      type: outputType,
      description: 'add',
      args: {
        listObj: { type: inputType }
      },
      resolve: (value, args) => {
      	console.log(args.listObj)
      	let result = addOne(args.listObj)
        return result
      }
    },
    tickOne: {
      type: outputType,
      description: 'tick',
      args: {
        id: { type: GraphQLString },
        checked: { type: GraphQLBoolean },
      },
      resolve: (value, args) => {
      	console.log(args)
      	let result = tickOne(args)
        return result
      }
    },

  }),
});






// 导出GraphQLSchema模块
export default new GraphQLSchema({
    query: queryType,
	mutation: MutationType
})
