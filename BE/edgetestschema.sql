CREATE TABLE IF NOT EXISTS `User` (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  primary_email TEXT NOT NULL,
  secondary_email TEXT NOT NULL,
  job_title TEXT,
  address TEXT,
  image_url TEXT,
  organization_id INTEGER NOT NULL,
  FOREIGN KEY(organization_id) REFERENCES Organization(organization_id)
  );

CREATE TABLE IF NOT EXISTS `Organization` (
    organization_id INTEGER PRIMARY KEY AUTOINCREMENT,
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
  comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  share_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  comment_body TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  FOREIGN KEY(share_id) REFERENCES Share(share_id),
  FOREIGN KEY(user_id) REFERENCES User(user_id)
  );
 
CREATE TABLE IF NOT EXISTS `Share` (
  share_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  link TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES User(user_id)
  );

CREATE TABLE IF NOT EXISTS `CompanyTicker`
(
  name TEXT,
  company_id INTEGER,
  ticker TEXT,
  PRIMARY KEY(company_id, ticker)
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

CREATE TABLE IF NOT EXISTS `ShareClick` (
  share_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  timestamp TEXT NOT NULL,
  PRIMARY KEY(share_id, user_id, timestamp),
  FOREIGN KEY(share_id) REFERENCES Share(share_id),
  FOREIGN KEY(user_id) REFERENCES User(user_id)
  );


CREATE TABLE IF NOT EXISTS `Stream` (
  stream_id INTEGER PRIMARY KEY AUTOINCREMENT,
  stream_name TEXT,
  stream_link TEXT,
  stream_description TEXT
  );

CREATE TABLE IF NOT EXISTS `Subscription` (
  user_id INTEGER,
  stream_id INTEGER,
  PRIMARY KEY(user_id, stream_id),
  FOREIGN KEY(user_id) REFERENCES User(user_id),
  FOREIGN KEY(stream_id) REFERENCES Stream(stream_id)
  );

CREATE TABLE IF NOT EXISTS `StatusUpdate` (
  status_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  status_text TEXT,
  timestamp TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS `News` (
  newsItem_id INT PRIMARY KEY, 
	company_id INT,
	company_name TEXT,
	ticker TEXT, 
	headline TEXT, 
	URL TEXT,
	industryGroup TEXT,
	industrySubGroup TEXT ,
	industrySector TEXT,
	displayDateUTC TEXT,
	creationDateUTC TEXT,
	body TEXT
);
