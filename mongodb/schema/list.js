import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

// title: 'homework',
// desc: 'do homework',
// date: '2018-09-07 09:34:02',
// id: '123132',
// checked: false

const ListSchema = new Schema({
  title: String,
  desc: String,
  date: String,
  id: String,
  checked: Boolean,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

ListSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

mongoose.model('List', ListSchema)