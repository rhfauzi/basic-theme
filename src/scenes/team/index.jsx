import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "antd";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useDispatch, useSelector } from "react-redux";

import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import ModalCommon from "../../components/common/ModalCommon";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [modalData, setModalData] = useState({
    isModalOpen: false,
    errorCode: "CLICKS 0020",
    errorTitle: "error.title.general.network",
    errorMessage: "error.message.general.network",
    mainButton: {
      title: "OK",
    },
    secondaryButton: null,
    sourceSystem: "",
    image: "error",
  });

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

  const dataInfo = useSelector((state) => state.dataInfo);
  console.log("dataInfo", dataInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch.dataInfo.getManageTeams({});
    } catch (error) {
      console.log("1111111111111111111 error", error);
    }
  }, [dispatch.dataInfo]);

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />

      <Button
        type="primary"
        onClick={() => setModalData({ ...modalData, isModalOpen: true })}
      >
        Open Modal
      </Button>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
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
