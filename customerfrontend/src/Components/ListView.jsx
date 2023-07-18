import { useEffect, useState } from "react";
import { Table, Popconfirm, Button, Pagination } from "antd";
import { Link } from "react-router-dom";
import { CheckOutlined, StopOutlined } from "@ant-design/icons";
import { getAllCustomersAPI, deleteCustomerAPI } from "../API/API";
import { NOTIFICATION_MESSAGES, notifications } from "../Utils/Notifications";

const { Column, ColumnGroup } = Table;

function ListView() {
  const [customerList, setCustomerList] = useState({ data: [], total: 0 });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getAllCustomers(page, pageSize);
  }, [page, pageSize]);

  function getAllCustomers(page, pageSize) {
    getAllCustomersAPI(page, pageSize)
      .then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            setCustomerList(result);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        notifications("error", "Error", NOTIFICATION_MESSAGES.GET_LIST_ERROR);
      });
  }

  function deleteCustomer(id) {
    deleteCustomerAPI(id)
      .then((res) => {
        if (res.ok) {
          notifications("info", "Info", NOTIFICATION_MESSAGES.DELETE_SUCCESS);
          getAllCustomers(page, pageSize);
        }
      })
      .catch((error) => {
        console.log(error);
        notifications("error", "Error", NOTIFICATION_MESSAGES.DELETE_ERROR);
      });
  }

  return (
    <section className="listview">
      <div>
        <div className="listview__header_actions">
          <p>Customer Details</p>
          <Button type="primary">
            <Link to="/new">New</Link>
          </Button>
        </div>

        <Table dataSource={customerList.data} size="small" pagination={false}>
          <Column title="Customer ID" dataIndex="_id" key="_id" />
          <Column title="Name" dataIndex="customer_name" key="customer_name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column
            title="Contact Details"
            dataIndex="contact_details"
            key="contact_details"
          />
          <Column
            title="Date Added"
            dataIndex="created_date"
            key="created_date"
          />
          <Column
            title="Status"
            dataIndex="status"
            key="status"
            render={(data) =>
              data.toLowerCase() === "active" ? (
                <CheckOutlined />
              ) : (
                <StopOutlined />
              )
            }
          />
          <ColumnGroup title="Actions">
            <Column
              title="Delete"
              dataIndex="_id"
              key="_id"
              render={(data) => (
                <Popconfirm
                  title="Delete customer"
                  description={NOTIFICATION_MESSAGES.DELETE_CONFIRMATION}
                  onConfirm={() => deleteCustomer(data)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
              )}
            />

            <Column
              title="Update"
              dataIndex="_id"
              key="_id"
              render={(data) => (
                <Button>
                  <Link to={"/update/" + data}>Update</Link>
                </Button>
              )}
            />
          </ColumnGroup>
        </Table>

        <br />
        <Pagination
          showSizeChanger
          defaultCurrent={1}
          onChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
          onShowSizeChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
          total={customerList.total}
        />
      </div>
    </section>
  );
}

export default ListView;
