import React, { Fragment } from 'react';
import * as actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import * as ROUTERS from '../../router';
import {
  fetchGetAccountInfoService,
  fetchGetAllMachineService,
  fetchGetMachineInfoByMachIdService,
  fetchGetMachineConnect,
  fetchPostMachineService,
  fetchGetMachineDevices,
  fetchPostMachineInfoByMachIdService,
  fetchDeleteMachineInfoByMachIdService,
  fetchGetMachineDisConnect,
  fetchAddMachineDevices,
  fetchModifyMachineDeviceInfo,
  fetchDeleteMachineDeviceInfo,
  fetchGetMachineLogs,
  fetchGetNewsService,
  fetchGetCheckUserStatusService,
  fetchGetRegisterIdService
} from '../../utility/app/appClient';
export const actionCreators = {
  toggleSiderbar: () => dispatch => {
    dispatch({ type: actionTypes.TOGGLE_SIDERBAR });
  },
  toggleAddConnect: () => dispatch => {
    dispatch({ type: actionTypes.TOGGLE_ADD_CONNECT });
  },
  toggleNews: () => dispatch => {
    dispatch({ type: actionTypes.TOGGLE_NEWS });
  },
  toggleMap: () => dispatch => {
    dispatch({ type: actionTypes.TOGGLE_MAP });
  },
  toggleMachineChecked: machineId => dispatch => {
    dispatch({ type: actionTypes.TOGGLE_MACHINE_CHECKED, machineId: machineId });
  },
  toggleCopyMachineIdModal: () => dispatch => {
    dispatch({ type: actionTypes.TOGGLE_COPY_MACHINE_ID_MODAL });
  },
  searchMachineAction: searchValue => dispatch => {
    dispatch({ type: actionTypes.SEARCH_MACHINE, searchValue: searchValue });
  },
  refreshMachine: () => dispatch => {
    dispatch({ type: actionTypes.REFRESH_MACHINE });
  },
  // 01-1 Get account
  getAccountInfoAction: history => dispatch => {
    // dispatch({ type: actionTypes.REQEST_GET_ACCOUNT_INFO });
    fetchGetAccountInfoService().then(responseData => {
      if (responseData.returnCode !== '00') {
        //在這裡踢出去
        history.push(ROUTERS.HOME);
      } else {
        dispatch({ type: actionTypes.RECEIVE_GET_ACCOUNT_INFO, accountInfo: responseData.data });
      }
    });
  },
  // 02-1 Get all of machines
  getAllMachine: (connectMachine, getDevice) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.REQEST_GET_ALL_MACHINE });
    const responseData = await fetchGetAllMachineService();
    if (responseData.returnCode !== '00') {
      dispatch({
        type: actionTypes.RECEIVE_GET_ALL_MACHINE_FAIL
      });
    } else {
      const userEmail = getState().app.accountMsg.acc_mail;
      const machines = Object.values(responseData.data).map(machine => ({
        ...machine,
        ischecked: machine.mach_connBy === userEmail
      }));
      const findHaveConnceted = machines.find(
        machine => machine.mach_connBy === userEmail && machine.mach_status === 'Connected'
      );

      dispatch({ type: actionTypes.RECEIVE_GET_ALL_MACHINE, machines });
      if (findHaveConnceted && connectMachine) {
        getDevice(findHaveConnceted);
      }
    }
  },
  // 持續取得 machine
  continuousGetMachine: (requestArr, history, getDevice) => async (dispatch, getState) => {
    const connectMachId = getState().app.connectMachId;
    const originalMachines = getState().app.machines;
    // 取得最新的機台陣列
    const getMachineArr = await Promise.all(requestArr.map(request => fetchGetMachineInfoByMachIdService(request)));
    const machines = {};
    getMachineArr.forEach((result, i) => {
      if (result.returnCode !== '00') {
        if (result.status === 401) {
          // 如果 token 過期踢出去
          history.push(ROUTERS.HOME);
        } else {
          const deleteMachine = originalMachines.find(machine => machine.mach_id === requestArr[i]);
          toast.error(
            <Fragment>
              <span className='mr-2'>{deleteMachine.mach_name}</span>
              <FormattedMessage id='connectMachine.delete' />
            </Fragment>,
            {
              position: toast.POSITION.TOP_RIGHT
            }
          );
          dispatch({ type: actionTypes.RECEIVE_MACHINE_HAS_DELETE, machineId: deleteMachine.mach_id });
        }
      } else {
        const userEmail = getState().app.accountMsg.acc_mail;
        let connectedData = {};
        for (let machId in result.data) {
          machines[machId] = result.data[machId];
          // 被斷線處理
          if (connectMachId === machId && result.data[machId].mach_status !== 'Connected') {
            toast.warn(
              <Fragment>
                <span className='mr-2'>{result.data[machId].mach_name}</span>
                <FormattedMessage id='connectMachine.disconnect' />
              </Fragment>,
              {
                position: toast.POSITION.TOP_RIGHT
              }
            );
            dispatch({ type: actionTypes.RECEIVE_CONTINUOUS_GET_MACHINE_HAS_DISCONNECT });
          }
          if (result.data[machId].mach_status === 'Connected' && result.data[machId].mach_connBy === userEmail) {
            connectedData = result.data[machId];
          }
        }
        if (connectedData.mach_status) {
          getDevice(connectedData);
        }
      }
    });
    dispatch({ type: actionTypes.RECEIVE_CONTINUOUS_GET_MACHINE, newMachines: machines });
  },
  clearAllMachine: () => dispatch => {
    dispatch({ type: actionTypes.CLEAN_ALL_MACHINE });
  },
  // 02-2 Add machine
  addMachine: request => async dispatch => {
    dispatch({ type: actionTypes.CLEAR_ADD_MACHINE_ID });
    const responseData = await fetchPostMachineService(request);
    if (responseData.returnCode !== '00') {
      toast.error(
        <Fragment>
          <FormattedMessage id='common.add.fail' />
          <span>, {responseData.message}</span>
        </Fragment>,
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
      return false;
    }
    toast.success(<FormattedMessage id='common.add.success' />, {
      position: toast.POSITION.TOP_RIGHT
    });
    dispatch({
      type: actionTypes.RECEIVE_ADD_MACHINE,
      newMachineObj: { ...Object.values(responseData.data)[0], ischecked: false }
    });
    return true;
  },
  clearAddMachineId: () => dispatch => {
    dispatch({ type: actionTypes.CLEAR_ADD_MACHINE_ID });
  },
  // 03-02 modify information about machine mach_id
  modifyMachine: (machId, request) => async dispatch => {
    const responseData = await fetchPostMachineInfoByMachIdService(machId, request);
    if (responseData.returnCode !== '00') {
      toast.error(
        <Fragment>
          <FormattedMessage id='common.edit.fail' />
          <span>, {responseData.message}</span>
        </Fragment>,
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
      return false;
    }
    toast.success(<FormattedMessage id='common.edit.success' />, {
      position: toast.POSITION.TOP_RIGHT
    });
    dispatch({ type: actionTypes.RECEIVE_MODIFY_MACHINE, machId: machId, changeValue: request });
    return true;
  },
  // 03-3 delete machine about mach_id
  deleteMachine: machId => async (dispatch, getState) => {
    // 確認是否有連線
    const connectMachId = getState().app.connectMachId;
    const connectMachName = getState().app.connectMachName;
    if (connectMachId === machId) {
      const responseData = await fetchGetMachineDisConnect(connectMachId);
      if (responseData.returnCode !== '00') {
        toast.error(
          <Fragment>
            <span>{connectMachName}</span>
            <FormattedMessage id='disconnectMachine.fail' />
            <span>, {responseData.message}</span>
          </Fragment>,
          {
            position: toast.POSITION.TOP_RIGHT
          }
        );
        dispatch({ type: actionTypes.RECEIVE_CONNECT_MACHINE_FAIL });
        return;
      }
      dispatch({
        type: actionTypes.RECEIVE_DISCONNECT_PREV_MACHINE,
        disConnetMachineData: responseData.data[connectMachId],
        machId: connectMachId
      });
      toast.success(
        <Fragment>
          <span />
          {connectMachName}
          <FormattedMessage id='disconnectMachine.success' />
        </Fragment>,
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
    }
    //開始刪除
    const responseData = await fetchDeleteMachineInfoByMachIdService(machId);
    if (responseData.returnCode !== '00') {
      toast.error(
        <Fragment>
          <FormattedMessage id='common.delete.fail' />
          <span>, {responseData.message}</span>
        </Fragment>,
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
    } else {
      toast.success(<FormattedMessage id='common.delete.success' />, {
        position: toast.POSITION.TOP_RIGHT
      });
      dispatch({ type: actionTypes.RECEIVE_DELETE_MACHINE, machId: machId });
    }
  },
  // 04-1 connect machines of mach_id
  connectMachine: (machId, machName, machStatus) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.REQUEST_CONNECT_MACHINE });
    const connectMachId = getState().app.connectMachId;
    const connectMachName = getState().app.connectMachName;
    const acc_identity = getState().app.accountMsg.acc_identity;
    if (
      acc_identity === 'admin' &&
      (machStatus === 'Connected' || machStatus === 'Connecting') &&
      machId !== connectMachId &&
      connectMachId !== ''
    ) {
      const responseData = await fetchGetMachineDisConnect(machId);
      if (responseData.returnCode !== '00') {
        toast.error(
          <Fragment>
            <span className='mr-2'>{machName}</span>
            <FormattedMessage id='disconnectMachine.fail' />
            <span>, {responseData.message}</span>
          </Fragment>,
          {
            position: toast.POSITION.TOP_RIGHT
          }
        );
        dispatch({ type: actionTypes.RECEIVE_CONNECT_MACHINE_FAIL });
        return;
      }
      dispatch({
        type: actionTypes.RECEIVE_DISCONNECT_PREV_MACHINE,
        disConnetMachineData: responseData.data[machId],
        machId: machId
      });
      toast.success(
        <Fragment>
          <span className='mr-2'>{machName}</span>
          <FormattedMessage id='disconnectMachine.success' />
        </Fragment>,
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
    } else if (connectMachId) {
      // 打斷線
      const responseData = await fetchGetMachineDisConnect(connectMachId);
      if (responseData.returnCode !== '00') {
        toast.error(
          <Fragment>
            <span className='mr-2'>{connectMachName}</span>
            <FormattedMessage id='disconnectMachine.fail' />
            <span>, {responseData.message}</span>
          </Fragment>,
          {
            position: toast.POSITION.TOP_RIGHT
          }
        );
        dispatch({ type: actionTypes.RECEIVE_CONNECT_MACHINE_FAIL });
        return;
      }
      dispatch({
        type: actionTypes.RECEIVE_DISCONNECT_PREV_MACHINE,
        disConnetMachineData: responseData.data[connectMachId],
        machId: connectMachId
      });
      toast.success(
        <Fragment>
          <span className='mr-2'>{connectMachName}</span>
          <FormattedMessage id='disconnectMachine.success' />
        </Fragment>,
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
      toast.info(
        <Fragment>
          <span className='mr-2'>{machName}</span>
          <FormattedMessage id='connectMachine.connecting' />
        </Fragment>,
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
    }
    const machineConnectData = await fetchGetMachineConnect(machId);
    if (machineConnectData.returnCode !== '00') {
      toast.error(
        <Fragment>
          <span className='mr-2'>{machName}</span>
          <FormattedMessage id='connectMachine.fail' />
          <span>, {machineConnectData.message}</span>
        </Fragment>,
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
      dispatch({
        type: actionTypes.RECEIVE_CONNECT_MACHINE_FAIL
      });
      return;
    }
    dispatch({
      type: actionTypes.RECEIVE_CONNECT_MACHINE,
      machineConnectData: machineConnectData.data
    });
  },
  // 04-2 disconnect machines of mach_id
  disconnectMachine: machId => async dispatch => {
    dispatch({ type: actionTypes.REQUEST_DISCONNECT_MACHINE });
    const responseData = await fetchGetMachineDisConnect(machId);
    if (responseData.returnCode !== '00') {
      toast.error(
        <Fragment>
          <FormattedMessage id='disconnectMachine.fail' />
          <span>, {responseData.message}</span>
        </Fragment>,
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
      dispatch({ type: actionTypes.RECEIVE_DISCONNECT_MACHINE_FAIL });
    } else {
      toast.success(<FormattedMessage id='disconnectMachine.success' />, {
        position: toast.POSITION.TOP_RIGHT
      });
      dispatch({
        type: actionTypes.RECEIVE_DISCONNECT_MACHINE,
        machineConnectData: responseData.data
      });
    }
  },
  // 05-1 Get all of devices from machines of mach_id
  getDevice: machine => async dispatch => {
    dispatch({
      type: actionTypes.RECEIVE_CONNECTED_MACHINE,
      connectMachId: machine.mach_id,
      connectMachName: machine.mach_name
    });
    const deviceData = await fetchGetMachineDevices(machine.mach_id);
    if (deviceData.returnCode !== '00') {
      toast.error(
        <Fragment>
          <span className='mr-2'>{machine.mach_name}</span>
          <FormattedMessage id='getDevice.fail' />
          <span>, {deviceData.message}</span>
        </Fragment>,
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
      dispatch({
        type: actionTypes.RECEIVE_GET_DEVICE_FAIL
      });
      return;
    } else {
      dispatch({
        type: actionTypes.RECEIVE_GET_DEVICE,
        connectData: {
          machine: machine,
          device: Object.values(deviceData.data) ? Object.values(deviceData.data) : []
        }
      });
      window.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: document.body.scrollHeight
      });
    }
  },
  // 05-2 Add a devices from machines of mach_id
  addDevice: (machId, request) => async dispatch => {
    const responseData = await fetchAddMachineDevices(machId, request);
    if (responseData.returnCode !== '00') {
      toast.error(
        <Fragment>
          <FormattedMessage id='common.add.fail' />
          <span>, {responseData.message}</span>
        </Fragment>,
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
    } else {
      toast.success(<FormattedMessage id='common.add.success' />, {
        position: toast.POSITION.TOP_RIGHT
      });
      const device = {
        ...request,
        devices_id: Object.values(responseData.data)[0].devices_id
      };
      dispatch({ type: actionTypes.RECEIVE_ADD_DEVICE, device: device });
    }
  },
  // 06-2 modify device
  modifyDevice: (machId, deviceId, request) => async dispatch => {
    const responseData = await fetchModifyMachineDeviceInfo(machId, deviceId, request);
    if (responseData.returnCode !== '00') {
      toast.error(
        <Fragment>
          <FormattedMessage id='common.edit.fail' />
          <span>, {responseData.message}</span>
        </Fragment>,
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
    } else {
      toast.success(<FormattedMessage id='common.edit.success' />, {
        position: toast.POSITION.TOP_RIGHT
      });
      dispatch({ type: actionTypes.RECEIVE_MODIFY_DEVICE, deviceId: deviceId, device: request });
    }
  },
  // 06-3 delete device
  deleteDevice: (machId, deviceId) => async dispatch => {
    const responseData = await fetchDeleteMachineDeviceInfo(machId, deviceId);
    if (responseData.returnCode !== '00') {
      toast.error(
        <Fragment>
          <FormattedMessage id='common.delete.fail' />
          <span>, {responseData.message}</span>
        </Fragment>,
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
    } else {
      toast.success(<FormattedMessage id='common.delete.success' />, {
        position: toast.POSITION.TOP_RIGHT
      });
      dispatch({ type: actionTypes.RECEIVE_DELETE_DEVICE, deviceId: deviceId });
    }
  },
  // 08-1
  getMachineLogs: machId => async dispatch => {
    const responseData = await fetchGetMachineLogs(machId);
    if (responseData.returnCode !== '00') {
      toast.error(<FormattedMessage id='logAndNews.getLogs.failed' />, {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      dispatch({ type: actionTypes.RECEIVE_GET_LOGS, logs: Object.values(responseData.data) });
    }
  },
  // 09-1
  getNews: () => async dispatch => {
    const responseData = await fetchGetNewsService();
    if (responseData.returnCode !== '00') {
      toast.error(<FormattedMessage id='newsModal.search.fail' />, {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      dispatch({ type: actionTypes.RECEIVE_GET_NEWS, news: Object.values(responseData.data) });
    }
  },
  // 10-2
  getAccountStatus: () => async dispatch => {
    const responseData = await fetchGetCheckUserStatusService();
    if (responseData.returnCode === '00') {
      dispatch({
        type: actionTypes.RECEIVE_USER_STATUS,
        userStatus: responseData.data.user_status
      });
    }
  },
  // 10-1
  getAccountStatusId: () => async dispatch => {
    const responseData = await fetchGetRegisterIdService();
    if (responseData.returnCode === '00') {
      return responseData.data.id;
    }
    return false;
  }
};
