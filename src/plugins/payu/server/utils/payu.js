'use strict';
const axios = require("axios")
module.exports = {
  getToken: async function(settings) {
    const { payuAuthorizeUrl, clientId, clientSecret } = settings
    const params = new URLSearchParams()
    params.append("grant_type", "client_credentials")
    params.append("client_id", clientId)
    params.append("client_secret", clientSecret)
    
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const req = await axios.post(
      payuAuthorizeUrl, 
      params,
      { headers }
    )
    return req.data.access_token
  },
}