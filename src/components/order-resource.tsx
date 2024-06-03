import {
  ArrayField,
  ArrayInput,
  BooleanInput,
  ChipField,
  Create,
  Datagrid,
  DateField,
  Edit,
  ImageField,
  ImageInput,
  Labeled,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  ResourceProps,
  RadioButtonGroupInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput,
  number,
  required,
} from "react-admin";

import { CiBoxList } from "react-icons/ci";
import { MdReceipt } from "react-icons/md";
import { ORDER_STATUS } from "../utils/constants";

const OrderForm = () => {
  return (
    <SimpleForm sanitizeEmptyValues>
      <Labeled label="First Name">
        <TextField source="firstName" />
      </Labeled>
      <Labeled label="Last Name">
        <TextField source="lastName" />
      </Labeled>
      <Labeled label="Email">
        <TextField source="email" />
      </Labeled>
      <Labeled label="Phone">
        <TextField source="phone" />
      </Labeled>
      <Labeled label="Comments">
        <TextField source="comments" />
      </Labeled>
      <Labeled label="Total">
        <TextField source="total" />
      </Labeled>
      <ArrayField source="lines">
        <Datagrid bulkActionButtons={false}>
          <TextField source="label" />
          <NumberField
            source="price"
            options={{ style: "currency", currency: "SGD" }}
          />
          <RadioButtonGroupInput choices={ORDER_STATUS} source="status" />
          <TextInput source="reason" />
          <NumberField source="quantity" />
          <TextField source="comments" />
          <ArrayField source="value">
            <Datagrid>
              <TextField source="value" />
              <NumberField
                source="price"
                options={{ style: "currency", currency: "SGD" }}
              />
            </Datagrid>
          </ArrayField>
        </Datagrid>
      </ArrayField>
    </SimpleForm>
  );
};

const OrderEdit = () => (
  <Edit>
    <OrderForm />
  </Edit>
);

const OrderList = () => (
  <List sort={{ field: "pickupTime", order: "DESC" }}>
    <Datagrid
      rowClick="edit"
      bulkActionButtons={false}
      rowStyle={(record) =>
        record.status === "pending"
          ? { backgroundColor: "lightGray" }
          : undefined
      }
    >
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="email" />
      <TextField source="phone" />
      <TextField source="status" />
      <NumberField
        source="total"
        options={{ style: "currency", currency: "SGD" }}
      />
      <DateField source="pickupTime" showTime label="Pickup" />
    </Datagrid>
  </List>
);

export const OrderProps: ResourceProps = {
  icon: MdReceipt,
  name: "order",
  list: OrderList,
  edit: OrderEdit,
};
