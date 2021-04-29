module.exports = {
  validations: {
    required: "{key} is required",
    min: "{key} should be more than {args}",
    minLength: "{key} should have more than {args} characters",
    max: "{key} should be less than {args}",
    maxLength: "{key} should have less than {args} characters",
    between: "{key} value should be between {args[0]} and {args[1]}",
    betweenLength: "{key} characters length should be between {args[0]} and {args[1]}",
    enum: "{key} is invalid",
    default: "{key} is invalid",
    match: "{key} is invalid",
    unique: "{key} should be unique, {value} already exists",
    auth: "authorization failed for {key}",
    uniqueItems: "{key} should have unique items",
    requiredUpdate: "{key} is required",
    existsIn: "this {key} does not exists"
  },
  idParamNotFound: "primary key param does not exists in request",
  resourceNotFound: "resource not found",
  validationPassed: "validation passed, request is valid",
  inactiveRouteMessage: "route is inactive",
  listOfErrors: "list of errors"
}
