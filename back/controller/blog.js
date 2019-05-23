const xss = require('xss')
const { exec } = require('../db/mysql')

// xxx.html?a=1&k1=v1&k2=v2 类似where 和and

const getList = async (author, keyword) => {
    let sql = `select * from blogs where 1=1 ` // 注意标点符号是 ` 但是1 = 1所以下面两个值都错误那么语法也不会错误
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    return await exec(sql)

}

const getDetail =  async (id) => {
    const sql = `select * from blogs where id='${id}'`
    const rows = await exec(sql)
    return rows[0]
    // return exec(sql).then(rows => {
    //     return rows[0]   // 查询出来的只有一个元素的数组
    // })
}

const newBlog = async (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content author属性
    const title = xss(blogData.title) // 防止xss攻击 转义特殊字符，尤其是< > 防止<script>
    const content = blogData.content
    const author = blogData.author
    const createtime = Date.now()
    // 这里引入 escape 然后将values 里面的'${title}', '${content}', ${createtime} , '${author}' 引号去掉！！！


    const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', ${createtime} , '${author}'); 
    ` // createtime 是数字格式可以不加''
    
    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }

    // return exec(sql).then(insertData => {
    //     // console.log('insertData is', insertData)/'
    //     return {
    //         id: insertData.insertId
    //     }
    // })
    // return {
    //     id: 8 //表示新建博客插入到数据表里面的id
    // }
}

const updateBlog = async (id, blogData = {}) => {
    // id 是更新博客的 id 
    // blogData更新一个博客对象,包含 title content属性 作者不用更新

    const title = blogData.title
    const content = blogData.content

    const sql = `
        update blogs set title='${title}',content='${content}' where id=${id}
    `


    const updateData = await exec(sql)
    if (updateData.affectedRows > 0) {
        // 影响函数条数大于1
        return true
    }
    return false

    // return exec(sql).then(updateData => {
    //     // console.log('updateData is ', updateData)
    //     if (updateData.affectedRows > 0) {
    //         // 影响函数条数大于1
    //         return true
    //     }
    //     return false
    // })
}

const delBlog = async (id, author) => {
    // id 是删除博客的id
    const sql =  `delete from blogs where id='${id}' and author='${author}'`

    const delData = await exec(sql)
    if (delData.affectedRows > 0) {
        // 影响函数条数大于1
        return true
    }
    return false
    // return exec(sql).then(delData => {
    //     // console.log('delData is ', delData)
    //     if (delData.affectedRows > 0) {
    //         // 影响函数条数大于1
    //         return true
    //     }
    //     return false
    // })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}