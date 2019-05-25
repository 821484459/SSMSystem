const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { 
  newStudent,
  getStudent,
  delStudent,
  changeStudent
 } = require('../controller/xueji')

router.prefix('/api/xueji')

// 创建账号
router.post('/new', async (ctx, next) => {
  const { userId } = ctx.request.body
  let data = false
  try {
    data = await newStudent(userId)
  } catch (err) {
      data = false
  }
  if (data) {
     ctx.body = new SuccessModel(data)
     return 
  }
   ctx.body = new ErrorModel("创建账号重复")
})

// 获取学生学籍信息
router.post('/get', async (ctx, next) => {
  const { userId } = ctx.request.body
  let data = await getStudent(userId)
  console.log(data)
  if (data) {
    ctx.body = new SuccessModel(data)
    return
  }
  ctx.body = new ErrorModel("查无此人")
})

// 删除学生信息
router.post('/del', async (ctx, next) => {
  const { userId } = ctx.request.body
  let data = await delStudent(userId)
  if (data) {
    ctx.body = new SuccessModel(data)
    return
  }
  ctx.body = new ErrorModel("删除失败")
})

// 修改学生信息
router.post('/change', async(ctx, next) => {
  const { userId,message } = ctx.request.body
  let data = false
  try {
     data = await changeStudent(userId,message)
  } catch (error) {
      data = false
  }
  if (data) {
    ctx.body = new SuccessModel(data)
    return
  }
  ctx.body = new ErrorModel("修改失败")
})


module.exports = router
