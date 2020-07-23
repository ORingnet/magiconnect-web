import React, { Fragment, useState } from 'react';
import deleteIcon from 'assets/img/myConnect/delete.png';
import FuncBox from '../FuncBox';
import DeleteModal from 'components/DeleteModal';
const DeleteDeviceModal = ({ machId, device, deleteDevice }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await deleteDevice(machId, device.device_id);
    setIsLoading(false);
    setIsOpen(false);
  };

  const renderModal = () => {
    if (device) {
      return (
        <DeleteModal
          isOpen={isOpen}
          toggle={handleToggleModal}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          name={device.device_name}
        />
      );
    }
  };
  return (
    <Fragment>
      <FuncBox
        onclick={handleToggleModal}
        ischecked={device ? true : false}
        icon={deleteIcon}
        tooltipMsg={'Delete'}
        tooltipId={'Delete'}
      />
      {renderModal()}
    </Fragment>
  );
};

export default DeleteDeviceModal;
