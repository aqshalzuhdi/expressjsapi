const Foglobal = require('./foglobal')

const InsertData = async (table, params) => {
    let result;
    try {
        const query = await table.create(params)
        if(query) {
            let data = query.toJSON()
            result = Foglobal.createResponse({status: true, httpCode: Foglobal.httpStatusCode(2), msg: data.id});
        }else{
            result = Foglobal.createResponse({status: false, httpCode: Foglobal.httpStatusCode(3), msg: "Failed to create resource"});
        }
    }catch(error) {
        result = Foglobal.createResponse({status: false, httpCode: Foglobal.httpStatusCode(8), msg: error.message})
    }

    return result;
}

const UpdateData = async (table, params) => {
    let result;
    try {
        const query = await table.update(
            params.data,
            {
                where: params.filter
            }
        );

        if(query[0]) {
            result = Foglobal.createResponse({status: true, httpCode: Foglobal.httpStatusCode(1), msg: "Success update the resource"})
        }else{
            result = Foglobal.createResponse({status: false, httpCode: Foglobal.httpStatusCode(3), msg: 'Failed to update the resource'})
        }

    } catch(error) {
        result = Foglobal.createResponse({status: false, httpCode: Foglobal.httpStatusCode(8), msg: error.message})
    }
    
    return result;
}

const DeleteData = async (table, params) => {
    let result;
    try {
        const query = await table.destroy(
            {
                where: params.filter
            }
        );

        // const query = await table.restore(
        //     {
        //         where: params.filter
        //     }
        // );

        if(query) {
            result = Foglobal.createResponse({status: true, httpCode: Foglobal.httpStatusCode(1), msg: "Success delete the resource"})
        }else{
            result = Foglobal.createResponse({status: false, httpCode: Foglobal.httpStatusCode(3), msg: 'Failed to delete the resource'})
        }

    } catch(error) {
        result = Foglobal.createResponse({status: false, httpCode: Foglobal.httpStatusCode(8), msg: error.message})
    }
    
    return result;
}

const GetData = async (table, params) => {
    let result;
    try {
        let param;
        let IsPaging = false;
        // let scopes = 'excludeScope'
        // param = Object.assign({}, param, {attributes: {}});

        if(params.field) {
            const field = params.field.toString().split(',')
            param = Object.assign({}, param, {attributes: field});
            // scopes = 'defaultScope'
        }
        if(params.filter) {
            const filter = params.filter.toString().split(',')
            if(filter.length >= 2) {
                const filterField = filter[0]
                const filterValue = filter[1]

                const where = `{"${filterField}":${filterValue}}`
                param = Object.assign({}, param, {where: JSON.parse(where)});
            }
        }
        if(params.sort) {
            const sort = params.sort.toString(',').split(',')
            if(sort.length >= 2) {
                param = Object.assign({}, param, {order: [sort]})
            }
        }

        let DataPerPage = (params.limit && Foglobal.isNumeric(params.limit)) ? Number(params.limit) : 10
        let Page = (params.page && Foglobal.isNumeric(params.page)) ? params.page : 1

        let TotalData = 0;
        let TotalPage = 0;

        if(params.page) {
            let CountData = await table.count(param)

            if(!CountData) {
                return Foglobal.createResponse({status: false, httpCode: Foglobal.httpStatusCode(3), msg: "Data not available"})
            }

            TotalData = CountData;
            TotalPage = Math.ceil(TotalData/DataPerPage)

            if(Page == -1) {
                Page = TotalPage;
            }

            let Offset = (Page-1) * DataPerPage
            let Limit = DataPerPage

            param = Object.assign({}, param, {offset: Offset, limit: Limit});
            IsPaging = true;
        }

        // param = Object.assign({}, param, {attributes: {include: ['firstName'], exclude: ['createdAt', 'updatedAt', 'book_id']}});
        // param = Object.assign({}, param, {include: ['book']});
        // param = Object.assign({}, param, {paranoid: false});
        // console.log(param)

        let query = await table.findAll(param)
        query = query.map(data => data.toJSON());

        if(query == null || query.length == 0) {
            result = Foglobal.createResponse({status: false, httpCode: Foglobal.httpStatusCode(3), msg: "Data not available"})
        }else{
            let Pagination = {IsPaging: IsPaging};
            if(TotalData > 0) {
                let DataFrom = ((Page * DataPerPage) - DataPerPage) + (query.length > 0 ? 1 : 0)
                let DataTo = (query.length >= DataPerPage ? DataFrom + DataPerPage - 1 : DataFrom + query.length - 1)

                Pagination = Object.assign({}, Pagination, {
                    Paging: {
                        Total: TotalData,
                        Page: Page,
                        PageTotal: TotalPage,
                        IsNext: (TotalData > (DataPerPage*Page) ? true : false),
                        IsPrev: (Page > 1 ? true : false),
                        From: DataFrom,
                        To: DataTo,
                        InfoPage: DataFrom + " - " + DataTo + " from " + TotalData + " Data | Page " + Page
                    }
                });
            }

            result = Foglobal.createResponse({status: true, httpCode: Foglobal.httpStatusCode(1), msg: query})
            result = Object.assign({}, result, Pagination)
        }

    } catch(error) {
        result = Foglobal.createResponse({status: false, httpCode: Foglobal.httpStatusCode(8), msg: error.message})
    }

    return result;
}

module.exports = {
    GetData,
    InsertData,
    UpdateData,
    DeleteData
}