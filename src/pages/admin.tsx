import {  AppBar, CustomRoutes, Layout, Admin as RAdmin, RefreshIconButton, Resource } from "react-admin";
import { firebaseConfig } from "../utils/firebase";
import { FirebaseAuthProvider, FirebaseDataProvider, RAFirebaseOptions } from "react-admin-firebase";
import { CategoryProps } from "../components/category-resource";
import { ItemProps } from "../components/item-resource";
import { Route } from "react-router-dom";
import { Info } from "../components/info";
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import { OrderProps } from "../components/order-resource";

const options: RAFirebaseOptions = {
  logging: true,
  persistence: "session",
  lazyLoading: {
    enabled: true,
  },
  watch: ["orders"],
};
const dataProvider = FirebaseDataProvider(firebaseConfig, options);
const authProvider = FirebaseAuthProvider(firebaseConfig, {});

export const MyAppBar = () => (
  <AppBar toolbar={
      <>
    <RefreshIconButton />
    <IconButton href="/admin/info" >
<SettingsIcon  style={{color:"white"}}/>
</IconButton>
      </>
  } />
);

export const MyLayout =(props:any )=> <Layout {...props} appBar={MyAppBar}/>

export const Admin = () => {
  return (
    <RAdmin 
    layout={MyLayout}
    basename="/admin" 
    authProvider={authProvider}
    dataProvider={dataProvider}
    >
      <Resource {...CategoryProps}/>
      <Resource {...ItemProps}/>
      <Resource {...OrderProps}/>
      <CustomRoutes>
            <Route path="/info" element={<Info />} />
        </CustomRoutes>
    </RAdmin>
  );
};
