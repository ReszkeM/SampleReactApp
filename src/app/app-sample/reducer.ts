export default (state = {}, action: any) => {
  switch (action.type) {
    case 'SIMPLE_ACTION':
      return {
        message: action.payload.message
      };

    default:
      return state;
  }
};
