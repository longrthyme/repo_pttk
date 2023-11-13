import DataContext from "@/context/DataContext";
import AdminLayout from "@/layouts/AdminLayout";
import { LoadingOutlined } from "@ant-design/icons";
import { Breadcrumb, Input, Spin, Table } from "antd";
import moment from "moment/moment";
import { useRouter } from "next/router";
import { useContext, useEffect, Fragment, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSession } from "next-auth/react";
import SpinTip from "@/components/loading/SpinTip";
export default function Import() {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const { imports, getImports } = useContext(DataContext);

  const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

  const router = useRouter();

  const Search = Input.Search;

  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [selectedImport, setSelectedImport] = useState();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/account/login");
    },
  });
  const token = session?.accessToken;

  useEffect(() => {
    if (token) {
      getImports();
    }
  }, [token]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getImports();
  }, [session]);

  const Importcolumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return <h6>{record.product.name}</h6>;
      },
      width: 150,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",

      width: 150,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",

      width: 150,
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sortOrder: "ascend",
      sorter: (a, b) => {
        return a.id - b.id > 0 ? 1 : -1;
      },
    },
    {
      title: "Date",
      dataIndex: "import_Date",
      key: "import_Date",
      responsive: ["lg"],
      render: (_, record) => {
        return <h6>{moment(record.import_Date).format("LLLL")}</h6>;
      },
    },
    {
      title: "Total price",
      dataIndex: "",
      key: "",
      responsive: ["lg"],
      render: (_, record) => {
        const total = record.importDetails.reduce((sum, detail) => {
          return sum + detail.quantity * detail.price;
        }, 0.0);
        return <h6>$ {total}</h6>;
      },
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      responsive: ["sm"],
    },

    {
      title: "Action",
      responsive: ["sm"],
      render: (_, record) => (
        <div className="flex items-center">
          <BiSolidEdit
            id="modal-1"
            onClick={() => {
              setOpen(true);
              setSelectedImport(record);
            }}
            className="text-xl hover:cursor-pointer hover:text-red-700"
          />
        </div>
      ),
    },
  ];

  if (status === "loading") {
    return <SpinTip />;
  } else
    return (
      <Fragment>
        {isLoading ? (
          <Spin
            indicator={antIcon}
            className="flex justify-center align-center items-center w-screen h-screen"
          />
        ) : (
          <div className="p-10">
            <div className="mb-4">
              <Breadcrumb
                className="mb-8"
                items={[
                  {
                    title: <a href="/admin/dashboard">Admin</a>,
                  },
                  {
                    title: <a href="/admin/users">Import</a>,
                  },
                ]}
              />
              <div className="flex justify-between items-center">
                <Search
                  placeholder="find your product based name/ category name"
                  enterButton="Search"
                  size="large"
                  className="w-2/3"
                />

                <div className="flex">
                  <button
                    className="text-white bg-primary-500 hover:bg-pimary-600 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
                    onClick={() => router.push("/admin/import-manage/add")}
                  >
                    <svg
                      className="-ml-1 mr-2 h-6 w-6 text-white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"></path>
                    </svg>
                    New import
                  </button>
                </div>
              </div>
            </div>
            {imports ? (
              <Table
                columns={columns}
                dataSource={imports}
                pagination={{
                  pageSizeOptions: ["50", "100"],
                  showSizeChanger: true,
                  pageSize: 6,
                }}
                rowKey={(record) => record.id}
              />
            ) : (
              <SpinTip />
            )}
          </div>
        )}

        {open ? (
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            className="p-16"
            open={open}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Detail import
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <div className="flex justify-between mb-4">
                <h6>
                  Import date :{" "}
                  {moment(selectedImport.import_Date).format("lll")}
                </h6>

                <h6>
                  <i>By: {selectedImport.account.username} </i>
                </h6>
              </div>

              <Table
                columns={Importcolumns}
                pagination={{
                  hideOnSinglePage: true,
                }}
                dataSource={selectedImport.importDetails}
              />
            </DialogContent>
          </BootstrapDialog>
        ) : (
          ""
        )}
      </Fragment>
    );
}

Import.getLayout = (page) => <AdminLayout children={page} />;
