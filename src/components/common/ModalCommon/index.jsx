import React, { useState } from "react";
import { Button, Modal, Spin } from "antd";
import Icon from "@ant-design/icons";
import "./modalClick.css";

const baseURL = `${process.env.REACT_APP_IMAGES}/pop_up/`;
const imageListDialog = {
  error: baseURL + "error-dialog.svg",
  refresh: baseURL + "refresh-dialog.svg",
  success: baseURL + "success-dialog.svg",
  blank: baseURL + "Blank Illustration.svg",
  noData: baseURL + "No Products Dialog.svg",
  timeout: baseURL + "Timeout Illustration.svg",
  loading: baseURL + "octo_loading.gif",
  deleteConfirmationDialog: baseURL + "delete-confirmation-dialog.svg",
  submited: baseURL + "submitedIllustration.svg",
  rejected: baseURL + "rejectedIllustration.svg",
  sent: baseURL + "SentIllustration.svg",
  edit: baseURL + "EditIllustration.svg",
  share: baseURL + "share-dialog.svg",
};

const ModalCommon = (props) => {
  const {
    isModalOpen,
    handleOk,
    handleCancel,
    description,
    mainButton,
    title,
    secondaryButton,
    errorMessage,
    showIcon = true,
    image,
  } = props;
  const [loading, setLoading] = useState(true);

  return (
    <div className={"click-modal-container"}>
      <Modal
        zIndex={9999}
        closable={false}
        centered
        width={500}
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {showIcon && (
          <Spin
            spinning={loading}
            indicator={() => (
              <Icon type="loading" style={{ fontSize: 35 }} spin />
            )}
            size={"large"}
          >
            <img
              className={"click-modal-image"}
              height={220}
              src={imageListDialog[image]}
              alt={"modal-error"}
              onLoad={() => {
                setLoading(false);
              }}
            />
          </Spin>
        )}
        <h4 className={"click-modal-title"}>{title}</h4>
        {errorMessage !== undefined && errorMessage !== null ? (
          <h3 className={"ant-modal-error-message "}>{errorMessage}</h3>
        ) : null}
        {description !== undefined && description !== null ? (
          <p className={"ant-modal-error-description"}>{description}</p>
        ) : null}

        {mainButton !== undefined && mainButton !== null ? (
          <Button
            id="buttonOK"
            style={{
              marginTop: errorMessage || description !== null ? 10 : 80,
              textTransform: "initial",
              fontWeight: "600",
              backgroundColor: "#780000",
            }}
            variant="contained"
            color="primary"
            onClick={mainButton.onClick}
          >
            {"OK"}
          </Button>
        ) : null}

        {secondaryButton ? (
          <Button
            id="BackToCategory"
            style={{
              marginTop: errorMessage || description !== null ? 10 : 80,
              color: "#780000",
              textTransform: "initial",
              fontWeight: "600",
              backgroundColor: "#CECECE",
            }}
            variant="contained"
            onClick={secondaryButton.onClick}
          >
            {secondaryButton.title}
          </Button>
        ) : null}
      </Modal>
    </div>
  );
};

export default ModalCommon;
