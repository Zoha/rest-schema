module.exports = {
  validations: {
    required: "{key} is required",
    min: "{key} should be more than {args}",
    minLength: "{key} should have more than {args} characters",
    max: "{key} should be less than {args}",
    maxLength: "{key} should have less than {args} characters",
    between: "{key} value should be between {args[0]} and {args[1]}",
    betweenLength:
      "{key} characters length should be between {args[0]},{args[1]}",
    enum: "{key} value is not a valid items",
    default: "{key} is invalid",
    match: "{key} is not matched"
  },
  idPramNotFound: ":id param not exists in request",
  resourceNotFound: "resource not found"
};
