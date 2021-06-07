import api from './../services/api';

import { toast } from 'react-toastify';

function setApiInterceptor() {
  api.interceptors.request.use(function(config) {
    return config;

  }, function (error) {

    return Promise.reject(error);
  });

  api.interceptors.response.use(function(config) {
    try {
      if(typeof config.data === 'string')
        toast.success(config.data);

    } catch(err) {}

    return config;

  }, function (error) {

    try {
      const { data } = error.response;

      if(typeof data === 'string')
        toast.error(data);

    } catch(err) {}

    return Promise.reject(error);
  });
}

export default setApiInterceptor;