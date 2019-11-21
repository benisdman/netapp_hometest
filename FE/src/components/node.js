import React from "react";
export const Node = ({ node, index, onChange }) => {
	return <div onClick={() => onChange(node, index)}>{node.name}</div>;
};
