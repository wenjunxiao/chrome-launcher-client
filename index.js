'use strict';

const request = require('superagent');
const uuid = require('uuid');

function launch(opts, host, query) {
  const uid = uuid();
  return request
    .post(`http://${host}:${opts.port}/api/launch/${uid}`)
    .timeout(opts.launchTimeout || 10 * 60 * 1000)
    .query(Object.assign({_: Date.now()}, query))
    .send(opts).then(rsp => {
      const data = rsp.body && rsp.body.data;
      if (!data) {
        const error = Object.assign(new Error(''), rsp.body && rsp.body.error || {
          message: rsp.text
        })
        error.message = 'Remote chrome launch failed:' + error.message;
        return Promise.reject(error);
      }
      return Object.assign({ pid: uid }, data, {
        kill() {
          return request.post(`http://${host}:${opts.port}/api/kill/${uid}`)
            .query(Object.assign({_: Date.now()}, query))
            .send(data)
            .then(rsp => {
              return rsp.body.success
            });
        }
      })
    });
}

module.exports.launch = launch;
