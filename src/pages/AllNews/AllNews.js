import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/appStore/action';
import AllNewsHeader from './components/AllNewsHeader';
import FilterModal from './components/FilterModal';
import NewsContent from './components/NewsContent';
const AllNews = ({ newsDialogs, filterNewsSearchValue }) => {
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

  const filterNews = value => {
    setSearchValue(value);
  };
  return (
    <Fragment>
      <AllNewsHeader toggleFilterModal={handleToggleFilterModal} setSearchValue={setSearchValue} />
      <FilterModal modalIsOpen={filterModalIsOpen} toggleModal={handleToggleFilterModal} filterNews={filterNews} />
      <NewsContent newsDialogs={newsDialogs} searchValue={searchValue} filterNews={filterNews} />
    </Fragment>
  );
};
export default connect(
  state => state.app,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(AllNews);
