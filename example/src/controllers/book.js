const { Book } = require('../models');
const { Op } = require('sequelize');

const { GetData, InsertData, UpdateData, DeleteData } = require('../helpers/database_api');
const Foglobal = require('../helpers/foglobal')

const List = async (req, res) => {
    let result, httpCode
    try{
        const {query} = req
        result = await GetData(Book, query)

        // result = await GetData(User, {
        //     // filter: {id: 2},
        //     // field: ['firstName', 'lastName'],
        //     sort:  ['id', 'ASC'],
        //     page: 1,
        //     limit: 5
        // })
    }catch(error) {
        result = Foglobal.createResponse({status: false, httpCode: Foglobal.httpStatusCode(8), msg: error.message})
    }

    if(typeof result.httpCode === 'undefined') {
        httpCode = 500
        console.log(typeof result.httpCode)
    }else{
        httpCode = result.httpCode
    }

    // Foglobal.ResponseToJSON({res: res, httpCode: result.httpCode, result: result})
    res.status(httpCode).json(result)
}

const Create = async (req, res) => {
    let result, httpCode;
    const {body} = req
    try {
        httpType = 1
        result = await InsertData(Book, body)
    } catch (error) {
        httpType = 7
        result = Foglobal.createResponse({status: false, msg: error.message})
    }

    if(typeof result.httpCode === 'undefined') {
        httpCode = 500
    }else{
        httpCode = result.httpCode
    }

    // Foglobal.ResponseToJSON({res: res, httpType: httpType, result: result})
    res.status(httpCode).json(result)
}

const Update = async (req, res) => {
    let result, httpCode;
    const {id} = req.params;
    const {body} = req

    try {
        httpType = 1
        result = await UpdateData(Book, {
            data: body,
            filter: {id: id}
        })
    } catch (error) {
        httpType = 7
        result = Foglobal.createResponse({status: false, msg: error.message})
    }

    if(typeof result.httpCode === 'undefined') {
        httpCode = 500
    }else{
        httpCode = result.httpCode
    }

    res.status(httpCode).json(result)
    // Foglobal.ResponseToJSON({res: res, httpType: httpType, result: result})
}

const Delete = async (req, res) => {
    let result, httpCode;
    const {id} = req.params;
    try {
        httpType = 1
        result = await DeleteData(Book, {filter: {id: id}})
    } catch (error) {
        httpType = 7
        result = Foglobal.createResponse({status: false, msg: error.message})
    }
    
    if(typeof result.httpCode === 'undefined') {
        httpCode = 500
    }else{
        httpCode = result.httpCode
    }

    res.status(httpCode).json(result)
    // Foglobal.ResponseToJSON({res: res, httpType: httpType, result: result})
}

module.exports = {
    List,
    Create,
    Update,
    Delete,
}

// (async () => {
//     try{
//         // const insert = await InsertData(User, {'firstName': 'Jane', 'lastName': 'Doe', 'Address': 'Jl. Apel'})
//         // console.log(insert)

//         // const update = await UpdateData(User, {data: {'firstName': 'Jode', 'lastName': 'ASD', 'email': 'asd@gmail.com'}, filter: {'id': 2}})
//         // console.log(update)

//         // const data = await GetData(User, {
//         //     // filter: {id: 2},
//         //     // field: ['firstName', 'lastName'],
//         //     sort:  ['id', 'ASC'],
//         //     page: 2,
//         //     limit: 5
//         // })
//         // console.log(data)

//         const deleteData = await DeleteData(User, {filter: {id: 2}});
//         console.log(deleteData)

//         // { where: { id: 1 } }
//         // Executing (default): SELECT `id`, `firstName`, `lastName`, `email`, `address`, `createdAt`, `updatedAt` FROM `Users` AS `User` WHERE `User`.`id` = 1;
//         // { status: true, Data: [] }

//         // const user = await User.create({'firstName': 'Aqshal', 'address': 'testing', 'age': 20})
//         // console.log('Success')

//         // let user = await User.findAll()
//         // user = user.map(user => user.toJSON());
//         // console.log(user[0])

//         // let user = await User.findAll({attributes: ['firstName', 'lastName']})
//         // user = user.map(user => user.toJSON())
//         // console.log(user)

//         // let user = await User.findAll({where: {id: 20}})
//         // user = user.map(user => user.toJSON())
//         // console.log(user)

//         // `to get operator in Op, find it at https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators`
//         // let user = await User.findAll({
//         //     where: {
//         //         [Op.or]: [{id: 20}, {firstName: 'Aqshal'}]
//         //     }
//         // })
//         // user = user.map(user => user.toJSON())
//         // console.log(user)

//         // const user = await User.update(
//         //     {lastName: 'Does'},
//         //     {
//         //         where: {
//         //             'id': 123
//         //         }
//         //     }
//         // );
//         // console.log(user)

//         // const user = await User.destroy({
//         //     where: {
//         //         id: 100
//         //     }
//         // })
//         // console.log(user)
//     }catch(err) {
//         console.error('error:', err.message);
//     }
// })()