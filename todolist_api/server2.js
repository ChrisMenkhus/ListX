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

// LOGIN

app.post('/register', (req, res) => {
	const { email, password } = req.body;

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);	
	const uuid = uuidv4();

	db.any('insert into users(user_id, email, hash) values($1, $2, $3) returning *', [uuid, email, hash])
	.then(user => { res.json(user[0]) } )
	.catch(err => res.status(400).json('error registering user'));
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

// LIST MANAGEMENT

app.post('/addlist', (req, res) => {
	const {user_id, title} = req.body;
	const uuid = uuidv4();
	let lists = '';

	db.one('insert into lists(list_id, title, user_id) values($1, $2, $3)', [uuid, title, user_id])
	.then(lists => {
		console.log(lists);
		res.json('success');
	})
	.catch(err => res.status(400).json('couldnt ADD list' + err))
})

app.post('/removelist', (req, res) => {
	const {user_id, list_id} = req.body;
	let lists = '';

	

	db.one('select * from users where user_id = $1', [user_id])
	.then(user => {
		user.list_ids ? lists = user.list_ids : lists = []

				if (lists.includes(list_id)) {
					let index = lists.indexOf(list_id);
					lists.splice(index, 1);					
					db.none('update users set list_ids = $1 where user_id = $2', [lists, user_id])
					.then(res.json('success'))
					.catch(err => res.status(400).json('couldnt remove list'))
				}
				else {					
					res.status(400).json('list NOT in lists')
				}
		})
		.catch(err => res.status(400).json('couldnt FIND user'))		
	.catch(err => res.status(400).json('couldnt FIND friend'))
})

app.post('/removefromlist', (req, res) => {
	const {list_id, entry} = req.body;

	let lists = '';

	db.one('select * from lists where list_id = $1', [list_id])
	.then(list => {
		list.list_entries ? lists = list.list_entries : lists = [];
		if (lists.includes(entry)) {
			let index = lists.indexOf(entry);
			lists.splice(index, 1);	
		}
		
		db.none('update lists set list_entries = $1 where list_id = $2', [lists, list_id])
		.then(			
			res.json('success') 
		)
		.catch(err => res.status(400).json('couldnt FIND list 2'))
	})
	.catch(err => res.status(400).json('couldnt FIND list 1'))
})





app.post('/getlists', (req, res) => {
	const {user_id} = req.body;

	db.one('select * from lists where user_id = $1', [user_id])
	.then(lists => {
		res.json(lists);
	})
	.catch(err => res.status(400).json('couldnt FIND user'))
})

// LIST ENTRY MANAGEMENT
app.post('/getlist', (req, res) => {
	const {list_id} = req.body;

	db.one('select list_entries from lists where list_id = $1', [list_id])
	.then(entries => {
		res.json(entries);
	})
	.catch(err => res.status(400).json('couldnt FIND list'))
})







let newArray2 = '';

app.post('/getlisttitles', (req, res) => {
	const {lists} = req.body;
	console.log(lists);
	let a = lists;
	newArray2 = a.map((list_id, i)=>{
		db.one('select * from lists where list_id = $1', [list_id])
		.then(list => {
			res.json(list)
		})
		.catch(err => res.status(400).json('couldnt FIND list'))		
	})

	console.log(newArray2);
})












app.post('/addtolist', (req, res) => {
	const {list_id, entry} = req.body;

	let lists = '';

	db.one('select * from lists where list_id = $1', [list_id])
	.then(list => {
		list.list_entries ? lists = list.list_entries : lists = [];
		lists.push(entry);

		console.log('entries = ' + lists)

		db.none('update lists set list_entries = $1 where list_id = $2', [lists, list_id])
		.then( 
			res.json('success')
		)
		.catch(err => res.status(400).json('couldnt FIND list 2'))
	})
	.catch(err => res.status(400).json('couldnt FIND list 1'))
})


app.listen(3000, ()=> {
	console.log('app is running on 3000')
})

