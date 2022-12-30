
export const getTypes = () => async (dispatch) => {
    await fetch("http://localhost:3001/type")
    .then(response => response.json())
    .then(data => {
        dispatch({ type: "LIST_TYPE", payload: data });
    });
}
