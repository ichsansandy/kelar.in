const listUserReducer = (
  state = [
    { id: 1, name: "ichsan sANDy", username: "ichsan@meta.com" },
    { id: 2, name: "Arya stark", username: "aryastark@meta.com" },
    { id: 3, name: "ben beckman", username: "benbeckman@meta.com" },
    { id: 4, name: "Roronoa Zoro", username: "roronoazoro@meta.com" },
    { id: 5, name: "Vasco De Gama", username: "vascodegama@meta.com" },
    { id: 6, name: "Kirigaya Kazuto", username: "kirigayakazuto@meta.com" },
    { id: 7, name: "Oka Widiawan", username: "okawidiawan@meta.com" },
    { id: 8, name: "Hilmi Abdurrohim", username: "hilmiabdurrohim@meta.com" },
    { id: 9, name: "Drow Ranger ", username: "drowranger@meta.com" },
  ],
  action
) => {
  switch (action.type) {
    case "SET_USER_LIST":
      return action.payload;
    case "ADD_USER_LIST":
      return [...state, action.payload];

    default:
      return state;
  }
};

export default listUserReducer;
