### JWT token vs Refresh token

Refresh tokens are set by the account.service.js file function,

function generateRefreshToken(account, ipAddress) {
// create a refresh token that expires in 7 days
return new db.RefreshToken({
account: account.id,
token: randomTokenString(),
expires: new Date(Date.now() + 7*24*60*60*1000),
createdByIp: ipAddress
});
}

and then in all cases sent along to the setRefreshTokenCookie() function by
returning newRefreshToken.token and sending it along.

setRefreshTokenCookie labels the cookie "refreshToken".

The JWT token, on the other hand, is created by account.service.js's function,

function generateJwtToken(account) {
// create a jwt token containing the account id that expires in 15 minutes
return jwt.sign({ sub: account.id, id: account.id }, config.jwtSecret, {
expiresIn: "15m",
});

}

generateJwtToken is used by both the signIn/authenticate functions, and the refreshToken function.

Note that the JWT contains a "sub" property and an "id" property, both of which are the account's id.
OTOH the refresh token contains account, token (a random string), an expiration date, and the ip it was made by.

The jwtToken is created using jwt.sign(). It is sent along as part of the user object. (The frontend accesses it via the user object!)

The refresh token is just like ????? it apparently is just a random string passed in a cookie named refreshToken.

### Inputs required for auth related outputs

To authenticate/sign in, via /auth/signIn, you need: username || email, and password.
The server returns an account object, a jwt cookie, and a refresh token cookie (httpOnly).

To register/sign up, via /auth/signUp, you need: ...

To refresh a token, via /auth/refreshToken, you need a valid refresh token and the same IP address as what created the refresh token. This refresh token is in the database already carrying info about:
(1) the account id that created the token
(2) a 40 char random token string
(3) a 7 day expiry date
(4) the ip that created the token

To revoke a refresh token, via /auth/revokeToken, you need the refresh token you are revoking inbound on the cookies.
The person doing the revoking either has to be the user who the token is assigned to, or a mod/admin.

### account creation flow

1. User inputs first & last name, date of birth, and email. Email is validated server side:

    - "Is the first & last name an acceptable form?"
    - "Is the date of birth older than 13?"
    - "Is the email the form of an email AND not yet taken?"

    If these inputs are acceptable, the server replies "ok" and the user is moved onto step 2.

2. User inputs a username & password. Username is validated server side:

    - "Is the username an acceptable form?"
    - "Is the password at least 6 chars?"

    If the username is OK & not taken, & the PW is ok, the user has a verification code sent to their email.

3. User looks @ their email, gets the verification code, pastes it into the input field and sends it to server.

    If the verification code is correct, the account is created in the system.
