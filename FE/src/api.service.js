const mock = [
	{
		id: 1,
		name: "winterfell",
		isOpen: false,
		children: [
			{
				id: 2,
				name: "computers",
				isOpen: false,
				children: [
					{
						id: 6,
						name: "Bach",
						isOpen: false,
						children: [],
					},
					{
						id: 7,
						name: "Mozart",
						isOpen: false,
						children: [
							{
								id: 8,
								name: "Beethoven",
								isOpen: false,
								children: [],
							},
						],
					},
				],
			},
			{
				id: 3,
				name: "Domain Controllers",
				isOpen: false,
				children: [],
			},
			{
				id: 4,
				name: "TheWall",
				isOpen: false,
				children: [
					{
						id: 5,
						name: "Kylo-Ou",
						isOpen: false,
						children: [],
					},
				],
			},
		],
	},
];


const mockNodeChildren = {
	1: [{
		id: 2,
		name: "computers",
	},
	{
		id: 3,
		name: "Domain Controllers",
	},
	{
		id: 4,
		name: "TheWall",
	}],
	2: 	[{
		id: 6,
		name: "Bach",
	},
	{
		id: 7,
		name: "Mozart",
	}],
	7: [{
		id: 8,
		name: "Beethoven",
	}]
}

// export async const getRootNode = () => {
// 	const response = await fetch("http://127.0.0.1:5000/1/node");
// 	return response;
// }

// export const getNodeChildren = nodeId => {
// 	return mockNodeChildren[nodeId];
// }
