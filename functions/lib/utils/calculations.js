"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateOrderTotal = exports.calculateOrderTax = exports.calculateOrderSubTotal = exports.calculateItemTotal = void 0;
const calculateItemTotal = (fields, price, quantity) => {
    const totalFields = fields.reduce((acc, field) => acc + field.price, 0);
    return (price + totalFields) * quantity;
};
exports.calculateItemTotal = calculateItemTotal;
const calculateOrderSubTotal = (lines) => lines.reduce((acc, line) => acc + (0, exports.calculateItemTotal)(line.value, line.price, line.quantity), 0);
exports.calculateOrderSubTotal = calculateOrderSubTotal;
const calculateOrderTax = (lines, taxPercentage) => (0, exports.calculateOrderSubTotal)(lines) * (taxPercentage / 100);
exports.calculateOrderTax = calculateOrderTax;
const calculateOrderTotal = (lines, taxPercentage) => (0, exports.calculateOrderSubTotal)(lines) +
    (0, exports.calculateOrderTax)(lines, taxPercentage);
exports.calculateOrderTotal = calculateOrderTotal;
//# sourceMappingURL=calculations.js.map