import {
  Create,
  Datagrid,
  DateField,
  Edit,
  ImageField,
  ImageInput,
  List,
  ResourceProps,
  SimpleForm,
  TextField,
  TextInput,
  required,
} from "react-admin";

import { MdOutlineCategory } from "react-icons/md";


const CategoryForm = () => {
  return (
    <SimpleForm sanitizeEmptyValues>
      <ImageInput source="image" label="Related pictures">
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput source="title" validate={[required()]} fullWidth />
      <TextInput source="description" fullWidth />
    </SimpleForm>
  );
};
const CategoryCreate = () => (
  <Create>
    <CategoryForm />
  </Create>
);

const CategoryEdit = () => (
  <Edit>
    <CategoryForm />
  </Edit>
);

const CategoryList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ImageField source="image.src" label="Image" />
      <TextField source="title" />
      <TextField source="description" />
      <DateField source="createdate" showTime label="Created on" />
      <DateField source="lastupdate" showTime label="Updated on" />
    </Datagrid>
  </List>
);

export const CategoryProps: ResourceProps = {
  icon:MdOutlineCategory,
  name: "category",
  list: CategoryList,
  create: CategoryCreate,
  edit: CategoryEdit,
};
