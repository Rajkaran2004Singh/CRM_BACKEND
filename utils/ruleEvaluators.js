export const evaluateCondition = (customer, condition) => {
  const { field, operator, value } = condition;
  const fieldValue = customer[field];

  switch (operator) {
    case ">":
      return fieldValue > value;
    case "<":
      return fieldValue < value;
    case "=":
      return fieldValue == value;
    case "!=":
      return fieldValue != value;
    case ">=":
      return fieldValue >= value;
    case "<=":
      return fieldValue <= value;
    case "daysAgo":
      if (!fieldValue) return false;
      const days = parseInt(value, 10);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      return new Date(fieldValue) <= cutoff;
    default:
      return false;
  }
};

export const evaluateRules = (customer, rule) => {
  if (rule.conditions) {
    const results = rule.conditions.map(cond => evaluateRules(customer, cond));

    if (rule.logic === "AND") {
      return results.every(Boolean);
    }
    else if (rule.logic === "OR") {
      return results.some(Boolean);
    }
  }
  else {
    return evaluateCondition(customer, rule);
  }
};
