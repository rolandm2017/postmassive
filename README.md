# CSS Guidelines

<i>If you aren't Canadian,</i> these guidelines do not apply and you can do your own thing.

### Guideline One

<i>If you're Canadian,</i> write CSS id's & class names like this:

If the page is called "home" and the class would normally be called "foo", write:

.home_foo

If the page is called "home" and the id would normally be called "bar", write:

#home_foo

This guideline applies to all of the Home, Inbox, Notifications, Post, Profile and Search pages.

This guideline was created to avoid CSS from the Home component overriding CSS from the Search component,
as React apparently shares the CSS from Home while the Search page is loaded.

So if Home has class "baz" and the Search page has a className "baz",
Home.css's "baz" class will affect the Search page's "baz" class.

Avoid this. It's confusing.

### Guideline Two

When using selectors like ".className div" and ".className h1", put divs before h1 tags, and header tags before paragraphs.

Just to be consistent.

### Guideline Three

Pages always have two main divs. One named "pageName" i.e. "home" "search" etc, the other named "pageName_main" as in "home_main"

Don't ask me why it's just how we do things.

#### Notes On Breakpoints

When...

width = 1660, l = 475, m = 600, r = 585
w = 1280, l = 275, m = 600, r = 405 ;; as w 1280 ->, l 275 -> ?, r 405 -> ?
== non-smooth resizing ==
w = 1279, l = 180, m = 600, r = 500
w = 1100, l = 100, m = 600, r = 400 ;; as w from 1100-> 1279, l 100 -> 180, r 400 -> 500
== non-smooth resizing == "thin-rightbar"
w = 1099, l = 125, m = 600, r = 375
w = 1000, l = 80, m = 600, r = 320 ;; as w from 1000-> 1099, l 80 -> 125, r 320 -> 375
== non-smooth resizing == "rightbar-shows"
w = 999, l = 200, m = 600, r = 200
w = 700, l = 100, m = 600, r = 0 ;; as w from 700-> 999, l 100 -> 200, r 0 -> 200
== rightbar is 0 width == "shrink-feed"
w = 500, sidebar goes away, mobile top and bottom bar show

Messages page breakpoints:

#messages_page is "m + p"

#inbox is "m"

#chat-display is "p"

#message-aside is "r" instead of rightbar in /messages.

w = 1680, l = 475, m = 390, p = 600, r = 215
w = 1280, l = 275, m = 390, p = 600, r = 15
== $thin-rightbar to $full-sidebar == (actually thin leftbar below this threshold)
w = 1279, l = 180, m = 390, p = 600, r = 110
w = 1100, l = 100, m = 390, p = 600, r = 10 #messages_page = 990, #inbox = 390
== $rightbar-shows to $thin-rightbar ==
w = 1099, l = 125, m = 320, p = 600, r = 55
w = 1000, l = 80, m = 320, p = 600, r = 0 #messages_page = 920, #inbox = 320, #c-d = 600
== $shrink-feed to $rightbar-shows ==
w = 999, l = 200, m & p = 600, r = 200
w = 700, l = 100, m & p = 600, r = 0 #messages_page = 600
== nsr == m & p start to shrink
w = 699, l = 100, m & p = 600 or less
w = 500, typical stuff

So... for the /messages route, the left sidebar keeps the same breakpoints.

### Notifications: Hierarchy and Conversion of "Author" func into usable data

Use this order for EVERY place where these things occur. That way you'll know eventually which way to scroll
to look for xyz item.

1. Reply
2. Amplify
3. Like
4. Quote
5. View

re: converting data.js's "author" func into usable data...

Once coding on the backend starts in earnest, it would be good to decide when and where you'll separate out
a user's display name from a user's username. So if the client needs a display name to make a notification, do I
send both the display name and username and just use the display, or do I only request the display name and
keep display + username separate in the db?

I guess the deciding factor is that the db will keep displayName and username as separate fields.

So if the frontend needs displayName only, it'll just get the displayName. And if it needs both, it'll get both.

The thing is though...

I want to avoid rewriting code.

What caused me to think about this was, I finished ("finished") my mock server, and started plugging the data into
Notifications. One of them needed author().display. So in that situation, should I write on the mock server, "author().display" to save myself writing it elsewhere? Maybe it doesn't matter.

#### JWT do's and don'ts

- don't store JWTs in localstorage. localstorage is scriptable. it's best if they are kept in httpOnly cookies.
- don't ever keep the secret that signs the token in the client. not ever. not even in development!
- don't decode the token in the browser. OAuth never.

- do use long, unguessable secrets. "256 bit"
- do keep token payload small because of bandwidth constraints
- do make sure you use HTTPS during production! HTTPS! for both client and server.

### Misc stuff

Reserved names:

1. anything with Admin or PostMassiv.
2. "home", "messages", "inbox", "explore", "search", "lists", "settings", "analytics", "i"

This is because these names are needed as routes.

Rules for usernames (taken from verifyUsernameAndPassword()):

1. Limit of 2 underscores.
2. Must be between 1 and 16 characters. (TODO: What is n? Must figure out max length...)
3. Cannot use "PostMassiv" or "Admin".
4. No spaces.

Rules for passwords:

1. Between 6 and 29 chars in length, inclusive.
2. Supports A-Z, a-z, 0-9, and special chars !@#\$%^&\*()\_+-=
