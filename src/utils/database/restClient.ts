/**********************************************************
 * Componente: restClient
 * Desarrolador: Carlos Morante
 * Descripción: Clase utilitaria para manejar las peticiones al backend usando rest
 * Feha: 20 Diciembre 2024
***********************************************************/
import axios from 'axios';

/**
 * Realiza una petición POST al backend
 * @param methodPath  ruta del método
 * @param data  datos a enviar
 * @param endpoint url del backend 
 * @param headers encabezados de la petición
 * @returns json de la respuesta
 */
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

/**
 * Realiza una petición GET al backend
 * @param methodPath  ruta del método
 * @param data  datos a enviar
 * @param endpoint url del backend 
 * @param headers encabezados de la petición
 * @returns json de la respuesta
 */
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