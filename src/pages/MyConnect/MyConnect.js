import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import { injectIntl } from 'react-intl';
import { continueGetMachineTime } from 'utility/app/timeInterval';
import ConnectFunc from './components/ConnectFunc';
import ConnectTable from './components/ConnectTable';
import FixedLoading from 'components/FixedLoading';
import ActiveConnection from './components/ActiveConnection';
import { useWindowWidth } from '@react-hook/window-size/throttled';

const MyConnect = ({
  getAllMachine,
  toggleMachineChecked,
  clearAddMachineId,
  connectMachine,
  continuousGetMachine,
  modifyMachine,
  toggleModifyMachineModal,
  getDevice,
  appState,
  langState,
  history,
  intl
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [changePage, setChangePage] = useState(false);
  const windowWidth = useWindowWidth();
  // 初始化取得 all machine
  useEffect(() => {
    if (!langState.changeStatus && history.action === 'POP') {
      getAllMachine(connectMachine, getDevice);
    }
  }, [connectMachine, getAllMachine, getDevice, history.action, langState]);

  // 排序+搜尋
  const sortMachineArr = useCallback(() => {
    const filterMachineCreator = appState.machines.filter(machine => {
      if (appState.searchFilter.machineCreator) {
        return machine.mach_creator === appState.accountMsg.acc_mail;
      }
      return machine;
    });
    const filterMachines = filterMachineCreator.filter(machine => {
      if (appState.searchValue !== '') {
        const request = appState.searchValue.toLowerCase();
        const checkHaveData = data => (data ? data.toLowerCase().includes(request) : false);
        return (
          checkHaveData(machine.mach_name) ||
          intl
            .formatMessage({ id: `connectTable.${machine.mach_status}` })
            .toLowerCase()
            .includes(request) ||
          checkHaveData(machine.mach_descr) ||
          checkHaveData(machine.mach_country) ||
          checkHaveData(machine.mach_city) ||
          checkHaveData(machine.mach_connBy) ||
          checkHaveData(machine.mach_remark)
        );
      }
      return true;
    });
    const setMachinesSortValue = filterMachines.map(machine => {
      if (machine.mach_id === appState.connectMachId) {
        return {
          ...machine,
          sortValue: 5
        };
      } else if (machine.mach_status === 'Connecting') {
        return {
          ...machine,
          sortValue: 4
        };
      } else if (machine.mach_status === 'Connected') {
        return {
          ...machine,
          sortValue: 3
        };
      } else if (machine.mach_status === 'On-Line') {
        return {
          ...machine,
          sortValue: 2
        };
      } else if (machine.mach_status === 'updating') {
        return {
          ...machine,
          sortValue: 1
        };
      }
      return {
        ...machine,
        sortValue: 0
      };
    });
    const sortMachine = setMachinesSortValue.sort((a, b) => (a.sortValue > b.sortValue ? -1 : 1));
    return sortMachine;
  }, [
    appState.accountMsg.acc_mail,
    appState.connectMachId,
    appState.machines,
    appState.searchFilter.machineCreator,
    appState.searchValue,
    intl
  ]);

  // 持續取得
  useEffect(() => {
    if (appState.machines.length > 0) {
      const timeOut = setTimeout(async () => {
        const requestArr = sortMachineArr()
          .filter((_, i) => i >= (currentPage - 1) * 10 && i < currentPage * 10)
          .map(machine => machine.mach_id);
        await continuousGetMachine(requestArr, history, getDevice);
      }, continueGetMachineTime);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [appState.machines.length, continuousGetMachine, currentPage, getDevice, history, sortMachineArr]);
  useEffect(() => {
    if (changePage) {
      const requestArr = sortMachineArr()
        .filter((_, i) => i >= (currentPage - 1) * 10 && i < currentPage * 10)
        .map(machine => machine.mach_id);
      continuousGetMachine(requestArr, history, getDevice);
      setChangePage(false);
    }
  }, [changePage, continuousGetMachine, currentPage, getDevice, history, sortMachineArr]);

  useEffect(() => {
    // 如果有新增 machines
    if (appState.addNewMachineId !== '') {
      const findNewMachineIndex = sortMachineArr().findIndex(machine => machine.mach_id === appState.addNewMachineId);
      if (findNewMachineIndex > -1) {
        setCurrentPage(Math.floor(findNewMachineIndex / 10) + 1);
      } else {
        setCurrentPage(1);
      }
      clearAddMachineId();
    }
  }, [
    appState.addNewMachineId,
    appState.connectMachId,
    appState.machines,
    appState.searchValue,
    clearAddMachineId,
    intl,
    sortMachineArr
  ]);
  // 一搜尋就把頁面切到第一頁
  useEffect(() => {
    if (appState.searchValue !== '') {
      setCurrentPage(1);
    }
  }, [appState.searchValue]);
  const handlePageChange = i => {
    setCurrentPage(i);
    setChangePage(true);
  };
  const renderIsLoading = () => {
    const { bindingIsLoading, disconnectMachineIsLoading } = appState;
    if (disconnectMachineIsLoading || bindingIsLoading) {
      return <FixedLoading />;
    }
  };
  return (
    <Fragment>
      <ConnectFunc changePage={handlePageChange} />
      <ConnectTable
        getAllMachineIsLoading={appState.getAllMachineIsLoading}
        machines={sortMachineArr()}
        toggleMachineChecked={toggleMachineChecked}
        searchValue={appState.searchValue}
        connectMachId={appState.connectMachId}
        currentPage={currentPage}
        changePage={handlePageChange}
        windowWidth={windowWidth}
        modifyMachine={modifyMachine}
        toggleModifyMachineModal={toggleModifyMachineModal}
        modifyMachineModalIsOpen={appState.modifyMachineModalIsOpen}
        modifyMachineObj={appState.modifyMachineObj}
      />
      <ActiveConnection />
      {renderIsLoading()}
    </Fragment>
  );
};
export default compose(
  connect(
    state => ({
      appState: state.app,
      langState: state.lang
    }),
    dispatch => bindActionCreators(actionCreators, dispatch)
  ),
  injectIntl,
  withRouter
)(MyConnect);
