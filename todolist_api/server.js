const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pgp = require('pg-promise')();
const app = express();
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
app.use(bodyParser.json());
app.use(cors());

const connection = {
    host: 'localhost',
    port: 5432,
    database: 'todolist',
    user: 'toad',
    password: '3p1d3m1c'
};

const db = pgp(connection);

//LOGIN

app.post('/register', (req, res) => {
	const { email, password, guest } = req.body;
	const uuid = uuidv4();

	if (guest != true) {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);	
		
		db.any('insert into users(user_id, email, hash) values($1, $2, $3) returning *', [uuid, email, hash])
		.then(user => { console.log(user[0]); res.json(user[0]) } )
		.catch(err => res.status(400).json('error registering user'));
	} else if (guest === true) {
		db.any('insert into users(user_id) values($1) returning *', [uuid])
		.then(user => { res.json(user[0]); console.log(user[0]); } )
		.catch(err => res.status(400).json('error registering user'));
	}
})

app.post('/signin', (req, res) => {
	const { email, password } = req.body;

	db.any('select * from users where email = $1', [email])
	.then(user => {	
		if (user.length) {
			db.any('select * from users where user_id = $1', [user[0].user_id])
			.then(crypto => {
				const isValid = bcrypt.compareSync(password, crypto[0].hash);
				if (isValid) {
					return res.json(user[0]);
				} else {
					throw 'password is not valid'
				}
			})
			.catch(err => res.json(err));
		}
		else {
			throw 'email is not registerd'
		}	
	})
	.catch(err => res.json(err))
})

//LISTS MANAGEMENT

app.post('/createlist', (req, res) => {
	const {user_id, title} = req.body;
	const uuid = uuidv4();

	db.one('insert into lists(list_id, title, user_id) values($1, $2, $3) returning *', [uuid, title, user_id])
	.then(lists => {
		console.log(lists);
		res.json(lists);
	})
	.catch(err => res.status(400).json('couldnt ADD list' + err))
})

app.post('/readlists', (req, res) => {
	const {user_id} = req.body;

	db.any('select * from lists where user_id = $1', [user_id])
	.then(lists => {
		console.log(lists);
		res.json(lists);
	})
	.catch(err => res.status(400).json('couldnt FIND list'))
})

app.post('/updatelist', (req, res) => {
	const {list_id, entry, deleteEntry} = req.body;
	let entries = '';

	db.one('select * from lists where list_id = $1', [list_id])
	.then(list => {
		list.list_entries ? entries = list.list_entries : entries = [];

		if (deleteEntry === true) {
			if (entries.includes(entry)) {
			let index = entries.indexOf(entry);
			entries.splice(index, 1);	
			} else { throw 'err'}
		}
		else
		{
			entries.push(entry);
			console.log(entry)
			console.log(entries)			
		}

		db.one('update lists set list_entries = $1 where list_id = $2 returning *', [entries, list_id])
		.then(updatedList => {
			res.json(updatedList)
		})
		.catch(err => res.status(400).json('couldnt FIND list 2'))
	})
	.catch(err => res.status(400).json('couldnt FIND list 1'))
})

app.post('/deletelist', (req, res) => {
	const {list_id} = req.body;

	db.one('delete from lists where list_id = $1 returning *', [list_id])
	.then(lists => {
		console.log(lists)
		res.json(lists)
	})
	.catch(err => res.status(400).json('couldnt FIND list'))
})

app.post('/readlist', (req, res) => {
	const {list_id} = req.body;

	db.one('select * from lists where list_id = $1', [list_id])
	.then(list => {
		console.log(list);
		res.json(list);
	})
	.catch(err => res.status(400).json('couldnt FIND list'))
})


// 

app.listen(3000, ()=> {
	console.log('app is running on 3000')
})

