import React, { Fragment } from 'react';
import { FormattedHTMLMessage, FormattedMessage, injectIntl } from 'react-intl';
import switchStatus from 'components/SwitchStatus';
import Spinner from 'components/Spinner';
import ModifyMachineModal from 'components/ModifyMachineModal';
import DeleteMachineModal from 'components/DeleteMachineModal';
import Pagination from 'rc-pagination';
import DisconnectAction from './DisconnectAction';
import ConnectAction from './ConnectAction';
import ModifyModal from './ModifyModal';
import LinkToLogs from './LinkToLogs';
import DeleteAction from './DeleteAction';
import { pad } from 'utility/app/rwd';

import { UncontrolledDropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import {
  StyledTableCotainer,
  StyledTable,
  StyledTd,
  StyledTr,
  StyledNodataTr,
  StyledUncontrolledTooltip,
  StyledDropdownToggle,
  StlyedActionPhoneContainer
} from './StyledConnectTable';

const connectTable = ({
  getAllMachineIsLoading,
  machines,
  toggleMachineChecked,
  searchValue,
  intl,
  connectMachId,
  currentPage,
  changePage,
  windowWidth,
  modifyMachine,
  toggleModifyMachineModal,
  modifyMachineModalIsOpen,
  modifyMachineObj
}) => {
  const renderNodata = (
    <StyledNodataTr>
      <td colSpan='9'>
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
  const renderIsConnect = machine => {
    if (machine.mach_status === 'Connected' || machine.mach_status === 'Connecting') {
      return <DisconnectAction machineObj={machine} windowWidth={windowWidth} />;
    }
    return <ConnectAction machineObj={machine} windowWidth={windowWidth} changePage={changePage} />;
  };
  const renderAction = machine => {
    if (windowWidth <= pad) {
      return (
        <StlyedActionPhoneContainer>
          {renderIsConnect(machine)}
          <ModifyModal machineObj={machine} windowWidth={windowWidth} />
          <LinkToLogs machineObj={machine} windowWidth={windowWidth} />
          <DeleteAction machineObj={machine} windowWidth={windowWidth} />
        </StlyedActionPhoneContainer>
      );
    }
    return (
      <UncontrolledDropdown size='sm'>
        <StyledDropdownToggle caret color='primary'>
          <FormattedHTMLMessage id='connectTable.action' />
        </StyledDropdownToggle>
        <DropdownMenu>
          {renderIsConnect(machine)}
          <DropdownItem divider />
          <ModifyModal machineObj={machine} windowWidth={windowWidth} />
          <DropdownItem divider />
          <LinkToLogs machineObj={machine} windowWidth={windowWidth} />
          <DropdownItem divider />
          <DeleteAction machineObj={machine} windowWidth={windowWidth} />
        </DropdownMenu>
      </UncontrolledDropdown>
    );
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
            <StyledTr key={machine.mach_id} ischecked={machine.ischecked}>
              <td>
                <input
                  type='checkbox'
                  checked={machine.ischecked}
                  onChange={() => toggleMachineChecked(machine.mach_id)}
                />
              </td>
              <StyledTd
                color={switchStatus(machine.mach_status).color}
                data-title={intl.formatMessage({ id: `connectTable.${machine.mach_status}` })}
                onClick={() => toggleMachineChecked(machine.mach_id)}
              >
                {renderImg(machine.mach_status)}
                {renderFindSearchValue(intl.formatMessage({ id: `connectTable.${machine.mach_status}` }))}
              </StyledTd>
              <td data-title={intl.formatMessage({ id: 'connectTable.action' })}>{renderAction(machine)}</td>
              <td
                data-title={intl.formatMessage({ id: 'connectTable.name' })}
                id={`tooltipName${machine.mach_id}`}
                onClick={() => toggleMachineChecked(machine.mach_id)}
              >
                {renderFindSearchValue(machine.mach_name)}
                {renderTooltips(machine.mach_name, `tooltipName${machine.mach_id}`)}
              </td>
              <td
                data-title={intl.formatMessage({ id: 'connectTable.description' })}
                id={`tooltipDescr${machine.mach_id}`}
                onClick={() => toggleMachineChecked(machine.mach_id)}
              >
                {renderFindSearchValue(machine.mach_descr)}
                {renderTooltips(machine.mach_descr, `tooltipDescr${machine.mach_id}`)}
              </td>
              <td
                data-title={intl.formatMessage({ id: 'connectTable.userConnective' })}
                id={`tooltipConnBy${machine.mach_id}`}
                onClick={() => toggleMachineChecked(machine.mach_id)}
              >
                {renderFindSearchValue(machine.mach_connBy)}
                {renderTooltips(machine.mach_connBy.trim(), `tooltipConnBy${machine.mach_id}`)}
              </td>
              <td
                data-title={intl.formatMessage({ id: 'connectTable.country' })}
                id={`tooltipCountry${machine.mach_id}`}
                onClick={() => toggleMachineChecked(machine.mach_id)}
              >
                {renderFindSearchValue(machine.mach_country)}
                {renderTooltips(machine.mach_country, `tooltipCountry${machine.mach_id}`)}
              </td>
              <td
                data-title={intl.formatMessage({ id: 'connectTable.city' })}
                id={`tooltipCity${machine.mach_id}`}
                onClick={() => toggleMachineChecked(machine.mach_id)}
              >
                {renderFindSearchValue(machine.mach_city)}
                {renderTooltips(machine.mach_city, `tooltipCity${machine.mach_id}`)}
              </td>
              <td
                data-title={intl.formatMessage({ id: 'connectTable.remark' })}
                id={`tooltipRemark${machine.mach_id}`}
                onClick={() => toggleMachineChecked(machine.mach_id)}
              >
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
        <td colSpan='9'>
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
            <FormattedHTMLMessage tagName='th' id='connectTable.action' />
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
      <ModifyMachineModal
        modifyWay='edit'
        modifyMachine={modifyMachine}
        machineObj={modifyMachineObj}
        isOpen={modifyMachineModalIsOpen}
        toggleModal={toggleModifyMachineModal}
        title='Edit My Gateway'
      />
      <DeleteMachineModal />
    </StyledTableCotainer>
  );
};
export default injectIntl(connectTable);
