import React from "react";
import { Node } from "./node";

export const NodeTree = ({ tree, onChange }) => {
	// this 2 methods create updated tree based on the node that was clicked
	let updatedTree = [];

	// handleNodeClicked handles the click on a specific node,
	// it updates the updatedTree and pass the updated tree forward to the next parent, calling the onChange function
	const handleNodeClicked = async (node, index) => {
		console.log("handleNodeClicked", node);
		if (!node.children || node.children.length === 0) {
			const children = await fetchNodeChildren(node.id);
			node.children = children;
		}

		node.isOpen = !node.isOpen;
		updatedTree[index] = node;

		onChange(updatedTree);
	};

	// handleSubNodesClicked only handles sub nodes that were clicked,
	// it adds the parent node to the updated tree and pass the updated tree to the next parent calling the onChange function
	const handleSubNodesClicked = parentNode => {
		console.log("handleSubNodesClicked", parentNode);
		updatedTree[0] = parentNode;
		onChange(updatedTree);
	};

	function fetchNodeChildren(nodeId) {
		console.log("fetchNodeChildren");
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
