import { HTTP } from './http'

const XMLService = {
  loadFile (data) {
    return HTTP.post(`/xml-parser/load-file`, data)
  }
}

export default XMLService