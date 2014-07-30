/*The sequelize equivalent of a schema.*/


/*do you feel like typing out Sequelize.STRING every time? neither do I*/
var _STR =  Sequelize.STRING
var _DATE = Sequelize.DATE
var _INT =  Sequelize.INT
var _BINT =  Sequelize.BIGINT
var _TEXT =  Sequelize.TEXT

exports = function(sequelize, DataTypes) {
/*Models*/
var User = sequelize.define('User', {
  first_name : {type: _STR}
  last_name : {type: _STR}
  email : {type: _STR}
});

//type, primarykey, unique, allownull, defaultvalue

var Layout = sequelize.define('Layout', {
  layout : {type: Sequelize.BLOB}
})

var Stream =  sequelize.define('Stream', {
  streamName : {type: _STR}
})

var Article =  sequelize.define('Article', {
  headline : {type: _STR}
  source : {type: _STR}
  link : {type: _STR}
})
var SharedArticle = sequelize.define('SharedArticle', {
  timestamp : {type: _DATE}
})//sequelize might have better way to deal with this join table (but we need some way to associate this with Comment, and also we need to make timestamp a part of the primary key for a user to share articles multiple times)

var Comment = sequelize.define('Comment', {
  text : {type : _TEXT}
})


/*Maybe we should just move everything in here into Comment?*/
var CommentMetadata = sequelize.define('Layout', {})
{
  timestamp : {type : _DATE}
}

/*Associations*/
/*HOW TO USE: if I say Stream.hasMany(Article, {as : 'Feed'}), Sequelize generates the method Stream.getFeed that will get me all the articles associated with a Stream.*/
/*TODO: Do we need a Following table? I feel like saying User.hasMany(User, {as :'Following'}), User.hasMany(User, {as : 'Followee'}) will create a row for every follower-followee pair in User and thus duplicate each user's data (user's following + user's followees) times*/
User.hasMany(Following, {as : 'Followees'}) //user can be followed by many
User.hasMany(Following, {as : 'Followers'}) //user can follow many //is this legal in sequelize?
User.hasOne(Layout) //user can have one layout
Layout.belongsTo(User) //layout can only belong to one user
Stream.hasMany(Article, {as : 'Feed'}) //streams can contain many articles
Layout.hasMany(Stream, {as : 'Streams'}) //layout can contain multiple streams
Stream.hasMany(Layout) //a stream can be in multiple layouts(should we even bother with this?)
Article.belongsTo(Stream) //an article associated with only one stream (???)

/*TODO: (do we have to define the associations between User-SharedArticle and Article-SharedArticle as two 1-1 relations or can we just use "through"?)*/
Article.hasMany(User, {as: SharedBy, through : SharedArticle}) //articles can be shared multiple times
User.hasMany(Article, {as: Shared, through : SharedArticle}) //user can share many articles
SharedArticle.hasMany(Comment, {as : 'Comments'}) //shared article can have many comments (no "through", comments belong to an articleshare, not an article itself)
Comment.belongsTo(SharedArticle) //comment belongs to a sharedarticle

/*TODO: Let's say we want to get every comment on every share of an article. If we say Article.hasMany(Comment), are we creating a redundant M:N ArticleComment table when we could get this through a join on SharedArticle, or will it generate the query joining through SharedArticle? I'm inclined to say the former, because having this circular relation could introduce ambiguity)
 * //Comment.belongsTo(User, {as: 'Author', through: SharedArticle}) //user makes a comment //redundant(?)
//User.hasMany(Comment, {as : 'Comments'}) //user can make many comments //redundant(?)
//*/

Comment.hasOne(CommentMetadata, {as: 'Metadata'}) //comment has metadata
CommentMetadata.belongsTo(Comment) //comment metadata associated with one comment

}
