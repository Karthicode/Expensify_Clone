export const uploadImageToStorage = (state, action) => {
  console.log(action);
  return {
    ...state,
    uploadedImage: action.image,
  };
};
