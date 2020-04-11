// 废弃！！！！ 用java写支付好点！！！

// const Base = require('./base.js')
// const request = require('request')
// const getApi = think.promisify(request)
// const Alipay = require('alipay-mobile').default
// // 11
// module.exports = class extends Base {
//   async payAction() {
//     const options = {
//       gatewayUrl:'https://openapi.alipaydev.com/gateway.do',
//       app_id: '2016082600314760',
//       appPrivKeyFile: 'MIIEpQIBAAKCAQEA1MQMH5mHS1M6wq4o6006qGmIufFQbyZBW8ET+mggIbF0CsRtGpjH60G0bTWA2SL9p/aNa1uMyuieNqa176VU1d/6DhSoSCk8j2ZyuNLUPkP85rj1m6vltZd5PlpCzLAw5tSGmURZblWvAJY6vq8xJuiIiwKanMH9hRFhUZkkcvEz3kDI1Aqf/+sVu/Z5osiMEeIABFOGpX40SDtaWRTcZ1cMhR/4dgWCFaXW/dmpjw4qxkfVWsDeu+Up7zvwihuph4VOVg9wJO5jrw781BkSfoWN65zzxaHw++igDldX2Wx4WyDd8ZCr/mnQyxRst+LI0c8CWL88/ep7UrWEAlOE9QIDAQABAoIBAF0nsP8s4zWxrSqLwlKzr5kJC9oNs9/WagtYT/z1Fgxqe5ozQmnAttdkHzEpmc54KYMeyfBVVyGIE61t9H6GbsxtkjgUB1IA7AkFG/mcJV1VuybxmGeeLacCOQ15y4F/KwoFxyDX8igCz+p73CCc5/JXIWFrtHIp5WwbnfZyDKld8arE0ntS2xO3GSZpYdDiv97EEgAS7AgAT0B1+c9QyRiUWean8TW6t0q/e8XnxdqEVcpDjGu7mrPBUBPeu9UMVP9qJlvbM5mCRwl4WPA7HKsA7ZYuBZx4a+y9vHIgj+fT/XXdMx85Dr8sjg9WIfJZ3qr1NBSg35dFZ56BVH3JfwkCgYEA7JdHzFXzDgPLYKM79+FmXph3pgUO72jfKcYgxn6jNQ9tGRixcXxB2jkRLm0eNt4MdK/7FXqmX7xIEqPwY/fRS0wn1AM7ZapJcZscuJVKShkmUgQSA3z8N5dCsjEtEEdzWz+2npRj8jTgT56dJjWP01bzjq4RxmnzOIULyL8+O9cCgYEA5jhocXR/ilxQ+7mwh8Qpe3RZMnj82/GWJNIIEkxefHQTZZzXqXzg7X3Xx+dm49odxrrN8qV8z0OY2IKjZSOtbz0syPo4vIPDb2meRhiNChzFRoLtT7lYp6DolOpgzxHky9398mIv5vJsNmSL0dORIl3c3rqacKunMH8t1eRxDBMCgYEAnBgnh7pBVULNoSGxhBcTel/vuPpnYy925VHR+AQ/W9ekrEUtdWl87SRvoIjfwWV5JFejOgWk1U8c4ieFh/9N9/bz5B6Jxsa2FB05stLUo9S6Aqyq0eBZa7gBih2F1NK/WjnMHA5dbsTSJdXJaxc1oEMjCETyd00Z6nVlU/pRbhsCgYEAjTSJ8xS2aaHn1g311cAehWc+knOc/DZ4lgrxAnAu//yeLRP/PyimOWSXZjhrZlPRMaRAT5TrMaFPbXTrTUyNww3tmzPGevICfCJ2/p1uXIZ7BZ2meuC/HMnX/gan7DoYcGavrOxGX0vPzajsDX3Lph2WLFKeCX9vY5KOBYRBRlsCgYEAwpcxMbV0dVQOxiDTUCTK+4zbjbEQElSFsE82t8IziUFqJIACQYzhP7mNXqgX/XHNYganCHm7w7qE/aZwSlPtDNMhePK5zcAv/Muk1v0u+dBrVU35JNKAVPsX037gfjz1oSHNCz7gMZDbn0/iSQFNFAE9Y+Qn3gahzF1xPfO43kw=',
//       alipayPubKeyFile: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAucmNxpCZHYVepB9cDmjkaR8KpkGRAsArf3mwutIToRsJeuoFpITs09ooRpZz2hmehl09c163rIE5kWgZQpl6ksPDPUDuMpEZOxVCAEXcD9tdxV5lAp434oric0il2KjoNh2HDc169NmV6tKTmEtld4c9y9ZNimAO1/Kzqn6vLfV8RGsBFro1gQGVeI0zmlZ+m2M999qut5ESZcrJ0y9UN3d0lp4Oe77HARoelTZSHmk42HOhbYAqs3M/MbILmC/MuIl7Wz39rkvCy2syfJAzgqwETp+4D+m7M1pLnoRFE1yZB99nvEdZdMCwhOprVDlu68qMjXY16dRMl2XiJqPpawIDAQAB'
//     }
//     // console.log(Alipay.default,123)
//     const service = new Alipay(options)
//     const data = {
//       subject: '辣条',
//       out_trade_no: '1232423',
//       total_amount: '100'
//     }
//     const basicParams = {
//       return_url: 'http://localhost:8080'
//     }
//     const result = service.createWebOrderURL(data, basicParams)
//     console.log(result.code, result.message)
//     this.ctx.body = result
//   }
// }
