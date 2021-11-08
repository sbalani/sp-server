const Post = require('../models/Post')

const db = require("../config/db");
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
		console.log(monster_1_abilities);
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
		INSERT INTO history (summoner_id, summoner_level,
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















exports.getAllPosts = async (req, res, next) => {
    res.send("receiving");
    console.log("request received");

}

exports.createNewPost = async (req, res, next) => {
    let {summoner_id, summoner_level,
        monster_1_id, monster_1_level, monster_1_abilities,
        monster_2_id, monster_2_level, monster_2_abilities,
        monster_3_id, monster_3_level, monster_3_abilities,
        monster_4_id, monster_4_level, monster_4_abilities,
        monster_5_id, monster_5_level, monster_5_abilities,
        monster_6_id, monster_6_level, monster_6_abilities,
        created_date, match_type, mana_cap, ruleset, inactive,
        battle_queue_id, player_rating_initial, player_rating_final, winner
	} = req.body; // using postman this is what allows us to post JSON


    let post = new PostBattle(summoner_id, summoner_level,
        monster_1_id, monster_1_level, monster_1_abilities,
        monster_2_id, monster_2_level, monster_2_abilities,
        monster_3_id, monster_3_level, monster_3_abilities,
        monster_4_id, monster_4_level, monster_4_abilities,
        monster_5_id, monster_5_level, monster_5_abilities,
        monster_6_id, monster_6_level, monster_6_abilities,
        created_date, match_type, mana_cap, ruleset, inactive,
        battle_queue_id, player_rating_initial, player_rating_final, winner); // the title & body defined in the previous line taken from the JSON are now deposited here.

    post = await post.save();

    console.log("a post is happening");
    console.log(post);

}

exports.getPostById = (req, res, next) => {

}