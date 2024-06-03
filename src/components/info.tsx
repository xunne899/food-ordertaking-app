import { Card, CardContent } from "@mui/material";
import {
  CheckboxGroupInput,
  SimpleForm,
  TextInput,
  TimeInput,
  useNotify,
} from "react-admin";
import { PAYMENT_METHODS } from "../utils/constants";
import { db } from "../utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const Info = () => {
  const notify = useNotify();
  const restaurantRef = doc(db, "restaurant", "info");
  const [defaultValues, setDefaultValues] = useState<any>();

  const handleSubmit = async (data: any) => {
    await setDoc(restaurantRef, data);
    notify(`Restaurant information updated`, { type: "success" });
  };

  const fetchData = async () => {
    const snapshot = await getDoc(restaurantRef);
    setDefaultValues(snapshot.data() || {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   if (!defaultValues) return null;

  return (
    <Card>
      <SimpleForm
        defaultValues={{
          ...defaultValues,
          openingTime: defaultValues?.openingTime?.toDate() ?? null,
          closingTime: defaultValues?.closingTime?.toDate() ?? null,
        }}
        sanitizeEmptyValues
        onSubmit={handleSubmit}
      >
        <TextInput source="name" />
        <TextInput source="address" />
        <TextInput source="phone" />
        <TimeInput source="openingTime" />
        <TimeInput source="closingTime" />
        <CheckboxGroupInput source="paymentMethods" choices={PAYMENT_METHODS} />
      </SimpleForm>
    </Card>
  );
};
