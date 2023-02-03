import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "antd";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

import { tokens } from "../../theme";
import Header from "../../components/Header";
import ModalCommon from "../../components/common/ModalCommon";
import General from "../../common/Utils/General";
import HelperFunction from "../../helper/HelperFunction";

const Team = () => {
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

  useEffect(() => {
    dispatch.dataInfo.getManageTeams();
    //eslint-disable-next-line
  }, [dispatch.dataInfo]);

  useEffect(() => {
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
    //eslint-disable-next-line
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
    { field: "id", headerName: "ID" },
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
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  console.log("data.manageTeamsList", data.manageTeamsList);

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />

      <Button
        type="primary"
        onClick={() => setModalData({ ...modalData, isModalOpen: true })}
      >
        Open Modal
      </Button>

      <Box m="40px 0 0 0" height="75vh" sx={HelperFunction.TableStyles(colors)}>
        <DataGrid
          checkboxSelection
          rows={data.manageTeamsList}
          columns={columns}
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

export default Team;
