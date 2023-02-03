import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { tokens } from "../../theme";
import Header from "../../components/Header";
import ModalCommon from "../../components/common/ModalCommon";
import General from "../../common/Utils/General";
import HelperFunction from "../../helper/HelperFunction";

console.log("1111111111111111111 Contacts");
const Contacts = () => {
  console.log("222222222222222222 Contacts");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [modalData, setModalData] = useState({
    isModalOpen: false,
    errorCode: "",
    errorTitle: "",
    errorMessage: "",
    mainButton: {
      title: "OK",
    },
    secondaryButton: null,
    sourceSystem: "",
    image: "error",
  });

  const { data, error } = useSelector((state) => state.dataInfo);
  console.log("dataInfo", data);

  useEffect(() => {
    console.log("444444444444444444444 Contacts");
    dispatch.dataInfo.getContactInformation({});
  }, [dispatch.dataInfo]);

  useEffect(() => {
    console.log("useEffect 1");
    if (error.code !== undefined) {
      setModalData({
        ...modalData,
        isModalOpen: true,
        errorCode: error.code,
        errorTitle: error.message,
        errorMessage: General.error.title.ERROR_CODE_GENERAL_NETWORK,
        secondaryButton: {
          title: "Try Again",
          onClick: closeModalBackTo(),
        },
      });
    }
    // eslint-disable-next-line
  }, [error.code]);

  const closeModalBackTo = useCallback(
    (type, exact = false) =>
      () => {
        setModalData({
          ...modalData,
          isModalOpen: false,
        });

        switch (type) {
          case "login":
            setTimeout(() => {
              window.location = "/login";
            }, 500);
            break;

          default:
            window.location.reload();
        }
      },
    [modalData]
  );

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      {console.log("3333333333333333333 Contacts")}
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box m="40px 0 0 0" height="75vh" sx={HelperFunction.TableStyles(colors)}>
        <DataGrid
          rows={data.contactInformation}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      <ModalCommon
        title={modalData.errorTitle}
        errorMessage={
          modalData.sourceSystem
            ? `${modalData.sourceSystem} : ${modalData.errorCode}`
            : modalData.errorCode ?? ""
        }
        description={modalData.errorMessage}
        image={modalData.image}
        isModalOpen={modalData.isModalOpen}
        mainButton={{
          title: modalData.title,
          onClick: () => setModalData({ ...modalData, isModalOpen: false }),
        }}
        secondaryButton={modalData.secondaryButton}
        handleCancel={() => setModalData({ ...modalData, isModalOpen: false })}
      />
    </Box>
  );
};

export default Contacts;
