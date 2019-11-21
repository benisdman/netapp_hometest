import fetch from "cross-fetch";

export const UPDATE_TREE = "updateTree";
export const SET_ROOT_NODE = "setRootNode";
// export const SET_NODE_CHILDREN = "setNodeChildren";

export function fetchRootNode() {
	console.log("fetchRootNode");
	return function(dispatch) {
		console.log("dispatch");
		return fetch("http://127.0.0.1:5000/1/node")
			.then(res => res.json())
			.then(rootNode => {
				console.log("rootNode", rootNode);
				dispatch(setRootNode(rootNode));
			});
	};
}

// export function fetchNodeChildren(nodeId) {
// 	return function(dispatch) {
// 		return fetch(`http://127.0.0.1:5000/${nodeId}/children`)
// 			.then(res => res.json())
// 			.then(children => {
// 				dispatch()
// 			})
// 	}
// }

// export function setNodeChildren(children) {
// 	return {
// 		type: SET_NODE_CHILDREN,
// 		payload: {
// 			children
// 		}
// 	}
// }

export function setRootNode(rootNode) {
	return {
		type: SET_ROOT_NODE,
		payload: {
			rootNode,
		},
	};
}

// this action passes the updated tree to the tree-reducer
export function updateTree(updatedTree) {
	console.log("tree-actions.js --- updateTree", updatedTree);
	return {
		type: UPDATE_TREE,
		payload: {
			updatedTree: updatedTree,
		},
	};
}
