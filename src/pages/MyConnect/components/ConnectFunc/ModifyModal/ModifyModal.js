import React, { useState } from 'react';
import FuncBox from '../FuncBox';
import modifyIcon from '../../../../../assets/img/myConnect/modify.png';
import ModifyMachineModal from '../../../../../components/ModifyMachineModal';

const ModifyModal = ({ ischecked, machineObj, modifyMachine }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleModal = () => {
    setIsOpen(state => !state);
  };
  return (
    <div>
      <FuncBox
        Icon={modifyIcon}
        formattedMessage='myConnect.header.modify'
        clickEvent={handleToggleModal}
        ischecked={ischecked}
      />
      <ModifyMachineModal
        modifyWay='edit'
        modifyMachine={modifyMachine}
        machineObj={machineObj}
        isOpen={isOpen}
        toogleModal={handleToggleModal}
        title='Edit My Connect'
      />
    </div>
  );
};

export default ModifyModal;
