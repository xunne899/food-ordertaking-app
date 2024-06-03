import * as admin from "firebase-admin";
import {HttpsError, onCall} from "firebase-functions/v2/https";

import {createTransport} from "nodemailer";
import {
  calculateOrderTotal,
  calculateOrderSubTotal,
} from "./utils/calculations";

admin.initializeApp();
const transport = createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1a803337e581e8",
    pass: "12aceabd18aa43",
  },
});

export const placeorder = onCall(async (request) => {
  if (!request.auth) {
    return new HttpsError("failed-precondition", "You are not authorized");
  }
  const firestore = admin.firestore();
  const lines = request.data.lines;

  const draft = {
    ...request.data,
    status: "pending",
    createdBy: request.auth.uid,
    total: calculateOrderTotal(lines, 13),
    subTotal: calculateOrderSubTotal(lines),
    pickupTime: admin.firestore.FieldValue.serverTimestamp(),
    createAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  const order = await firestore.collection("order").add(draft);
  const email = request.data.email;

  const restaurantDoc = await firestore.doc("restaurant/info").get();
  const restaurant = restaurantDoc.data();
  if (restaurant) {
    transport.sendMail({
      to: email,
      subject: `${restaurant.name} - Order: ${order.id}`,
      html: `
        <div>
          <h1>Hi ${draft.firstName}, your order is confirmed.</h1>
          <h2>Restraunt address</h2>
          <p>${restaurant.name}</p>
          <p>${restaurant.address}</p>
          <h2>Order details</h2>
          <ul>
            ${draft.lines.map((line: any) => `
              <li>
              <h3>${line.quantity}x ${line.label}: 
              $${line.price.toFixed(2)}</h3>
              <ul>
                ${line.value.map((value: any) => `
                  <li>
                    ${value.variant}: 
                    ${value.value} - $${value.price.toFixed(2)}
                  </li>
                `).join("")}
              </ul>
            `).join("")}
            </li>
          </ul>
          <p>Sub-total: $${draft.subTotal.toFixed(2)}</p>
          <p>Total: $${draft.total.toFixed(2)}</p>
          <h4>If you need help with anything else, 
          do not hesitate to contact us at ${restaurant.phone} immediately.</h4>
        </div>
      `,
    });
  }
  return {id: (await order).id, order: draft};
});
