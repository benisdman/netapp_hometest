import fetch from "cross-fetch";

export const UPDATE_TREE = "updateTree";
export const SET_ROOT_NODE = "setRootNode";

export function fetchRootNode() {
	return function(dispatch) {
		return fetch("http://127.0.0.1:5000/1/node")
			.then(res => res.json())
			.then(rootNode => {
				dispatch(setRootNode(rootNode));
			});
	};
}

function setRootNode(rootNode) {
	return {
		type: SET_ROOT_NODE,
		payload: {
			rootNode,
		},
	};
}

// this action passes the updated tree to the tree-reducer
export function updateTree(updatedTree) {
	return {
		type: UPDATE_TREE,
		payload: {
			updatedTree: updatedTree,
		},
	};
}
