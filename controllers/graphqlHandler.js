import mongoose from 'mongoose'
const List = mongoose.model('List')
// 新增
export const addOne = async (obj) => {
  console.log(obj)
  // 获取请求的数据
  const opts = obj
  
  const list = new List(opts)
  const saveList = await list.save() // 保存数据
  // 简单判断一下 是否保存成功，然后返回给前端
  let result = {}
  if (saveList) {
    result = {
      success: true,
      id: saveList.id
    }
  } else {
    result = {
      success: false,
      id: '0000000'
    }
  }
  return result
}

export const editOne = async (obj) => {
  let hasError = false
  let error = null
  List.findOne({id: obj.id}, (err, doc) => {
  	if(err) {
  		hasError = true
  		error = err
  	} else {
  		doc.title = obj.title;
  		doc.desc = obj.desc;
  		doc.date = obj.date;
  		doc.save();
  	}
  })
  let result = {}
  if (hasError) {
  	result = {
      success: false,
      id: obj.id
    }
  } else {
  	result = {
  	  success: true,
  	  id: obj.id
  	}
  }
  return result
}

export const tickOne = async (obj) => {
  let hasError = false
  let error = null
  List.findOne({id: obj.id}, (err, doc) => {
  	if(err) {
  		hasError = true
  		error = err
  	} else {
  		doc.checked = obj.checked;
  		doc.save();
  	}
  })
  let result = {}
  if (hasError) {
    result = {
      success: false,
      id: obj.id
    }
  } else {
    result = {
      success: true,
      id: obj.id
    }
  }
  return result
}

export const delOne = async (obj) => {
  let hasError = false
  let msg = null
  List.remove({id: obj.id}, (err, doc) => {
  	if(err) {
  		hasError = true
  		msg = err
  	} else {
  		msg = doc
  	}
  })
  let result = {}
  if (hasError) {
    result = {
      success: false,
      id: obj.id
    }
  } else {
    result = {
      success: true,
      id: obj.id
    }
  }
  return result
}