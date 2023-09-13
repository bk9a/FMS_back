export default (store) => (next) => (action) => {
  console.log("Action:", action);
  // console.log("Before state:", store.getState());
  const result = next(action);
  // console.log("After state:", store.getState());
  return result;
};
