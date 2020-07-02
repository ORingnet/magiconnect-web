import React, { Fragment, useState, useEffect } from 'react';
import Moment from 'react-moment';
import momentFunc from 'moment';
import { FormattedMessage } from 'react-intl';
import Pagination from 'rc-pagination';
import Spinner from 'components/Spinner';
import { Button } from 'reactstrap';
import { StyledTitle, StyledUl, StyledNoDataBox, StyledBadge, StyledBadgeBox } from './StyledLogContent';
const LogContent = ({ machName, machId, logDialogs, getMachineLogs, searchValue, filterLogs }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleSearch = async () => {
      setIsLoading(true);
      await getMachineLogs(machId);
      setIsLoading(false);
    };
    handleSearch();
  }, [getMachineLogs, machId]);
  const handlePagination = i => {
    setCurrentPage(i - 1);
  };
  const handleClearFilter = () => {
    filterLogs({
      action: '',
      endTime: '',
      level: '',
      startTime: ''
    });
  };
  const renderLevel = level => {
    if (level === 1) {
      return 'primary';
    } else if (level === 2) {
      return 'warning';
    } else if (level === 3) {
      return 'dark';
    } else if (level === 4) {
      return 'danger';
    }
  };
  const renderLevelText = level => {
    if (level === 1) {
      return `common.INFO`;
    } else if (level === 2) {
      return `common.WARNING`;
    } else if (level === 3) {
      return `common.CRITICAL`;
    } else if (level === 4) {
      return `common.ERROR`;
    }
  };
  const renderActionText = action => {
    if (action === 1) {
      return `common.add`;
    } else if (action === 2) {
      return `common.updata`;
    } else if (action === 3) {
      return `common.connect`;
    } else if (action === 4) {
      return `common.disconnect`;
    }
  };
  const renderLogDialogs = () => {
    if (!isLoading) {
      if (logDialogs.length > 0) {
        const filterSearchAction = logDialogs.filter(datum =>
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
          const filterResult = filterSearchEndTime.filter(
            (_, i) => i >= currentPage * 20 && i < (currentPage + 1) * 20
          );

          const renderResult = filterResult.map((log, i) => (
            <li key={i}>
              <Moment format='YYYY/MM/DD HH:mm:ss'>{log.logs_time}</Moment>
              <StyledBadgeBox>
                <StyledBadge color={renderLevel(log.level)}>
                  <FormattedMessage id={renderLevelText(log.level)} />
                </StyledBadge>
                <StyledBadge>
                  <FormattedMessage id={renderActionText(log.action)} />
                </StyledBadge>
              </StyledBadgeBox>
              <p>{log.msg}</p>
            </li>
          ));
          return (
            <Fragment>
              <StyledUl>{renderResult}</StyledUl>
              <div className='d-flex justify-content-end mr-3'>
                <Pagination
                  total={filterSearchEndTime.length}
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
            <FormattedMessage id='logs.filterNoLogs' />
            <Button className='ml-3' color='primary' size='sm'>
              <FormattedMessage id='common.clearFilter' />
            </Button>
          </StyledNoDataBox>
        );
      }
      return (
        <StyledNoDataBox>
          <FormattedMessage id='logs.noLogs' />
        </StyledNoDataBox>
      );
    }
    return <Spinner color='white' />;
  };
  return (
    <Fragment>
      <StyledTitle>
        <FormattedMessage id='logAndNews.log' /> : {machName}
      </StyledTitle>
      {renderLogDialogs()}
    </Fragment>
  );
};
export default LogContent;
