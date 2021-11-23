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
		battle_queue_id, player_rating_initial, player_rating_final, winner, loser, player, winlose) {
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
		this.loser = loser;
		this.player = player;
		this.winlose = winlose;


	}
	async save(post) {
		let sql = `
		REPLACE INTO history (summoner_id, summoner_level,
		monster_1_id, monster_1_level, monster_1_abilities,
		monster_2_id, monster_2_level, monster_2_abilities,
		monster_3_id, monster_3_level, monster_3_abilities,
		monster_4_id, monster_4_level, monster_4_abilities,
		monster_5_id, monster_5_level, monster_5_abilities,
		monster_6_id, monster_6_level, monster_6_abilities,
		created_date, match_type, mana_cap, ruleset, inactive,
		battle_queue_id, player_rating_initial, player_rating_final, winner, loser, player, winlose)
		VALUES(
		'${post.summoner_id}',
		'${post.summoner_level}',
		'${post.monster_1_id}',
		'${post.monster_1_level}',
		'${post.monster_1_abilities}',
		'${post.monster_2_id}',
		'${post.monster_2_level}',
		'${post.monster_2_abilities}',
		'${post.monster_3_id}',
		'${post.monster_3_level}',
		'${post.monster_3_abilities}',
		'${post.monster_4_id}',
		'${post.monster_4_level}',
		'${post.monster_4_abilities}',
		'${post.monster_5_id}',
		'${post.monster_5_level}',
		'${post.monster_5_abilities}',
		'${post.monster_6_id}',
		'${post.monster_6_level}',
		'${post.monster_6_abilities}',
		'${post.created_date}',
		'${post.match_type}',
		'${post.mana_cap}',
		'${post.ruleset}',
		'${post.inactive}',
		'${post.battle_queue_id}',
		'${post.player_rating_initial}',
		'${post.player_rating_final}',
		'${post.winner}',
		'${post.loser}',
		'${post.player}',
		'${post.winlose}'
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
	let summoners = param.summoners;
	let summToString = summoners.toString();
	summToString = summToString.substring(1, summToString.length - 1);

	console.log("IN(" + summToString + ")");

	//let sql = "SELECT summoner_id, monster_1_id, monster_2_id, monster_3_id, monster_4_id, monster_5_id, monster_6_id, ruleset, mana_cap, COUNT(*) AS tot, COUNT(*) / (SELECT COUNT(*) FROM battledata.history) AS Ratio FROM battledata.history WHERE summoner_id IN ("+ summToString +") AND ruleset = ? AND mana_cap = ?  GROUP BY summoner_id, monster_1_id, monster_2_id, monster_3_id, monster_4_id, monster_5_id, monster_6_id ORDER BY Ratio, tot DESC";
	//let sql = "SELECT summoner_id, monster_1_id, monster_2_id, monster_3_id, monster_4_id, monster_5_id, monster_6_id, ruleset, mana_cap, SUM(winlose='win') AS wintot, SUM(winlose='lose') AS losetot, COUNT(*) AS totalmatches, SUM(winlose='win') / COUNT(*)  AS Ratio, SUM(winlose='lose') / COUNT(*)  AS lossRatio FROM history WHERE summoner_id IN (" + summToString +") AND ruleset = ? AND mana_cap = ? GROUP BY summoner_id, monster_1_id, monster_2_id, monster_3_id, monster_4_id, monster_5_id, monster_6_id HAVING wintot > 2 ORDER BY Ratio DESC"
	let sql = "SELECT summoner_id, monster_1_id, monster_2_id, monster_3_id, monster_4_id, monster_5_id, monster_6_id, ruleset, mana_cap, SUM(winlose='win') AS tot, SUM(winlose='win') / COUNT(*)  AS Ratio, SUM(winlose='lose') AS losetot, COUNT(*) AS totalmatches, SUM(winlose='lose') / COUNT(*)  AS lossRatio FROM history WHERE summoner_id IN (" + summToString + ") AND ruleset = ? AND mana_cap = ? GROUP BY summoner_id, monster_1_id, monster_2_id, monster_3_id, monster_4_id, monster_5_id, monster_6_id ORDER BY Ratio ASC"

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
	//console.log("body:" + JSON.stringify(json));
	for (var obj in json) {
		//console.log(obj + ": " + JSON.stringify(json[obj]));

		let post = new PostBattle(json[obj].t1_summoner_id, json[obj].t1_summoner_level,
			json[obj].t1_monster_1_id, json[obj].t1_monster_1_level, json[obj].t1_monster_1_abilities,
			json[obj].t1_monster_2_id, json[obj].t1_monster_2_level, json[obj].t1_monster_2_abilities,
			json[obj].t1_monster_3_id, json[obj].t1_monster_3_level, json[obj].t1_monster_3_abilities,
			json[obj].t1_monster_4_id, json[obj].t1_monster_4_level, json[obj].t1_monster_4_abilities,
			json[obj].t1_monster_5_id, json[obj].t1_monster_5_level, json[obj].t1_monster_5_abilities,
			json[obj].t1_monster_6_id, json[obj].t1_monster_6_level, json[obj].t1_monster_6_abilities,
			json[obj].created_date, json[obj].match_type, json[obj].mana_cap, json[obj].ruleset, json[obj].inactive,
			json[obj].battle_queue_id_1, json[obj].player_rating_initial_1, json[obj].player_rating_final_1,
			json[obj].winner,
			json[obj].loser, json[obj].player1, json[obj].winlose_1);
			
		let post2 = new PostBattle(json[obj].t2_summoner_id, json[obj].t2_summoner_level,
			json[obj].t2_monster_1_id, json[obj].t2_monster_1_level, json[obj].t2_monster_1_abilities,
			json[obj].t2_monster_2_id, json[obj].t2_monster_2_level, json[obj].t2_monster_2_abilities,
			json[obj].t2_monster_3_id, json[obj].t2_monster_3_level, json[obj].t2_monster_3_abilities,
			json[obj].t2_monster_4_id, json[obj].t2_monster_4_level, json[obj].t2_monster_4_abilities,
			json[obj].t2_monster_5_id, json[obj].t2_monster_5_level, json[obj].t2_monster_5_abilities,
			json[obj].t2_monster_6_id, json[obj].t2_monster_6_level, json[obj].t2_monster_6_abilities,
			json[obj].created_date, json[obj].match_type, json[obj].mana_cap, json[obj].ruleset, json[obj].inactive,
			json[obj].battle_queue_id_2, json[obj].player_rating_initial_2, json[obj].player_rating_final_2, json[obj].winner,
			json[obj].loser, json[obj].player2, json[obj].winlose_2);


		//let post = new PostBattle(json);
		//console.log("post1:" + JSON.stringify(post));
		//console.log("post1:" + JSON.stringify(post.player));
		//console.log("post2:" + JSON.stringify(post2.player1 + " " + post2.winlose_2));

		 post3 = Object.assign({},post,post2);
		console.log("player" + post3.player);

		post = await post.save(post3);
		//post2 = await post.save();


	//	console.log("a post is happening:" + JSON.stringify(post));
	}
	console.log("out of loop");
	

}

exports.getAllPosts = (req, res, next) => {
	res.send("hello!");

}