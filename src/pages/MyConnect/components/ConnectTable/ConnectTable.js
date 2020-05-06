import React, { Fragment } from 'react';
import { FormattedHTMLMessage, FormattedMessage, injectIntl } from 'react-intl';
import switchStatus from 'components/SwitchStatus';
import Spinner from 'components/Spinner';
import Pagination from 'rc-pagination';
import {
  StyledTableCotainer,
  StyledTable,
  StyledTd,
  StyledTr,
  StyledNodataTr,
  StyledUncontrolledTooltip
} from './StyledConnectTable';
const connectTable = ({
  getAllMachineIsLoading,
  machines,
  toggleMachineChecked,
  searchValue,
  intl,
  connectMachId,
  currentPage,
  changePage
}) => {
  const handleDoNothing = () => {};
  const renderNodata = (
    <StyledNodataTr>
      <td colSpan='8'>
        <FormattedMessage id='connectTable.nodata' />
      </td>
    </StyledNodataTr>
  );
  const renderFindSearchValue = string => {
    if (string) {
      return [...string].map((datum, i) => {
        if (searchValue !== '') {
          if ([...searchValue.toLowerCase()].includes(datum.toLowerCase())) {
            return (
              <span className='bg-warning' key={datum + i}>
                {datum}
              </span>
            );
          }
          return <Fragment key={datum + i}>{datum}</Fragment>;
        }
        return datum;
      });
    }
  };

  const renderPagination = () => {
    if (machines.length > 0) {
      const filterMachines = machines.filter(machine => {
        if (searchValue !== '') {
          const request = searchValue.toLowerCase();
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
      return (
        <div className='d-flex justify-content-end mr-3'>
          <Pagination
            total={filterMachines.length}
            onChange={changePage}
            className='pagination mb-0'
            current={currentPage}
            showTitle={false}
          />
        </div>
      );
    }
  };
  const renderTooltips = (string, target) => {
    if (string) {
      return (
        <StyledUncontrolledTooltip placement='top' target={target}>
          {renderFindSearchValue(string)}
        </StyledUncontrolledTooltip>
      );
    }
  };
  const renderImg = mach_status => {
    const status = switchStatus(mach_status);
    return status.imgSrc ? <img src={status.imgSrc} alt='' className='mr-3' /> : status.img;
  };
  const renderMachines = () => {
    if (!getAllMachineIsLoading) {
      if (machines.length > 0) {
        return machines
          .filter((_, i) => i >= (currentPage - 1) * 10 && i < currentPage * 10)
          .map(machine => (
            <StyledTr
              key={machine.mach_id}
              onClick={() => toggleMachineChecked(machine.mach_id)}
              ischecked={machine.ischecked}
            >
              <td>
                <input type='radio' id={machine.mach_id} checked={machine.ischecked} onChange={handleDoNothing} />
              </td>
              <StyledTd
                color={switchStatus(machine.mach_status).color}
                data-title={intl.formatMessage({ id: `connectTable.${machine.mach_status}` })}
              >
                {renderImg(machine.mach_status)}
                {renderFindSearchValue(intl.formatMessage({ id: `connectTable.${machine.mach_status}` }))}
              </StyledTd>
              <td data-title={intl.formatMessage({ id: 'connectTable.name' })} id={`tooltipName${machine.mach_id}`}>
                {renderFindSearchValue(machine.mach_name)}
                {renderTooltips(machine.mach_name, `tooltipName${machine.mach_id}`)}
              </td>
              <td
                data-title={intl.formatMessage({ id: 'connectTable.description' })}
                id={`tooltipDescr${machine.mach_id}`}
              >
                {renderFindSearchValue(machine.mach_descr)}
                {renderTooltips(machine.mach_descr, `tooltipDescr${machine.mach_id}`)}
              </td>
              <td
                data-title={intl.formatMessage({ id: 'connectTable.userConnective' })}
                id={`tooltipConnBy${machine.mach_id}`}
              >
                {renderFindSearchValue(machine.mach_connBy)}
                {renderTooltips(machine.mach_connBy.trim(), `tooltipConnBy${machine.mach_id}`)}
              </td>
              <td
                data-title={intl.formatMessage({ id: 'connectTable.country' })}
                id={`tooltipCountry${machine.mach_id}`}
              >
                {renderFindSearchValue(machine.mach_country)}
                {renderTooltips(machine.mach_country, `tooltipCountry${machine.mach_id}`)}
              </td>
              <td data-title={intl.formatMessage({ id: 'connectTable.city' })} id={`tooltipCity${machine.mach_id}`}>
                {renderFindSearchValue(machine.mach_city)}
                {renderTooltips(machine.mach_city, `tooltipCity${machine.mach_id}`)}
              </td>
              <td data-title={intl.formatMessage({ id: 'connectTable.remark' })} id={`tooltipRemark${machine.mach_id}`}>
                {renderFindSearchValue(machine.mach_remark)}
                {renderTooltips(machine.mach_remark, `tooltipRemark${machine.mach_id}`)}
              </td>
            </StyledTr>
          ));
      }
      return renderNodata;
    }
    return (
      <StyledNodataTr>
        <td colSpan='8'>
          <Spinner />
        </td>
      </StyledNodataTr>
    );
  };
  return (
    <StyledTableCotainer connectd={connectMachId !== '' ? 'true' : 'false'}>
      <StyledTable
        connectd={machines.length > 0 ? 'true' : 'false'}
        loading={getAllMachineIsLoading ? 'true' : 'false'}
      >
        <thead>
          <tr>
            <th />
            <FormattedHTMLMessage tagName='th' id='connectTable.status' />
            <FormattedHTMLMessage tagName='th' id='connectTable.name' />
            <FormattedHTMLMessage tagName='th' id='connectTable.description' />
            <FormattedHTMLMessage tagName='th' id='connectTable.userConnective' />
            <FormattedHTMLMessage tagName='th' id='connectTable.country' />
            <FormattedHTMLMessage tagName='th' id='connectTable.city' />
            <FormattedHTMLMessage tagName='th' id='connectTable.remark' />
          </tr>
        </thead>
        <tbody>{renderMachines()}</tbody>
      </StyledTable>
      {renderPagination()}
    </StyledTableCotainer>
  );
};
export default injectIntl(connectTable);
