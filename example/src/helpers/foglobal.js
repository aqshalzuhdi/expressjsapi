const {DateTime} = require("luxon")

const createResponse = ({ status, httpCode, msg }) => {
    let returnData;
    if (status) {
        if (msg !== null && (typeof msg === 'object' || Array.isArray(msg))) {
            returnData = { 'status': status, 'httpCode': httpCode, 'Data': msg }
        } else {
            returnData = { 'status': status, 'httpCode': httpCode, 'Output': msg }
        }
    } else {
        returnData = { 'status': status, 'httpCode': httpCode, 'message': msg }
    }

    return returnData
}

const httpStatusCode = (type) => {
    let httpCode = [
        200,
        201,
        400,
        401,
        403,
        404,
        405,
        500
    ]

    let typeCode = Number(type)
    typeCode = typeCode - 1
    typeCode = (typeCode < 0) ? 0 : ((typeCode > 7) ? 7 : typeCode)

    return httpCode[typeCode]
}

const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

const dateTimeFormat = (dateTime) => {
  const dt = DateTime.fromJSDate(dateTime);
  const date = dt.setLocale('id').toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
  const time = dt.setLocale('us').toLocaleString(DateTime.TIME_SIMPLE)

  return date + " " + time
}

module.exports = {
    createResponse,
    httpStatusCode,
    isNumeric,
    dateTimeFormat,
}