import { UPDATE_TREE, SET_ROOT_NODE } from "../actions/tree-actions";

// the treeReducer returns the updatedTree based on the last updatedTree he got from the updateTree action
export default function treeReducer(state, { type, payload }) {
	switch (type) {
		case SET_ROOT_NODE:
			console.log("set_root_node", payload);
			return {
				tree: payload.rootNode,
			};
		// case SET_NODE_CHILDREN:
		case UPDATE_TREE:
			console.log("tree-reducer UPDATE_TREE PAYLOAD", payload);
			return {
				tree: payload.updatedTree,
			};
		default:
			return state;
	}
}
