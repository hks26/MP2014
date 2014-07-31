INSERT INTO `Organization`
(organization_id, organization_name)
VALUES
(13, "Organization XIII"),
(1, "S&P Capital IQ");

INSERT INTO `User` 
(user_id, first_name, last_name, primary_email, secondary_email, job_title, address, image_url, organization_id) VALUES
(13, "Roxas", "???", "roxas@organizationthirteen.biz", "sora@kingdomhearts.com", "Nobody",  "Tinseltown", "", 13),
(7, "Axel", "Rose", "axel@organizationthirteen.biz", "axel@gunsandroses.com", "Rock Star", "The Void", "", 13),
(1, "Frank", "Xie", "frank.xie@spcapitaliq.com", "fxie@cornell.edu", "BA", "Cornell Avenue, Cornell, CO, 11111", "frank.jpg", 1),
(2, "Doug", "Peterson", "doug.peterson@mhfi.com", "teachmehowtodougpeterson@gmail.com", "CEO Guy", "1221 Doug Peterson Drive, New York, New York, 10000", "http://www.infrastructureviews.com/wp-content/authors/doug_peterson-83.jpg", 1),
(3, "Count", "Chocula", "count.chocula@spcapitaliq.com", "cdawg@yahoo.net", "Cereal Vampire", "1 Chocula Lane, Transylvania, PA, 99999", "http://wearebigchill.com/wp-content/uploads/2013/11/Count-Chocula.jpg", 1),
(4, "Lou", "Shrekleston", "its.all.ogre@mhfi.com", "onionliker@swamp.net", "Ogre", "Swamp", "http://www.risk.net/IMG/727/90727/lou-eccleston.jpg", 1);

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
(share_id, user_id, link, timestamp) VALUES
(1,13,"google.com","2014-01-01T00:00:00"),
(2,13,"yahoo.com","2014-12-12T00:00:00"),
(3,13,"mhfi.com","2006-06-06T00:00:00"),
(4,7,"github.com","2017-01-01T00:00:00"),
(5,2,"twitter.com","1969-01-01T00:00:00"),
(6,3,"ingress.com","0001-01-01T00:00:00");

INSERT INTO `ShareClick`
(share_id, user_id, timestamp) VALUES
(1, 7, "2014-07-24T00:00:00"),
(2, 7, "2014-07-26T00:00:00"),
(4, 13, "2014-01-01T00:00:00"),
(5, 1, "1969-02-02T00:00:00"),
(6, 1, "2014-02-01T00:00:00"),
(6, 2, "2014-03-01T00:00:00"),
(6, 1, "2014-04-01T00:00:00");

INSERT INTO `Comment`
(comment_id, share_id, user_id, comment_body, timestamp) VALUES
(1,1,7,"hey","0001-01-01T00:00:00"),
(2,1,7,"man","3000-03-03T00:00:00"),
(3,2,13,"you're","2014-01-01T00:00:00"),
(4,3,7,"an","2014-02-02T00:00:00"),
(5,4,13,"all-star","2014-03-03T00:00:00"),
(6,5,3,"get","2014-04-04T00:00:00"),
(7,3,3,"your","2014-05-05T00:00:00"),
(8,3,13,"game","2014-06-06T00:00:00"),
(9,4,7,"on","2014-07-07T00:00:00"),
(10,5,1,"go","2014-08-08T00:00:00"),
(11,6,1,"play","2014-09-09T00:00:00");

INSERT INTO `StatusUpdate` 
(status_id, user_id, status_text, timestamp) VALUES
(1, 7, "UGH", "0001-02-02T00:00:00"),
(2, 7, "AUGH", "3000-02-02T00:00:00"),
(3, 7, "ICK", "2014-06-06T00:00:00"),
(4, 13, "[SCREAMS INTERNALLY]", "2014-05-05T00:00:00"),
(5, 1, "EWW", "2014-04-04T00:00:00"),
(6, 2, "[GRUNTS]", "2014-03-03T00:00:00"),
(7, 4, "[GROANS]", "2014-02-02T00:00:00"),
(8, 2, "asdfasdf", "2014-01-01T00:00:00");

INSERT INTO CompanyTicker (name, ticker, company_id) VALUES
('Herbalife Ltd', 'HLF', 9938532),
('Toyota Motor Corp.', 'TM', 319676),
('Toyota Motor Corp.', 'TOYOF', 319676),
('Time Warner Cable Inc', 'TWC', 862598),
('Time Warner Cable Inc', 'TWCA', 862598),
('Time Warner Cable Inc', 'TWCAV', 862598);
