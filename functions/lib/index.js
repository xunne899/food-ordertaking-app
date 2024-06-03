"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeorder = void 0;
const admin = require("firebase-admin");
const https_1 = require("firebase-functions/v2/https");
const nodemailer_1 = require("nodemailer");
const calculations_1 = require("./utils/calculations");
admin.initializeApp();
const transport = (0, nodemailer_1.createTransport)({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "1a803337e581e8",
        pass: "12aceabd18aa43",
    },
});
exports.placeorder = (0, https_1.onCall)(async (request) => {
    if (!request.auth) {
        return new https_1.HttpsError("failed-precondition", "You are not authorized");
    }
    const firestore = admin.firestore();
    const lines = request.data.lines;
    const draft = Object.assign(Object.assign({}, request.data), { status: "pending", createdBy: request.auth.uid, total: (0, calculations_1.calculateOrderTotal)(lines, 13), subTotal: (0, calculations_1.calculateOrderSubTotal)(lines), pickupTime: admin.firestore.FieldValue.serverTimestamp(), createAt: admin.firestore.FieldValue.serverTimestamp() });
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
            ${draft.lines.map((line) => `
              <li>
              <h3>${line.quantity}x ${line.label}: 
              $${line.price.toFixed(2)}</h3>
              <ul>
                ${line.value.map((value) => `
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
    return { id: (await order).id, order: draft };
});
//# sourceMappingURL=index.js.map