const { createContext } = require("react");

const noteContext = createContext();

/**
 * Why context API is used ?
 * 
 * Context API is used to reduce the prop drilling, like passing a prop from parent to child & then to its child, so much complex work
 */

export default noteContext;