import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import treeReducer from "./reducers/tree-reducer";

// const tree = [
// 	{
// 		id: 1,
// 		name: "winterfell",
// 		isOpen: false,
// 		children: [
// 			{
// 				id: 2,
// 				name: "computers",
// 				isOpen: false,
// 				children: [
// 					{
// 						id: 6,
// 						name: "Bach",
// 						isOpen: false,
// 						children: [],
// 					},
// 					{
// 						id: 7,
// 						name: "Mozart",
// 						isOpen: false,
// 						children: [
// 							{
// 								id: 8,
// 								name: "Beethoven",
// 								isOpen: false,
// 								children: [],
// 							},
// 						],
// 					},
// 				],
// 			},
// 			{
// 				id: 3,
// 				name: "Domain Controllers",
// 				isOpen: false,
// 				children: [],
// 			},
// 			{
// 				id: 4,
// 				name: "TheWall",
// 				isOpen: false,
// 				children: [
// 					{
// 						id: 5,
// 						name: "Kylo-Ou",
// 						isOpen: false,
// 						children: [],
// 					},
// 				],
// 			},
// 		],
// 	},
// ];

const tree = [];

// creates store with treeReducer as the reducer, tree as the initial state, and redux devtools extenstion init for debugging
const store = createStore(
	treeReducer,
	{ tree },
	compose(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
