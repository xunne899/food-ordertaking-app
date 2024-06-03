import {
  ArrayInput,
  BooleanInput,
  ChipField,
  Create,
  Datagrid,
  DateField,
  Edit,
  ImageField,
  ImageInput,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  ResourceProps,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput,
  number,
  required,
} from "react-admin";

import { CiBoxList } from "react-icons/ci";

const ItemForm = () => {
  return (
    <SimpleForm sanitizeEmptyValues>
      <ImageInput source="image" label="Related pictures">
        <ImageField source="src" title="title" />
      </ImageInput>
      <ReferenceInput source="category" reference="category">
        <SelectInput optionText="title" validate={[required()]} fullWidth />
      </ReferenceInput>
      <TextInput source="label" validate={[required()]} fullWidth />
      <NumberInput source="price" validate={[required(), number()]} fullWidth />
      <TextInput source="description" fullWidth />
      <ArrayInput source="variants">
        <SimpleFormIterator fullWidth>
          <TextInput source="type" helperText={false} fullWidth />
          <ArrayInput source="choices">
            <SimpleFormIterator inline>
              <TextInput source="label" />
              <NumberInput source="price" defaultValue={0} />
            </SimpleFormIterator>
          </ArrayInput>
          <BooleanInput
            source="allowMultiple"
            label="Allow Multiple"
            helperText={false}
            fullWidth
          />
          <BooleanInput
            source="isRequired"
            label="Is Required"
            helperText={false}
            fullWidth
          />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  );
};
const ItemCreate = () => (
  <Create>
    <ItemForm />
  </Create>
);

const ItemEdit = () => (
  <Edit>
    <ItemForm />
  </Edit>
);

const ItemList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ImageField source="image.src" label="Image" />
      <ReferenceField source="category" reference="category">
        <ChipField source="title" />
      </ReferenceField>
      <TextField source="label" />
      <NumberField source="price" />
      <TextField source="description" />
      <DateField source="createdate" showTime label="Created on" />
      <DateField source="lastupdate" showTime label="Updated on" />
    </Datagrid>
  </List>
);

export const ItemProps: ResourceProps = {
  icon: CiBoxList,
  name: "item",
  list: ItemList,
  create: ItemCreate,
  edit: ItemEdit,
};
