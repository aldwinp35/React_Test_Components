import budgets from "./budgets";

async function getAll() {
  return {
    status: 200,
    data: {
      results: budgets
    }
  };
}

const budgetService = {
  getAll
};

export default budgetService;
