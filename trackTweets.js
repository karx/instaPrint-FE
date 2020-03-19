// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBHzSxoTbyaFqrgM3X-5f8Sl6Yk3MvlwSI",
    authDomain: "instaprint-tw.firebaseapp.com",
    databaseURL: "https://instaprint-tw.firebaseio.com",
    projectId: "instaprint-tw",
    storageBucket: "instaprint-tw.appspot.com",
    messagingSenderId: "579783101140",
    appId: "1:579783101140:web:4804265caf1c7da610c941",
    measurementId: "G-X5T5PYHC2E"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
let db = firebase.firestore();

let hastag = 'instaprintmytweet';
db.collection(hastag).where("hasBeenProcessed", "==", false)
    .onSnapshot(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
            let tweetData = doc.data();
            console.log("Current data: ", tweetData);

            addTweetToHTML(tweetData);
        });
    });

function addTweetToHTML(tweet) {
    // http://140dev.com/free-twitter-api-source-code-library/twitter-display/tweet-template-txt/
    let tweetHTML_Template = `<div class="tweet" id="${tweet.id_str}">
    <div class="tweet_id hidden">${tweet.id_str}</div>
    <div class="tweet_image">
      <a href="http://twitter.com/${tweet.user.screen_name}" 
      title="${tweet.user.name}">
      <img src="${tweet.user.profile_image_url}" width="48" height="48"></a>		
    </div>
    <div class="tweet_right">
      <div class="tweet_screen_name">
        <a href="http://twitter.com/${tweet.user.screen_name}" 
          title="${tweet.user.name}">${tweet.user.screen_name}</a>
        <span class="tweet_name">${tweet.user.screen_name}</span>
      </div>
      <div class="tweet_text">${tweet.text}
        <div class="tweet_date">
          <a href="http://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}" 
            title="${tweet.text}">${tweet.created_at}</a>
        </div>
      </div>
    </div>
  </div>`;

  
//   let el = document.createElement(div);
  document.getElementById('toPushNewTweets').insertAdjacentHTML('beforeend', tweetHTML_Template);
  printTweet(tweet.id_str);
}


// Below this only for debug and demo | Not for prod
db.collection(hastag).where("hasBeenProcessed", ">", false)
    .onSnapshot(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
            let tweetData = doc.data();
            console.log("Old data: ", tweetData);

            addTweetToHTMLOld(tweetData);
        });
    });

function addTweetToHTMLOld(tweet) {
    // http://140dev.com/free-twitter-api-source-code-library/twitter-display/tweet-template-txt/
    let tweetHTML_Template = `<div class="tweet completed" id="${tweet.id_str}">
    <div class="tweet_id hidden">${tweet.id_str}</div>
    <div class="tweet_image">
      <a href="http://twitter.com/${tweet.user.screen_name}" 
      title="${tweet.user.name}">
      <img src="${tweet.user.profile_image_url}" width="48" height="48"></a>		
    </div>
    <div class="tweet_right">
      <div class="tweet_screen_name">
        <a href="http://twitter.com/${tweet.user.screen_name}" 
          title="${tweet.user.name}">${tweet.user.screen_name}</a>
        <span class="tweet_name">${tweet.user.screen_name} 🖨</span>
      </div>
      <div class="tweet_text">${tweet.text} 
        <div class="tweet_date">
          <a href="http://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}" 
            title="${tweet.text}">${tweet.created_at}</a>
        </div>
      </div>
    </div>
  </div>`;

//   let el = document.createElement(div);
  document.getElementById('oldAlready').insertAdjacentHTML('beforeend', tweetHTML_Template);
  
}
