const budgets = [
  {
    id: 1,
    name: "Food",
    items: [
      {
        id: 2,
        amount: 300,
        spent: 260,
        difference: 40,
        date: "2023-02-01",
        category: 2,
        name: "Restaurants",
        created_at: "2023-02-08T16:32:10.593612-05:00",
        updated_at: "2023-02-08T16:32:10.593612-05:00"
      },
      {
        id: 3,
        amount: 900,
        spent: 400,
        difference: 500,
        date: "2023-02-01",
        category: 1,
        name: "Groceries",
        created_at: "2023-02-10T08:08:42.202496-05:00",
        updated_at: "2023-02-10T08:12:37.651379-05:00"
      }
    ]
  },
  {
    id: 42,
    name: "Gas",
    items: []
  },
  {
    id: 52,
    name: "Housing",
    items: []
  },
  {
    id: 55,
    name: "Rent",
    items: []
  },
  {
    id: 54,
    name: "Transportation",
    items: []
  }
];

export default budgets;
