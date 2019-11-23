from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_caching import Cache

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tree.db'

CORS(app)

cache = Cache(app, config={'CACHE_TYPE': 'simple'})

db = SQLAlchemy(app)

# MODELS
class EdgesTable(db.Model):
	id = db.Column(db.Integer, nullable=False,
              primary_key=True,
              unique=True,
              autoincrement=True)
	parent_id = db.Column(db.Integer)
	child_id = db.Column(db.Integer)
	nodes = db.relationship('NodesTable', backref="edges_table")


class NodesTable(db.Model):
	id = db.Column(db.Integer, db.ForeignKey('edges_table.child_id'), nullable=False,
              primary_key=True,
              unique=True,
              autoincrement=True)
	name = db.Column(db.String(30))

# a method for initial db seed
def seed_db():
	NodesTable.__table__.drop(db.engine)
	EdgesTable.__table__.drop(db.engine)
	db.create_all()
	nodes_names = ["winterfell", "Computers", "domain controllers", "TheWall", "Kylo-Ou"]
	for node_name in nodes_names:
		node_name_obj = NodesTable(name=node_name)
		db.session.add(node_name_obj)

	db.session.commit()

	edges = [
		{
			"parent_id": 1,
			"child_id": 2
		},
		{
			"parent_id": 1,
			"child_id": 3
		},
		{
			"parent_id": 1,
			"child_id": 4
		},
		{
			"parent_id": 4,
			"child_id": 5
		},
	]

	EdgesTable.query.delete()
	for edge in edges:
		edge_obj = EdgesTable(parent_id=edge["parent_id"], child_id=edge["child_id"])
		db.session.add(edge_obj)
		
	db.session.commit()


seed_db()

# ROUTES
cache_timeout = 60 * 60 * 24
# GET node by id
@app.route('/<node_id>/node')
@cache.cached(timeout=cache_timeout, key_prefix="node")
def get_node(node_id):
	node = NodesTable.query.filter_by(id=node_id).first()
	node_obj = [{
		"id": node.id,
		"name": node.name,
		"isOpen": False,
		"children": []
	}]
	return jsonify(node_obj)

# GET node's childeren by parent_id
@app.route('/<parent_id>/children')
def get_node_children(parent_id):
	edges = db.session.query(EdgesTable, NodesTable).filter_by(parent_id=parent_id).outerjoin(NodesTable, EdgesTable.child_id == NodesTable.id).all()
	children = []
	for edge in edges:
		node = {
			"id": edge[1].id, 
			"name": edge[1].name,
			"isOpen": False,
			"children": []
		}
		children.append(node)

	return jsonify(children)

if __name__ == '__main__':
	app.run(debug=True)