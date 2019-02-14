'use strict';

const request = require('superagent');
const uuid = require('uuid');

function launch(opts, host) {
  const uid = uuid();
  return request
    .post(`http://${host}:${opts.port}/api/launch/${uid}`)
    .timeout(opts.launchTimeout || 10 * 60 * 1000)
    .send(opts).then(rsp => {
      const data = rsp.body.data || {};
      return Object.assign({ pid: uid }, data, {
        kill() {
          return request.post(`http://${host}:${opts.port}/api/kill/${uid}`)
            .send(data)
            .then(rsp => {
              return rsp.body.success
            });
        }
      })
    });
}

module.exports.launch = launch;
