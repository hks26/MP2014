AlphaForce Backend Source Code
==============================


####Requirements:
Users - Access in existing SQL database
  
####Stuff we're interested in
  -Existing info in database
  -More granular than company level groups
  -The articles they click on
  
####User-interest
  -People a user is following
  -Streams a user subscribed to
  -The user customization of the tray
  -The articles they share
  
Tables needed
  -Primary table with user info - user.tbl (Join with existing database) 
  -Primary table with available streams - streams.tbl
  -Joined table with user connections - following.tbl
  -Joined table with user shares and comments - shared.tbl
  -Joined table with comment and user shares - comment.tbl
  -Joined table with article clicks - click.tbl
  -Joined table with a user's streams - subscribe.tbl
Tables in CIQ Database Primary table with acquire media articles - Ask Jen for name
   -Primary table with xternal news - Ask Jen for name
 
