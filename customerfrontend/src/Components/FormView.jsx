import React, { useEffect } from "react";
import { Form, Input, Select, Card, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import {
  addNewCustomerAPI,
  getCustomerDetailsAPI,
  updateCustomerAPI,
} from "../API/API";
import { NOTIFICATION_MESSAGES, notifications } from "../Utils/Notifications";

const { Option } = Select;

function FormView() {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const formRef = React.createRef();

  useEffect(() => {
    if (id) {
      getCustomerDetails(id);
    }
  }, []);

  function onFinish(values) {
    if (id) {
      updateCustomerAPI(id, values)
        .then((res) => {
          if (res.ok) {
            notifications("info", "Info", NOTIFICATION_MESSAGES.UPDATE_SUCCESS);
            navigate("/");
          }
        })
        .catch((error) => {
          notifications("error", "Error", NOTIFICATION_MESSAGES.UPDATE_ERROR);
        });
    } else {
      addNewCustomerAPI(values)
        .then((res) => {
          if (res.ok) {
            notifications("info", "Info", NOTIFICATION_MESSAGES.ADD_SUCCESS);
            formRef.current.resetFields();
          }
        })
        .catch((error) => {
          notifications("error", "Error", NOTIFICATION_MESSAGES.ADD_ERROR);
        });
    }
  }

  function onFinishFailed(e) {
    e.errorFields.forEach((each) => {
      notifications("error", "Form", each.errors[0]);
    });
  }

  function getCustomerDetails(id) {
    getCustomerDetailsAPI(id)
      .then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            if (result.length > 0) {
              const data = result[0];
              Object.keys(data).forEach((field) => {
                formRef.current.setFieldValue(field, data[field]);
              });
            }
          });
        }
      })
      .catch((error) => {
        notifications(
          "error",
          "Error",
          NOTIFICATION_MESSAGES.GET_CUSTOMER_ERROR
        );
      });
  }

  return (
    <section className="formview">
      <div className="formview__main_form">
        <Card title="Customer Details" bordered={true} hoverable={true}>
          <Form
            layout="vertical"
            ref={formRef}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Customer Name"
              name="customer_name"
              rules={[
                { required: true, message: "Please input customer name" },
              ]}
            >
              <Input placeholder="Customer Name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input email" }]}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>

            <Form.Item
              label="Contact Details"
              name="contact_details"
              rules={[
                { required: true, message: "Please input contact details" },
              ]}
            >
              <Input placeholder="Contact Details" />
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please input status" }]}
            >
              <Select placeholder="Select status">
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>

            <Form.Item required={false}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="ghost" htmlType="reset">
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </section>
  );
}

export default FormView;
