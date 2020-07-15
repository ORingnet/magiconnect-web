import * as actionTypes from './actionTypes';
const initialState = {
  accountMsg: {},
  newsDialogs: [],
  logDialogs: [],
  machines: [],
  addNewMachineId: '',
  connectData: {
    machine: {},
    device: []
  },
  connectMachId: '',
  connectMachName: '',
  siderbarIsOpen: false,
  addConnectIsOpen: false,
  showNewsIsOpen: false,
  showMapIsOpen: false,
  modifyMachineModalIsOpen: false,
  modifyMachineObj: {},
  deleteMachineModalIsOpen: false,
  deleteMachineArr: [],
  searchValue: '',
  searchFilter: {
    machineCreator: true
  },
  getAccountInfoStatus: false,
  getAllMachineIsLoading: true,
  disconnectMachineIsLoading: false,
  connectMachineIsLoading: false,
  connectMachineIsOpen: false,
  continuousGetAllMachineStatus: false,
  userStatus: 'Off-Line',
  copyMachineIdModalIsOpen: false,
  copyMachineIdText: '',
  bindingIsLoading: false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_SIDERBAR: {
      return {
        ...state,
        siderbarIsOpen: !state.siderbarIsOpen
      };
    }
    case actionTypes.TOGGLE_ADD_CONNECT: {
      return {
        ...state,
        addConnectIsOpen: !state.addConnectIsOpen,
        siderbarIsOpen: false
      };
    }
    case actionTypes.TOGGLE_NEWS: {
      return {
        ...state,
        showNewsIsOpen: !state.showNewsIsOpen,
        siderbarIsOpen: false
      };
    }
    case actionTypes.TOGGLE_MAP: {
      return {
        ...state,
        showMapIsOpen: !state.showMapIsOpen,
        siderbarIsOpen: false
      };
    }

    case actionTypes.TOGGLE_MACHINE_CHECKED: {
      const newMachines = state.machines.map(machine => ({
        ...machine,
        ischecked: machine.mach_id === action.machineId ? !machine.ischecked : machine.ischecked
      }));
      return {
        ...state,
        machines: newMachines
      };
    }
    case actionTypes.TOGGLE_COPY_MACHINE_ID_MODAL: {
      return {
        ...state,
        copyMachineIdModalIsOpen: !state.copyMachineIdModalIsOpen
      };
    }
    case actionTypes.TOGGLE_MODIFY_MACHINE_MODAL: {
      return {
        ...state,
        modifyMachineModalIsOpen: !state.modifyMachineModalIsOpen,
        modifyMachineObj: action.machineObj ? action.machineObj : {}
      };
    }
    case actionTypes.TOGGLE_DELETE_MACHINE_MODAL: {
      return {
        ...state,
        deleteMachineModalIsOpen: !state.deleteMachineModalIsOpen,
        deleteMachineArr: action.deleteMachineArr ? action.deleteMachineArr : []
      };
    }
    case actionTypes.SEARCH_MACHINE: {
      return {
        ...state,
        searchValue: action.searchValue
      };
    }
    case actionTypes.TOGGLE_FILTER_MACHINE_CREATOR: {
      return {
        ...state,
        searchFilter: {
          ...state.searchFilter,
          machineCreator: !state.searchFilter.machineCreator
        }
      };
    }
    case actionTypes.REFRESH_MACHINE: {
      return {
        ...state,
        connectData: {
          machine: {},
          device: []
        },
        connectMachId: '',
        connectMachName: '',
        connectMachineIsOpen: false
      };
    }
    // get account
    case actionTypes.REQEST_GET_ACCOUNT_INFO: {
      return {
        ...state,
        getAccountInfoStatus: false
      };
    }
    case actionTypes.RECEIVE_GET_ACCOUNT_INFO: {
      return {
        ...state,
        accountMsg: action.accountInfo,
        getAccountInfoStatus: true
      };
    }
    // get all machine
    case actionTypes.REQEST_GET_ALL_MACHINE: {
      return {
        ...state,
        getAllMachineIsLoading: true
      };
    }
    case actionTypes.RECEIVE_GET_ALL_MACHINE: {
      return {
        ...state,
        machines: action.machines,
        getAllMachineIsLoading: false
      };
    }
    case actionTypes.RECEIVE_GET_ALL_MACHINE_FAIL: {
      return {
        ...state,
        machines: [],
        getAllMachineIsLoading: false
      };
    }
    // 持續接收 machines 新的資料
    // 如果找不到
    case actionTypes.RECEIVE_MACHINE_UPDATING: {
      const newMachines = state.machines.map(machine => {
        if (machine.mach_id === action.machineId) {
          return {
            ...machine,
            mach_status: 'updating'
          };
        } else {
          return machine;
        }
      });
      const isConnect = state.connectMachId === action.machineId;
      const newConnectData = isConnect
        ? state.connectData
        : {
            machine: {},
            device: []
          };
      return {
        ...state,
        machines: newMachines,
        connectMachId: isConnect ? '' : state.connectMachId,
        connectMachName: isConnect ? '' : state.connectMachName,
        connectMachineIsOpen: isConnect ? false : state.connectMachineIsOpen,
        connectData: newConnectData
      };
    }
    case actionTypes.RECEIVE_CONTINUOUS_GET_MACHINE: {
      const newMachines = state.machines.map(machine => {
        if (action.newMachines[machine.mach_id]) {
          return {
            ...machine,
            ...action.newMachines[machine.mach_id]
          };
        }
        return machine;
      });
      return {
        ...state,
        machines: newMachines
      };
    }
    case actionTypes.RECEIVE_CONTINUOUS_GET_MACHINE_HAS_DISCONNECT: {
      return {
        ...state,
        connectMachineIsOpen: false,
        connectMachId: '',
        connectMachName: '',
        connectData: {
          machine: {},
          device: []
        }
      };
    }
    case actionTypes.CLEAR_ADD_MACHINE_ID: {
      return {
        ...state,
        addNewMachineId: ''
      };
    }
    case actionTypes.RECEIVE_ADD_MACHINE: {
      const { newMachineObj } = action;
      const newMachines = [...state.machines];
      const machineStatusIndex = newMachines.findIndex(machine => machine.mach_status === newMachineObj.mach_status);
      if (machineStatusIndex > -1) {
        newMachines.splice(machineStatusIndex, 0, newMachineObj);
      } else {
        newMachines.push(newMachineObj);
      }
      return {
        ...state,
        machines: newMachines,
        addNewMachineId: newMachineObj.mach_id,
        copyMachineIdText: `${newMachineObj.mach_id}:${newMachineObj.mach_secret}`
      };
    }
    // modify machine
    case actionTypes.RECEIVE_MODIFY_MACHINE: {
      const newMachines = state.machines.map(datum => {
        if (datum.mach_id === action.machId) {
          return {
            ...datum,
            ...action.changeValue
          };
        }
        return datum;
      });
      const newConnectData = () => {
        if (state.connectData.machine.mach_id === action.machId) {
          return {
            ...state.connectData,
            machine: {
              ...state.connectData.machine,
              ...action.changeValue
            }
          };
        }
        return state.connectData;
      };
      const newConnectMachName =
        state.connectData.machine.mach_id === action.machId ? action.changeValue.mach_name : state.connectMachName;
      return {
        ...state,
        machines: newMachines,
        connectData: newConnectData(),
        connectMachName: newConnectMachName
      };
    }
    case actionTypes.CLEAN_ALL_MACHINE: {
      return {
        ...state,
        getAllMachineIsLoading: true,
        machines: [],
        connectData: {
          machine: {},
          device: []
        },
        connectMachineIsLoading: true,
        connectMachineIsOpen: false
      };
    }
    // 04-1 connect machine
    case actionTypes.REQUEST_CONNECT_MACHINE: {
      return {
        ...state,
        connectMachineIsLoading: true,
        connectMachineIsOpen: false
      };
    }
    case actionTypes.RECEIVE_CONNECT_MACHINE: {
      const newMachines = state.machines.map(datum => {
        if (action.machineConnectData[datum.mach_id]) {
          return {
            ...datum,
            ...action.machineConnectData[datum.mach_id],
            ischecked: true
          };
        }
        return { ...datum, ischecked: false };
      });
      return {
        ...state,
        connectMachineIsLoading: false,
        connectMachId: action.connectMachId,
        connectMachName: action.connectMachName,
        machines: newMachines
      };
    }
    case actionTypes.RECEIVE_CONNECTED_MACHINE: {
      const { connectMachId, connectMachName } = action;
      return {
        ...state,
        connectMachName,
        connectMachId
      };
    }
    case actionTypes.RECEIVE_CONNECT_MACHINE_FAIL: {
      return {
        ...state,
        connectMachineIsLoading: false,
        connectMachineIsOpen: false
      };
    }
    case actionTypes.RECEIVE_DISCONNECT_PREV_MACHINE: {
      const newMachines = state.machines.map(datum => {
        if (datum.mach_id === action.machId) {
          return {
            ...datum,
            ...action.disConnetMachineData
          };
        }
        return datum;
      });
      return {
        ...state,
        machines: newMachines,
        connectMachId: '',
        connectMachName: '',
        connectData: {
          machine: {},
          device: []
        },
        connectMachineIsOpen: false
      };
    }
    case actionTypes.REQUEST_DISCONNECT_MACHINE: {
      return {
        ...state,
        disconnectMachineIsLoading: true
      };
    }
    case actionTypes.RECEIVE_DISCONNECT_MACHINE_FAIL: {
      return {
        ...state,
        disconnectMachineIsLoading: false
      };
    }
    case actionTypes.RECEIVE_DISCONNECT_MACHINE: {
      const newMachines = state.machines.map(datum => {
        if (action.machineConnectData[datum.mach_id]) {
          return {
            ...datum,
            ...action.machineConnectData[datum.mach_id],
            ischecked: false
          };
        }
        return datum;
      });
      return {
        ...state,
        connectMachId: '',
        connectMachName: '',
        connectData: {
          machine: {},
          device: []
        },
        connectMachineIsLoading: false,
        connectMachineIsOpen: false,
        disconnectMachineIsLoading: false,
        machines: newMachines
      };
    }
    case actionTypes.RECEIVE_DELETE_MACHINE: {
      const newMachines = state.machines.filter(datum => datum.mach_id !== action.machId);
      return {
        ...state,
        machines: newMachines
      };
    }
    case actionTypes.RECEIVE_GET_DEVICE: {
      return {
        ...state,
        connectData: action.connectData,
        connectMachineIsOpen: true
      };
    }
    case actionTypes.RECEIVE_GET_DEVICE_FAIL: {
      return {
        ...state,
        connectData: {
          machine: {},
          device: []
        },
        connectMachineIsOpen: false
      };
    }
    case actionTypes.RECEIVE_ADD_DEVICE: {
      const device = [...state.connectData.device];
      device.push(action.device);
      return {
        ...state,
        connectData: {
          ...state.connectData,
          device: device
        }
      };
    }
    case actionTypes.RECEIVE_MODIFY_DEVICE: {
      const newDevice = state.connectData.device.map(datum => {
        if (datum.devices_id === action.deviceId) {
          return {
            ...datum,
            ...action.device
          };
        }
        return datum;
      });
      return {
        ...state,
        connectData: {
          ...state.connectData,
          device: newDevice
        }
      };
    }
    case actionTypes.RECEIVE_DELETE_DEVICE: {
      const newDevice = state.connectData.device.filter(datum => datum.devices_id !== action.deviceId);
      return {
        ...state,
        connectData: {
          ...state.connectData,
          device: newDevice
        }
      };
    }
    case actionTypes.RECEIVE_GET_LOGS: {
      return {
        ...state,
        logDialogs: action.logs
      };
    }
    case actionTypes.RECEIVE_GET_NEWS: {
      return {
        ...state,
        newsDialogs: action.news
      };
    }

    // 10-2
    case actionTypes.RECEIVE_USER_STATUS: {
      return {
        ...state,
        userStatus: action.userStatus
      };
    }
    // 12-1
    case actionTypes.REQUEST_BINDED_START: {
      return {
        ...state,
        bindingIsLoading: true
      };
    }
    case actionTypes.RECEIVE_BINDED: {
      return {
        ...state,
        machines: state.machines.map(machine => ({
          ...machine,
          mach_bindBy: machine.mach_id === action.machine.mach_id ? state.accountMsg.acc_mail : ''
        }))
      };
    }
    case actionTypes.REQUEST_BINDED_END: {
      return {
        ...state,
        bindingIsLoading: false
      };
    }
    default: {
      return state;
    }
  }
};
export default reducer;
