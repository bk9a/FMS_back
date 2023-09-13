import { configureStore } from "@reduxjs/toolkit";

import users from "./reducers/users";
import system from "./reducers/system";
import companyIndustry from "./reducers/companyIndustry";
import employeePosition from "./reducers/employeePosition";
import interactionType from "./reducers/interactionType";
import challengerCompany from "./reducers/challengerCompany";
import productList from "./reducers/productList";
import opportunityLostReason from "./reducers/opportunityLostReason";
import riskList from "./reducers/riskList";
import contact from "./reducers/contact";
import salesPlan from "./reducers/salesPlan";
import opportunity from "./reducers/opportunity";
import interaction from "./reducers/interaction";
import opportunityOwner from "./reducers/opportunityOwner";
import opportunityDetail from "./reducers/opportunityDetail";
import opportunityProduct from "./reducers/opportunityProduct";
import employee from "./reducers/employee";

// import logger from './middleware/logger';

// import { Iterable } from "immutable";

// const isSerializable = (value) => Iterable.isIterable(value) || isPlain(value);

// const getEntries = (value) =>
//   Iterable.isIterable(value) ? value.entries() : Object.entries(value);

// const serializableMiddleware = createSerializableStateInvariantMiddleware({
//   isSerializable,
//   getEntries,
// });

export default configureStore({
  reducer: {
    contact,
    users,
    system,
    companyIndustry,
    employeePosition,
    interactionType,
    challengerCompany,
    productList,
    opportunityLostReason,
    riskList,
    salesPlan,
    opportunity,
    interaction,
    opportunityOwner,
    opportunityDetail,
    opportunityProduct,
    employee,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
