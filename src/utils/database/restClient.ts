import axios from 'axios';

export const clientPOST = async (methodPath: string, data: any = {}, endpoint: string, headers: any = {}) => {
  return await axios({
    method: 'post',
    url: endpoint + methodPath,
    data: data,
    headers: headers
  }).
    then(res => {
      return new Promise((resolve, reject) => {
        resolve(res.data)
      });
    }).
    catch(error => {
      return new Promise((resolve, reject) => {
        reject(error)
      });
    })

};

export const clientGET = async (methodPath: string, data: any = {}, endpoint: string, headers: any = {}) => {
  return await
    axios({
      method: 'get',
      url: endpoint + methodPath,
      params: data,
      headers: headers
    }).
      then(res => {
        return new Promise((resolve, reject) => {
          resolve(res.data)
        });
      }).
      catch(error => {
        return new Promise((resolve, reject) => {
          reject(error)
        });
      })

};