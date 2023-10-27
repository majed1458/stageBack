const GetFilter = (filterField, filterValue) => {
  let filter = {};
  if (filterField) {
    if (
      typeof filterValue === "boolean" ||
      filterValue === "true" ||
      filterValue === "false"
    ) {
      // for boolean filter
      filter = { [filterField]: filterValue };
    } else {
      // for Str filter
      let regexValue = filterValue.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      filter = { [filterField]: { $regex: regexValue, $options: "i" } };
    }
  }
  return filter;
};

module.exports = {
  GetFilter,
};
