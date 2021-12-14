// 引入mockjs
const Mock = require('mockjs');

// 获取 mock.Random 对象

// const Random = Mock.Random;

// mock一组数据
const data = function () {
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
            "columns": [
                {
                    "_attr": "book_no",
                    "_col_type": "varchar(40)",
                    "_ent": "8.8106",
                    "_max_ent": "8.8106",
                    "_sv": "1.0000",
                    "_sv_level": -1,
                    "_is_sen": -2
                },
                {
                    "_attr": "book_name",
                    "_col_type": "varchar(255)",
                    "_ent": "8.7527",
                    "_max_ent": "8.7682",
                    "_sv": "0.9982",
                    "_sv_level": -1,
                    "_is_sen": -2
                },
                {
                    "_attr": "book_type",
                    "_col_type": "varchar(255)",
                    "_ent": "3.2716",
                    "_max_ent": "3.3219",
                    "_sv": "0.9849",
                    "_sv_level": -1,
                    "_is_sen": -2
                },
                {
                    "_attr": "recommend",
                    "_col_type": "double(50,2)",
                    "_ent": "8.8017",
                    "_max_ent": "8.8041",
                    "_sv": "0.9997",
                    "_sv_level": -1,
                    "_is_sen": -2
                },
                {
                    "_attr": "relative",
                    "_col_type": "varchar(1024)",
                    "_ent": "8.8106",
                    "_max_ent": "8.8106",
                    "_sv": "1.0000",
                    "_sv_level": -1,
                    "_is_sen": -2
                },
                {
                    "_attr": "relativenum",
                    "_col_type": "int(20)",
                    "_ent": 0,
                    "_max_ent": 0,
                    "_sv": 0,
                    "_sv_level": 2,
                    "_is_sen": 1
                },
                {
                    "_attr": "updatetime",
                    "_col_type": "timestamp",
                    "_ent": "1.5235",
                    "_max_ent": "2.3219",
                    "_sv": "0.6561",
                    "_sv_level": -1,
                    "_is_sen": -2
                }
            ],
            "chart_info": [
                { value: 100, name: 'High Sensitive Attr' },
                { value: 135, name: 'Middle Sensitive Attr' },
                { value: 180, name: 'Low Sensitive Attr' },
                { value: 144, name: 'Not Sensitive Attr' }
            ]
        },
    }
    return res
}



// Mock.mock( url, post/get , 返回的数据)；

Mock.mock('/mock/data', 'post', data);