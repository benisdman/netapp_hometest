import React from "react";
import { Node } from "./node";

export const NodeTree = ({ tree, onChange }) => {
	let updatedTree = [];

	// handleNodeClicked handles the click on a specific node,
	// it updates the updatedTree and pass the updated tree
	// to the next onChange function
	const handleNodeClicked = async (node, index) => {
		// fetching node's children if not already exist
		if (!node.children || node.children.length === 0) {
			const children = await fetchNodeChildren(node.id);
			node.children = children;
		}

		// toggles the node isOpen
		node.isOpen = !node.isOpen;
		// updates the tree
		updatedTree[index] = node;
		// pass it to next onChange function
		onChange(updatedTree);
	};

	// if the clicked node is a non-root node,
	// the handleNodeClicked will pass it to this function, via the onChange function
	// this function updates the tree by the parent node,
	// and pass it over untill it gets to the onChange function on a root node 
	const handleSubNodesClicked = parentNode => {
		updatedTree[0] = parentNode;
		onChange(updatedTree);
	};

	// used in handleNodeClicked to fetch node's children from API
	function fetchNodeChildren(nodeId) {
		return fetch(`http://127.0.0.1:5000/${nodeId}/children`).then(res =>
			res.json()
		);
	}

	return (
		<div>
			<ul>
				{tree.map((node, index) => (
					<li key={index}>
						<Node
							node={node}
							index={index}
							onChange={(node, index) => handleNodeClicked(node, index)}
						></Node>
						{/* Base Case */}
						{node.children.length > 0 && node.isOpen && (
							<NodeTree
								tree={node.children}
								onChange={() => handleSubNodesClicked(node)}
							></NodeTree>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};
