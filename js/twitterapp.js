/********************************************************
 * AUTHOR: VISHAAN TIWARIE  
 * 
 * DESCRIPTIONS: Unobtrusive javascript functions and JQuery to gather 
 * up to 20 tweets from twitter using JSON
 */

function getTwitterPosts() 
{    
    //get references to the DOM
    var user = document.forms['tweetForm'].username.value;
    var num = document.forms['tweetForm'].quantity.value;
            
    //User input validation
    if(user == "")
    {
        alert('Please enter a username');
        return false;
    }
            
    //User input validation
    if(isNaN(num) || num == "")
    {
        alert('Please enter a number');
        return false;
    }
    jsonURL = 'http://api.twitter.com/1/statuses/user_timeline/' + user + '.json?callback=?';   


    $("#twitterDiv").empty();

    //Grab tweets from twitter with JSON via JQuery
    $.getJSON(jsonURL, function (posts) 
    {        
        var content = "<table cellspacing=15>";   
        content += "<tr><th colspan=2>" + user + "</th></tr>";

        for (var i=0; i<num; i++) 
        {            
            //limit tweets to amount given by JSON 
            if(i<posts.length)
            {
                //Grab a tweet if it's not null
                if(posts[i] !== "")
                {
                    content += "<tr><td><b>Tweet#" + (i+1) + "</b>" + "</td><td>" + posts[i].text + "</td></tr>";
                }
                else
                {
                    break;
                }
            }
        }

        content += "<tr><td style='background-color:white' colspan=2><span>Tweets Found: " + posts.length + "</span></td></tr>";
        content += "</table>";        
        $("#twitterDiv").append(content);
        return true;
    });
    return false;
}
        
window.onload = function()
{
    document.getElementById('tweetForm').onsubmit =  getTwitterPosts;
}