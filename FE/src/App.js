import React from "react";
import "./App.css";

import { connect } from "react-redux";

import { updateTree } from "./actions/tree-actions";
import { fetchRootNode } from "./actions/tree-actions";

import { NodeTree } from "./components/node-tree";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.onUpdateTree = this.onUpdateTree.bind(this);
		this.onFetchRootNode = this.onFetchRootNode.bind(this);
		// fetching the root node
		props.onFetchRootNode();
	}

	// a method for calling the updateTree action
	onUpdateTree(updatedTree) {
		this.props.onUpdateTree(updatedTree);
	}

	// a method for calling the fetchRootNode action
	onFetchRootNode() {
		this.props.onFetchRootNode();
	}

	render() {
		return (
			<div>
				{/* NodeTree is the recursive component represnting the nodes tree */}
				<NodeTree
					tree={this.props.tree}
					// last onChange function in the recursion 
					// is calling the onUpdateTree action with the updated tree
					onChange={updatedTree => this.onUpdateTree(updatedTree)}
				></NodeTree>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return state;
};

const mapActionsToProps = {
	onUpdateTree: updateTree,
	onFetchRootNode: fetchRootNode,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
