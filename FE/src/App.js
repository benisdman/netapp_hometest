import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { connect } from "react-redux";
import { updateTree, setRootNode } from "./actions/tree-actions";

import { fetchRootNode } from "./actions/tree-actions";

import { NodeTree } from "./components/node-tree";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.onUpdateTree = this.onUpdateTree.bind(this);
		this.onFetchRootNode = this.onFetchRootNode.bind(this);
		// this.onFetchNodeChildren = this.onFetchNodeChildren.bind(this);
		console.log("props", props);
		props.onFetchRootNode();
	}

	// a method for calling the updateTree action
	onUpdateTree(updatedTree) {
		console.log("onUpdateTree", updatedTree);
		this.props.onUpdateTree(updatedTree);
	}

	onFetchRootNode() {
		this.props.onFetchRootNode();
	}

	// onFetchNodeChildren() {
	// 	this.props.onFetchNodeChildren();
	// }

	render() {
		return (
			<div>
				{/* NodeTree is the recursive component represnting the nodes tree */}
				<NodeTree
					tree={this.props.tree}
					onChange={updatedTree => this.onUpdateTree(updatedTree)}
					// onFetchNodeChildren={this.onFetchNodeChildren}
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
	// onFetchNodeChildren: fetchNodeChildren,
};

export default connect(mapStateToProps, mapActionsToProps)(App);
