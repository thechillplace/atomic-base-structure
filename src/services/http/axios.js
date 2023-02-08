import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://API.com/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

const logRequest = request => {
  if (console.group) {
    console.group(
      '%cAPI Request',
      'color:white;font-weight:bold;background:#0194ff;padding:2px 6px',
      request.url,
    );
  }
  console.log('HTTP Method\t\t', request.method);
  console.log('Endpoint\t\t', request.url);
  if (request.data) {
    console.log('Request Body\t', request.data);
  }
  console.log('AXIOS Request\t', request);
  // @ts-ignore
  if (console.groupEnd) {
    // @ts-ignore
    console.groupEnd();
  }
};

const logResponse = response => {
  if (console.group) {
    console.group(
      '%cAPI Response',
      'color:white;font-weight:bold;background:green;padding:2px 6px',
      response.config.url,
    );
  }
  console.log('HTTP Method\t\t', response.config.method);
  console.log('Endpoint\t\t', response.config.url);
  if (response.config.data) {
    console.log('Request Body\t', response.config.data);
  }
  if (response.data) {
    console.log('Response Body\t', response.data);
  }
  console.log('AXIOS Response\t', response);
  if (console.groupEnd) {
    console.groupEnd();
  }
};

const logError = (apiName, error) => {
  if (console.group) {
    console.group(
      '%cAPI Response',
      'color:white;font-weight:bold;background:red;padding:2px 6px',
      apiName,
    );
  }
  console.log('HTTP Method\t\t', error.config.method.toUpperCase());
  console.log('Endpoint\t\t', error.config.url);
  error &&
    error.config.data &&
    console.log('Request Body\t', error.config.data);
  error && error.data && console.log('Response Body\t', error.data);
  console.log('AXIOS Error\t', error);
  if (console.groupEnd) {
    console.groupEnd();
  }
};

export const handleError = async ({message, data, status}) => {
  if (
    status === 403 ||
    status === 401 ||
    data?.message?.includes('token is expired')
  ) {
    alert('Token hết hạn');
  }
  return Promise.reject({message, data, status});
};

instance.interceptors.request.use(request => {
  logRequest(request);
  /*const user = getRecoil(userState);
  if (user && !request.headers.Authorization) {
    request.headers.Authorization = `Token ${user?.token}`;
    request.headers.Token = `Token ${user?.token}`;
  }*/
  return request;
});

instance.interceptors.response.use(
  response => {
    logResponse(response);
    return response;
  },
  error => {
    if (error.response) {
      const apiName = error.config.url || 'UNKNOWN';
      logError(apiName, error.response);
    } else {
      /*Toast.show({
        type: 'normal',
        text1: error.message,
        position: 'bottom',
      });*/
      console.log('API Error', error.message);
    }
    return handleError({
      message: error?.message,
      data: error?.response?.data,
      status: error?.response?.status,
    });
  },
);

export default instance;
