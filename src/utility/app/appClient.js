import { fetchGet, fetchPost, fetchDelete } from '../apiClientBase';
// 01-1 Get account
export const fetchGetAccountInfoService = () => {
  const url = `${process.env.REACT_APP_API_URL}/account_info/`;
  return fetchGet(url);
};
// 02-1 Get all of machines
export const fetchGetAllMachineService = () => {
  const url = `${process.env.REACT_APP_API_URL}/machines`;
  return fetchGet(url);
};
// 02-2 Add machine
export const fetchPostMachineService = request => {
  const url = `${process.env.REACT_APP_API_URL}/machines/`;
  return fetchPost(url, request);
};
// 02-03 filter machines
// export const fetchFilterMachineService = request => {
//   const url = `${process.env.REACT_APP_API_URL}/machines?${request}`;
//   console.log(url);
//   return fetchGet(url);
// };
// 03-01 Get information about machine mach_id
export const fetchGetMachineInfoByMachIdService = machId => {
  const url = `${process.env.REACT_APP_API_URL}/machines/${machId}`;
  return fetchGet(url);
};
// 03-02 modify information about machine mach_id
export const fetchPostMachineInfoByMachIdService = (machId, request) => {
  const url = `${process.env.REACT_APP_API_URL}/machines/${machId}/`;
  return fetchPost(url, request);
};
// 03-03 delete machine about mach_id
export const fetchDeleteMachineInfoByMachIdService = machId => {
  const url = `${process.env.REACT_APP_API_URL}/machines/${machId}`;
  return fetchDelete(url);
};

// 04-1 connect machines of mach_id
export const fetchGetMachineConnect = machId => {
  const url = `${process.env.REACT_APP_API_URL}/machines/${machId}/connect`;
  return fetchGet(url);
};
// 04-2 disconnect machines of mach_id
export const fetchGetMachineDisConnect = machId => {
  const url = `${process.env.REACT_APP_API_URL}/machines/${machId}/disconnect`;
  return fetchGet(url);
};
// 05-1 Get all of devices from machines of mach_id
export const fetchGetMachineDevices = machId => {
  const url = `${process.env.REACT_APP_API_URL}/machines/${machId}/devices`;
  return fetchGet(url);
};
// 05-2 Add a devices from machines of mach_id
export const fetchAddMachineDevices = (machId, request) => {
  const url = `${process.env.REACT_APP_API_URL}/machines/${machId}/devices/`;
  return fetchPost(url, request);
};
// 06-01 Get devices_id of devices from machines of mach_id
export const fetchGetMachineDeviceInfo = (machId, deviceId) => {
  const url = `${process.env.REACT_APP_API_URL}/machines/${machId}/devices/${deviceId}/`;
  return fetchGet(url);
};
// 06-2 modify devices_id of devices from machines of mach_id
export const fetchModifyMachineDeviceInfo = (machId, deviceId, request) => {
  const url = `${process.env.REACT_APP_API_URL}/machines/${machId}/devices/${deviceId}/`;
  return fetchPost(url, request);
};
// 06-3 delete devices_id of devices from machines of mach_id
export const fetchDeleteMachineDeviceInfo = (machId, deviceId) => {
  const url = `${process.env.REACT_APP_API_URL}/machines/${machId}/devices/${deviceId}/`;
  return fetchDelete(url);
};
// 08-1 Get Logs
export const fetchGetMachineLogs = machId => {
  const url = `${process.env.REACT_APP_API_URL}/machines/${machId}/logs/`;
  return fetchGet(url);
};

// 09-1 Get News
export const fetchGetNewsService = () => {
  const url = `${process.env.REACT_APP_API_URL}/news/`;
  return fetchGet(url);
};

// 10-1 egister PC utility tool for connection use.
export const fetchGetRegisterIdService = () => {
  const url = `${process.env.REACT_APP_API_URL}/utility/register/`;
  return fetchGet(url);
};

// 10-2 Check PC utility tool connection status.
export const fetchGetCheckUserStatusService = () => {
  const url = `${process.env.REACT_APP_API_URL}/utility`;
  return fetchGet(url);
};
