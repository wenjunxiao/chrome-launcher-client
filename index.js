'use strict';

const request = require('superagent');
const uuid = require('uuid');

function launch(opts, host) {
  const uid = uuid();
  return request
    .post(`http://${host}:${opts.port}/api/launch/${uid}`)
    .send(opts).then(rsp => {
      return Object.assign(rsp.body.data || {}, {
        kill() {
          return request.post(`http://${host}:${opts.port}/api/kill/${uid}`)
            .send(rsp.body.data || {})
            .then(rsp => {
              return rsp.body.success
            });
        }
      })
    });
}

module.exports.launch = launch;
