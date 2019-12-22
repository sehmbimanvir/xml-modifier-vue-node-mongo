import request from 'request'
import fs from 'fs'
import { generateRandomString } from '../utils'
import { parseString } from 'xml2js'

export const loadDataFromUrl = (req, res) => {
  const response = {}
  const fileName = `xml-files/${generateRandomString(10)}.xml`
  request(req.body.link).pipe(fs.createWriteStream(fileName)).on('close', () => {
    fs.readFile(fileName, (err, data) => {
      if (err)
        return res.jsonError(err)

      try {
        parseString(data, { trim: true }, (err, result) => {
          if (err)
            throw 'Something Went Wrong'

          const properties = result.root.property[0]
          response.properties = Object.keys(properties)
          response.filename = fileName
          return res.jsonResponse('Data', response)
        })
      } catch (err) {
        fs.unlink(fileName, (err, response) => {
          if (err)
            return res.jsonError(err)

          return res.jsonResponse('Error While Parsing File', {}, 400)
        })
      }
    })
  })
}