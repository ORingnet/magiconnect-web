import React, { Fragment, useState } from 'react';
import Moment from 'react-moment';
import momentFunc from 'moment';
import { FormattedMessage } from 'react-intl';
import Pagination from 'rc-pagination';
import { Button } from 'reactstrap';
import { StyledTitle, StyledUl, StyledBadge, StyledNoDataBox } from './StyledNewsContent';
const NewsContent = ({ newsDialogs, searchValue, filterNews }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const handlePagination = i => {
    setCurrentPage(i - 1);
  };
  const handleClearFilter = () => {
    filterNews({
      action: '',
      endTime: '',
      level: '',
      startTime: ''
    });
  };
  const renderLevel = level => {
    if (level === 'INFO') {
      return 'primary';
    } else if (level === 'WARNING') {
      return 'warning';
    } else if (level === 'ERROR') {
      return 'danger';
    } else if (level === 'CRITICAL') {
      return 'dark';
    }
  };

  const renderNewsDialogs = () => {
    if (newsDialogs.length > 0) {
      const filterSearchAction = newsDialogs.filter(datum =>
        !searchValue.action ? datum : datum.action === searchValue.action
      );
      const filterSearchLevel = filterSearchAction.filter(datum =>
        !searchValue.level ? datum : datum.level === searchValue.level
      );

      const filterSearchStartTime = filterSearchLevel.filter(datum =>
        !searchValue.startTime ? datum : momentFunc(searchValue.startTime).isBefore(datum.timestamp)
      );
      const filterSearchEndTime = filterSearchStartTime.filter(datum =>
        !searchValue.endTime
          ? datum
          : momentFunc(momentFunc(searchValue.endTime).add(1, 'days')).isAfter(datum.timestamp)
      );
      if (filterSearchEndTime.length > 0) {
        const filterResult = filterSearchEndTime.filter((_, i) => i >= currentPage * 20 && i < (currentPage + 1) * 20);
        const renderResult = filterResult.map((news, i) => (
          <li key={i}>
            <Moment format='YYYY/MM/DD'>{news.timestamp}</Moment>
            <StyledBadge color={renderLevel(news.level)}>
              <FormattedMessage id={`common.${news.level}`} />
            </StyledBadge>
            <StyledBadge>
              <FormattedMessage id={`common.${news.action}`} />
            </StyledBadge>
            <p>{news.msg}</p>
          </li>
        ));
        return (
          <Fragment>
            <StyledUl>{renderResult}</StyledUl>
            <div className='d-flex justify-content-end mr-3'>
              <Pagination
                total={filterResult.length}
                onChange={handlePagination}
                className='pagination'
                showTitle={false}
                pageSize={20}
              />
            </div>
          </Fragment>
        );
      }
      return (
        <StyledNoDataBox onClick={handleClearFilter}>
          <FormattedMessage id='newsModal.filterNoNews' />
          <Button className='ml-3' color='primary' size='sm'>
            <FormattedMessage id='common.clearFilter' />
          </Button>
        </StyledNoDataBox>
      );
    }
    return (
      <StyledNoDataBox>
        <FormattedMessage id='newsModal.noNews' />
      </StyledNoDataBox>
    );
  };
  return (
    <Fragment>
      <StyledTitle>
        <FormattedMessage id='newsModal.allNews' />
      </StyledTitle>
      {renderNewsDialogs()}
    </Fragment>
  );
};
export default NewsContent;
