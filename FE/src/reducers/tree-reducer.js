import { UPDATE_TREE, SET_ROOT_NODE } from "../actions/tree-actions";

// the treeReducer returns the updatedTree 
// based on the last updatedTree he got from the updateTree action
export default function treeReducer(state, { type, payload }) {
	switch (type) {
		case SET_ROOT_NODE:
			return {
				tree: payload.rootNode,
			};
		case UPDATE_TREE:
			return {
				tree: payload.updatedTree,
			};
		default:
			return state;
	}
}
