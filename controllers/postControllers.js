const Post = require('../models/Post');
const db = require('../config/db');
const mysql = require("mysql2");
require("dotenv").config();


//this should be in post routes
class PostBattle {
	constructor(summoner_id, summoner_level,
		monster_1_id, monster_1_level, monster_1_abilities,
		monster_2_id, monster_2_level, monster_2_abilities,
		monster_3_id, monster_3_level, monster_3_abilities,
		monster_4_id, monster_4_level, monster_4_abilities,
		monster_5_id, monster_5_level, monster_5_abilities,
		monster_6_id, monster_6_level, monster_6_abilities,
		created_date, match_type, mana_cap, ruleset, inactive,
		battle_queue_id, player_rating_initial, player_rating_final, winner) {
		this.summoner_id = summoner_id;
		this.summoner_level = summoner_level;
		this.monster_1_id = monster_1_id;
		this.monster_1_level = monster_1_level;
		this.monster_1_abilities = JSON.stringify(monster_1_abilities);
		this.monster_2_id = monster_2_id;
		this.monster_2_level = monster_2_level;
		this.monster_2_abilities = JSON.stringify(monster_2_abilities);
		this.monster_3_id = monster_3_id;
		this.monster_3_level = monster_3_level;
		this.monster_3_abilities = JSON.stringify(monster_3_abilities);
		this.monster_4_id = monster_4_id;
		this.monster_4_level = monster_4_level;
		this.monster_4_abilities = JSON.stringify(monster_4_abilities);
		this.monster_5_id = monster_5_id;
		this.monster_5_level = monster_5_level;
		this.monster_5_abilities = JSON.stringify(monster_5_abilities);
		this.monster_6_id = monster_6_id;
		this.monster_6_level = monster_6_level;
		this.monster_6_abilities = JSON.stringify(monster_6_abilities);
		this.created_date = created_date;
		this.match_type = match_type;
		this.mana_cap = mana_cap;
		this.ruleset = ruleset;
		this.inactive = inactive;
		this.battle_queue_id = battle_queue_id;
		this.player_rating_initial = player_rating_initial;
		this.player_rating_final = player_rating_final;
		this.winner = winner;

	}
	async save() {
		let sql = `
		REPLACE INTO history (summoner_id, summoner_level,
		monster_1_id, monster_1_level, monster_1_abilities,
		monster_2_id, monster_2_level, monster_2_abilities,
		monster_3_id, monster_3_level, monster_3_abilities,
		monster_4_id, monster_4_level, monster_4_abilities,
		monster_5_id, monster_5_level, monster_5_abilities,
		monster_6_id, monster_6_level, monster_6_abilities,
		created_date, match_type, mana_cap, ruleset, inactive,
		battle_queue_id, player_rating_initial, player_rating_final, winner)
		VALUES(
		'${this.summoner_id}',
		'${this.summoner_level}',
		'${this.monster_1_id}',
		'${this.monster_1_level}',
		'${this.monster_1_abilities}',
		'${this.monster_2_id}',
		'${this.monster_2_level}',
		'${this.monster_2_abilities}',
		'${this.monster_3_id}',
		'${this.monster_3_level}',
		'${this.monster_3_abilities}',
		'${this.monster_4_id}',
		'${this.monster_4_level}',
		'${this.monster_4_abilities}',
		'${this.monster_5_id}',
		'${this.monster_5_level}',
		'${this.monster_5_abilities}',
		'${this.monster_6_id}',
		'${this.monster_6_level}',
		'${this.monster_6_abilities}',
		'${this.created_date}',
		'${this.match_type}',
		'${this.mana_cap}',
		'${this.ruleset}',
		'${this.inactive}',
		'${this.battle_queue_id}',
		'${this.player_rating_initial}',
		'${this.player_rating_final}',
		'${this.winner}'
		)
		`;

		const [newPost, _] = await db.execute(sql);

		return newPost;
	}

	exports = Post;
}














exports.getBattles = async (req, res, next) => {
   
    console.log("request received");
	var param = req.query;
	console.log(param.summoners);
	//res.json(param
	let summoners = param.summoners;
	let summToString = summoners.toString();
	summToString = summToString.substring(1, summToString.length - 1);

	console.log("IN(" + summToString + ")");

	let sql = "SELECT summoner_id, monster_1_id, monster_2_id, monster_3_id, monster_4_id, monster_5_id, monster_6_id, ruleset, mana_cap, COUNT(*) AS tot, COUNT(*) / (SELECT COUNT(*) FROM battledata.history) AS Ratio FROM battledata.history WHERE summoner_id IN ("+ summToString +") AND ruleset = ? AND mana_cap = ?  GROUP BY summoner_id, monster_1_id, monster_2_id, monster_3_id, monster_4_id, monster_5_id, monster_6_id ORDER BY Ratio, tot DESC";
	
	db.pool.query(sql, [param.ruleset, param.mana], function (err, result) {
		if (err) throw err;
		console.log(result);
		res.json(result);
	});


	

	/* db.pool.execute(sql, function (err, result) {

		if (err) throw err;

		console.log(result);
		res.json(result);
	})
	*/
}

exports.createNewPost = async (req, res, next) => {

	

	let json = req.body;
	console.log(json);
	for (var obj in json) {
		console.log(obj + ": " + json[obj]);

		let post = new PostBattle(json[obj].summoner_id, json[obj].summoner_level,
			json[obj].monster_1_id, json[obj].monster_1_level, json[obj].monster_1_abilities,
			json[obj].monster_2_id, json[obj].monster_2_level, json[obj].monster_2_abilities,
			json[obj].monster_3_id, json[obj].monster_3_level, json[obj].monster_3_abilities,
			json[obj].monster_4_id, json[obj].monster_4_level, json[obj].monster_4_abilities,
			json[obj].monster_5_id, json[obj].monster_5_level, json[obj].monster_5_abilities,
			json[obj].monster_6_id, json[obj].monster_6_level, json[obj].monster_6_abilities,
			json[obj].created_date, json[obj].match_type, json[obj].mana_cap, json[obj].ruleset, json[obj].inactive,
			json[obj].battle_queue_id, json[obj].player_rating_initial, json[obj].player_rating_final, json[obj].winner);
		console.log(post);

		//let post = new PostBattle(json);

		post = await post.save();

		console.log("a post is happening");
	}
	console.log("out of loop");
	

}

exports.getAllPosts = (req, res, next) => {
	res.send("hello!");

}