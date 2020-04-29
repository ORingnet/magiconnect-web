import React, { Fragment, useState } from 'react';
import FuncBox from '../FuncBox';
import deleteIcon from '../../../../../assets/img/myConnect/delete.png';
import DeleteModal from '../../../../../components/DeleteModal';
const DeleteAction = ({ ischecked, machineObj, deleteMachine }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    await deleteMachine(machineObj.mach_id);
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <Fragment>
      <FuncBox
        Icon={deleteIcon}
        formattedMessage='myConnect.header.delete'
        clickEvent={handleToggleModal}
        ischecked={ischecked}
      />
      <DeleteModal
        isOpen={isOpen}
        toggle={handleToggleModal}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        name={machineObj.mach_name}
      />
    </Fragment>
  );
};

export default DeleteAction;
