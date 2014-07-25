INSERT INTO `Organization`
(organization_id, organization_name)
VALUES
(13, "Organization XIII"),
(1, "S&P Capital IQ");

INSERT INTO `User` 
(user_id, first_name, last_name, email, organization_id) VALUES
(13, "Roxas", "???", "roxas@organizationthirteen.biz", 13),
(7, "Axel", "Rose", "axel@organizationthirteen.biz", 13),
(1, "Frank", "Xie", "frank.xie@spcapitaliq.com", 1),
(2, "Doug", "Peterson", "doug.peterson@mhfi.com", 1),
(3, "Count", "Chocula", "count.chocula@spcapitaliq.com", 1),
(4, "Lou", "Shrekleston", "its.all.ogre@mhfi.com", 1);

INSERT INTO `Following`
(follower_id, followee_id)
VALUES 
(13, 7),
(7, 13),
(7, 3), --forbid this
(1, 1), --forbid this too
(1, 2),
(1, 3),
(2, 3);

INSERT INTO `Stream` 
(stream_id, stream_name) VALUES
(1, "NPR"),
(2, "Dr. Horrible's Singalong Blog"),
(3, "Nightvale Podcast");

INSERT INTO `Subscription`
(user_id, stream_id) VALUES
(13, 1),
(13, 2),
(7, 2),
(1, 1),
(1, 2),
(3, 2);

INSERT INTO `Article` 
(article_id, article_link) VALUES
(1, "http://www.github.com"),
(2, "http://www.google.com"),
(3, "http://www.yahoo.com"),
(4, "http://www.asdfasdf.biz");

INSERT INTO `ArticleStream` 
(stream_id, article_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(2, 3);

INSERT INTO `Share`
(share_id, user_id, article_id, timestamp) VALUES
(1,13,1,"2014-01-01"),
(2,13,1,"2014-12-12"),
(3,13,2,"2006-06-06"),
(4,7,1,"2017-01-01"),
(5,2,4,"1969-01-01"),
(6,3,3,"0001-01-01");

INSERT INTO `ArticleClick`
(share_id, user_id, timestamp) VALUES
(1, 7, "2014-07-24"),
(2, 7, "2014-07-26"),
(4, 13, "2014-01-01"),
(5, 1, "1969-02-02"),
(6, 1, "2014-02-01"),
(6, 2, "2014-03-01"),
(6, 1, "2014-04-01");

INSERT INTO `Comment`
(comment_id, share_id, user_id, comment_body, timestamp) VALUES
(1,1,7,"hey","0001-01-01"),
(2,1,7,"man","3000-03-03"),
(3,2,13,"you're","2014-01-01"),
(4,3,7,"an","2014-02-02"),
(5,4,13,"all-star","2014-03-03"),
(6,5,3,"get","2014-04-04"),
(7,3,3,"your","2014-05-05"),
(8,3,13,"game","2014-06-06"),
(9,4,7,"on","2014-07-07"),
(10,5,1,"go","2014-08-08"),
(11,6,1,"play","2014-09-09");
