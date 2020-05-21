import { Modal } from 'antd';
import intl from 'react-intl-universal';

export const showDeleteConfirm = (deleteTask, toggleDeleteModal) => {
  Modal.confirm({
    title: intl.get('DELETE_CONFIRM_MSG'),
    okText: intl.get('YES'),
    okType: 'danger',
    cancelText: intl.get('NO'),
    className: 'delete-modal',
    onOk() {
      deleteTask();
    },
    onCancel() {
      toggleDeleteModal();
    }
  });
};
