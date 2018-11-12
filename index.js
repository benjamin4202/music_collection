var user_input = process.stdin,
    collection = [];

user_input.setEncoding('utf-8');

class MusicCollection {
    constructor(collection) {
        this.collection = collection;
        console.log("\nWelcome to your music collection!\n");
    }
    
    // Add artist/album to music collection
    add(data) {
        var itemLowercase = data.toLowerCase(),
            item = itemLowercase.split('"'),
            returnedString = "",
            found = false;
       // Check to see if the album is already in the collection
        if (this.collection.length > 0 ) {
            this.collection.forEach( function(addItem) {
                if (item[1] === addItem.album) {
                    found = true;
                }
            });
        }
        // If the album in not in the collection, add it.
        if(!found) {
            this.collection.push({
                "artist": item[3],
                "album": item[1],
                "played": false
            });
            returnedString = '\nAdded "' + 
                             this.toTitleCase(item[1]) + 
                             '\" by ' + this.toTitleCase(item[3]) + 
                             '\n';
        }else{
            returnedString = "This album is already in your library."
        }
        
        console.log(returnedString);
    }

    // Function to change the output to title case
    toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() 
                   + txt.substr(1).toLowerCase();
        });
    }

    // Play a song from the collection
    play(data) {   
        var self = this,
            found = false,
            playString = "";

        this.collection.forEach( function(item) {
            if (data.toLowerCase() === item.album) {
                item.played = true;
                found = true;
                playString = "\nYou're listening to \"" + self.toTitleCase(item.album) + "\"\n";
            }
        });

        // If there is no matching album name, tell the user.
        if(!found) {
            playString = "Album not found.\n";
        } 

        console.log(playString);
    }
    // Output all items in the collection
    showAll() {

        var self = this,
            hasBeenPlayed = "";
       
        console.log("\n");

        if (this.collection.length > 0) {
            this.collection.forEach( function(collectionItem) {               
                
                collectionItem.played ? hasBeenPlayed = "played" 
                                      : hasBeenPlayed = "unplayed";
    
                console.log("\"" + self.toTitleCase(collectionItem.album) 
                            + "\" by " + self.toTitleCase(collectionItem.artist)
                            + " (" + hasBeenPlayed + ")");
            });
        } else {
            console.log("\nYou have no music in your collection. Add some!");
        }

        console.log("\n");
    }
    // Output all items from the specified artist
    showAllBy(data) {

        var self = this,
            hasBeenPlayed = "";

        console.log("\n");

        this.collection.forEach( function(item) {

            item.played ? hasBeenPlayed = "played" 
                                  : hasBeenPlayed = "unplayed";

            if (data.toLowerCase() === item.artist) {
                console.log('\n\"' + self.toTitleCase(item.album) 
                            + '\" by ' + self.toTitleCase(item.artist)
                            + "(" + hasBeenPlayed + ")");
            }
        });

        console.log("\n");
    }

    // Show all items that are unplayed
    showUnplayed() {

        var self = this;

        console.log("\n");

        collection.forEach( function(item) {
            if (!item.played) {
                console.log('\"' + self.toTitleCase(item.album) 
                + '\" by ' + self.toTitleCase(item.artist));
            }
        });

        console.log("\n");
    }

    // Show all unplayed albums by the specified artist
    showUnplayedBy(data) {

        var self = this;

        console.log("\n");

        this.collection.forEach( function(item) {
            if (data.toLowerCase() === item.artist && !item.played) {
                console.log('\n\"' + self.toTitleCase(item.album) 
                + '\" by ' + self.toTitleCase(item.artist));
            }
        });

        console.log("\n");
    }
}

// Start new music collection
var music_collection = new MusicCollection(collection);

// Wait for user input to determine what to do
user_input.on('data', function (data) {
 
    var dataArray = data.split('"'),
        command = dataArray[0].replace(/\s/g, '');

    switch(command) {
        case "add":
            music_collection.add(data);
            break;
        case "play":
            music_collection.play(dataArray[1]);
            break;
        case "showall":
            music_collection.showAll();
            break;
        case "showallby":
            music_collection.showAllBy(dataArray[1]);
            break;
        case "showunplayed":
            music_collection.showUnplayed();
            break;
        case "showunplayedby":
            music_collection.showUnplayedBy(dataArray[1]);
            break;
        case "quit":
            console.log("\nBye!\n");
            process.exit();
            break;
        default:
            console.log('\nThat is not an option.\n');
    }
});
