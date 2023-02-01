const statusColorReducer = (state = "", action) => {
  switch (action.type) {
    case "INPROGRESS":
      return "bg-yellow-300 text-white";
    case "ASSIGN":
      return "bg-blue-300 text-white";
    case "REJECTED":
      return "bg-rose-500 text-white";
    case "ONHOLD":
      return "bg-slate-600 text-white";
    case "COMPLETED":
      return "bg-green-500 text-white";
    default:
      return state;
  }
};

export default statusColorReducer;
