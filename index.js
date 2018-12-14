var email = require('./email');

var tentativas = 1;

var friendList = [
  {
    name: "### first friend name ###",
    email: "### first friend email ###",
    secretFriend: null
  },
  {
    name: "### second friend name ###",
    email: "### second friend email ###",
    secretFriend: null
  },
  {
    name: "### third friend name ###",
    email: "### third friend email ###",
    secretFriend: null
  },
  {
    name: "### fourth friend name ###",
    email: "### fourth friend email ###",
    secretFriend: null
  }
];
var unselectedEmails;
function resetEmails() {
  unselectedEmails = [];
  friendList.map(function (friend, index) {
    unselectedEmails.push(friend.email);
  });
}

function getRandomFriend() {
  var randomIndex = Math.floor(Math.random() * unselectedEmails.length);
  return getFriendByEmail(unselectedEmails[randomIndex]);
}

function secretFriendIsValid(secretFriend, friend) {
  if (secretFriend.email === friend.email) {
    return false;
  }
  if (unselectedEmails.indexOf(secretFriend.email) === -1) {
    return false;
  }
  return true;
}

function getFriendByEmail(email) {
  for (var i = 0; i < friendList.length; ++i) {
    if (friendList[i].email === email) {
      return friendList[i];
    }
  }
  return null;
}

function getNewSecretFriend(friend, isTheLast) {
  var secretFriend = getRandomFriend();
  if (isTheLast) {
    return secretFriend;
  }
  if (secretFriendIsValid(secretFriend, friend)) {
    unselectedEmails.splice(unselectedEmails.indexOf(secretFriend.email), 1);
    return secretFriend;
  }
  return getNewSecretFriend(friend, isTheLast);
}

function selectFriends() {
  resetEmails();
  var lastFriend;
  var secretFriend;
  friendList.map(function (friend, index) {
    secretFriend = getNewSecretFriend(friend, index === friendList.length - 1);
    friend.secretFriend = secretFriend.email;
  });

  lastFriend = friendList[friendList.length - 1];

  console.log("Tentativa:", tentativas);
  tentativas++;

  if (!secretFriendIsValid(getFriendByEmail(lastFriend.secretFriend), lastFriend)) {
    selectFriends();
  }
}

selectFriends();

friendList.map(function (friend) {
  friend = JSON.parse(JSON.stringify(friend));
  friend.secretFriend = getFriendByEmail(friend.secretFriend);
  email.email.send(friend);
});