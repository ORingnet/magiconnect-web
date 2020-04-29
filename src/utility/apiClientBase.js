// return Code
// 00 通過
// 99 其他異常
// 98 有錯誤訊息
export const fetchGet = url => {
  return fetch(url, {
    method: 'get',
    mode: 'cors',
    credentials: 'include'
  })
    .then(async res => {
      // console.log('response status', res.status);
      const response = await res.json();
      if (res.ok) {
        return {
          data: response,
          message: 'ok',
          returnCode: '00'
        };
      }
      return {
        message: response.message,
        status: res.status,
        returnCode: '98'
      };
    })
    .catch(err => {
      console.log(err);
      return {
        returnCode: '99'
      };
    });
};

export const fetchPost = (url, request) => {
  return fetch(url, {
    method: 'post',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })
    .then(async res => {
      // console.log('response status', res.status);
      const response = await res.json();
      if (res.ok) {
        return {
          data: response,
          message: 'ok',
          returnCode: '00'
        };
      }
      return {
        message: response.message,
        returnCode: '98'
      };
    })
    .catch(err => {
      console.log(err);
      return {
        returnCode: '99'
      };
    });
};
export const fetchDelete = url => {
  return fetch(url, {
    method: 'delete',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async res => {
      // console.log('response status', res.status);
      const response = await res.json();
      if (res.ok) {
        return {
          data: response,
          message: 'ok',
          returnCode: '00'
        };
      }
      return {
        message: response.message,
        returnCode: '98'
      };
    })
    .catch(err => {
      console.log(err);
      return {
        returnCode: '99'
      };
    });
};
