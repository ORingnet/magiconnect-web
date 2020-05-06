import React, { Fragment, useState } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'store/appStore/action';
import { withRouter } from 'react-router-dom';
import LogsHeader from './components/LogsHeader';
import FilterModal from './components/FilterModal';
import LogContent from './components/LogContent';
const Logs = ({ history, match, logDialogs, getMachineLogs }) => {
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState({
    action: '',
    endTime: '',
    level: '',
    startTime: ''
  });
  const handleToggleFilterModal = () => {
    setFilterModalIsOpen(!filterModalIsOpen);
  };
  const filterLogs = value => {
    setSearchValue(value);
  };

  return (
    <Fragment>
      <LogsHeader
        toggleFilterModal={handleToggleFilterModal}
        machId={match.params.machId}
        setSearchValue={setSearchValue}
      />
      <FilterModal modalIsOpen={filterModalIsOpen} toggleModal={handleToggleFilterModal} filterLogs={filterLogs} />
      <LogContent
        machName={match.params.machName}
        machId={match.params.machId}
        logDialogs={logDialogs}
        getMachineLogs={getMachineLogs}
        searchValue={searchValue}
        filterLogs={filterLogs}
      />
    </Fragment>
  );
};
export default compose(
  connect(
    state => state.app,
    dispatch => bindActionCreators(actionCreators, dispatch)
  ),
  withRouter
)(Logs);
