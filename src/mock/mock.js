// 引入mockjs
const Mock = require('mockjs');

// 获取 mock.Random 对象
const Random = Mock.Random;

// mock一组数据
const data = function (request) {
    let body = JSON.parse(request.body)
    let columns = columns_mock(body.page_info.pagesize)
    let res = {
        "code": 200,
        "msg": "请求成功",
        "data": {
            "table_list": [
                "book_info",
                "stu_info",
                "stu_score"
            ],

            "db_info": [{
                "db": "demo",
                "tables": 3,
                "columns": 33,
                "rows": 7533
            }],
            "columns": columns,
            "chart_info": [
                { value: Random.natural(50, 3000), name: 'High Sensitive Attr' },
                { value: Random.natural(50, 3000), name: 'Middle Sensitive Attr' },
                { value: Random.natural(50, 3000), name: 'Low Sensitive Attr' },
                { value: Random.natural(50, 3000), name: 'Not Sensitive Attr' }
            ]
        },
    }
    return res
}

function columns_mock(size) {
    let data = []
    for (let i = 0; i < size; i++) {
        data.push({
            "_attr": Random.string('lower', 5),
            "_col_type": "varchar(40)",
            "_ent": "8.8106",
            "_max_ent": "8.8106",
            "_sv": "1.0000",
            "_sv_level": Random.natural(0, 3),
            "_is_sen": -2
        })
    }
    return data
}

// Mock.mock( url, post/get , 返回的数据)；

Mock.mock('/mock/data', 'post', data);