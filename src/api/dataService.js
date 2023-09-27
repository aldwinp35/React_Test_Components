import { data } from "./data";

async function getAll() {
  return {
    status: 200,
    data: {
      results: data
    }
  };
}

const dataService = {
  getAll
};

export default dataService;
