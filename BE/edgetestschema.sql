CREATE TABLE IF NOT EXISTS `User` (
  user_id INTEGER PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization_id INTEGER NOT NULL,
  FOREIGN KEY(organization_id) REFERENCES Organization(organization_id)
  );

CREATE TABLE IF NOT EXISTS `Organization` (
    organization_id INTEGER PRIMARY KEY,
    organization_name TEXT
  );

CREATE TABLE IF NOT EXISTS `Following`(
  follower_id INTEGER NOT NULL,
  followee_id INTEGER NOT NULL,
  PRIMARY KEY(follower_id, followee_id),
  FOREIGN KEY(follower_id) REFERENCES User(user_id),
  FOREIGN KEY(followee_id) REFERENCES User(user_id)
  );

CREATE TABLE IF NOT EXISTS `Comment` (
  comment_id INTEGER PRIMARY KEY,
  share_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  comment_body TEXT,
  timestamp TEXT NOT NULL,
  FOREIGN KEY(share_id) REFERENCES Share(share_id),
  FOREIGN KEY(user_id) REFERENCES User(user_id)
  );
 
CREATE TABLE IF NOT EXISTS `Share` (
  share_id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  article_id INTEGER NOT NULL,
  timestamp TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES User(user_id),
  FOREIGN KEY(article_id) REFERENCES Article(article_id)
  );
 
CREATE TABLE IF NOT EXISTS `Article` (
  article_id INTEGER PRIMARY KEY,
  article_link TEXT NOT NULL
  );
 
CREATE TABLE IF NOT EXISTS `ArticleStream` (
  stream_id INTEGER NOT NULL,
  article_id INTEGER NOT NULL,
  PRIMARY KEY(stream_id, article_id),
  FOREIGN KEY(stream_id) REFERENCES Stream(stream_id),
  FOREIGN KEY(article_id) REFERENCES Article(article_id)
);

CREATE TABLE IF NOT EXISTS `ArticleClick` (
  share_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  timestamp TEXT NOT NULL,
  PRIMARY KEY(share_id, user_id, timestamp),
  FOREIGN KEY(share_id) REFERENCES Share(share_id),
  FOREIGN KEY(user_id) REFERENCES User(user_id)
  );


CREATE TABLE IF NOT EXISTS `Stream` (
  stream_id INTEGER PRIMARY KEY,
  stream_name TEXT
  );

CREATE TABLE IF NOT EXISTS `Subscription` (
  user_id INTEGER,
  stream_id INTEGER,
  PRIMARY KEY(user_id, stream_id),
  FOREIGN KEY(user_id) REFERENCES User(user_id),
  FOREIGN KEY(stream_id) REFERENCES Stream(stream_id)
  );
