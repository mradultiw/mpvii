const express = require("express");
const app = express();
const port = 8000;
var bodyParser = require("body-parser");
const uri = "mongodb://localhost:27017";
const { MongoClient } = require("mongodb");
const dbClient = new MongoClient(uri, { useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

try {
  dbClient.connect();
  console.log("Client connected to db successfully!!");
} catch (e) {
  console.error(e);
}

const getUsers = async (id) => {
  return await dbClient.db("mpvii").collection("users").findOne({ userid: id });
};

const addNewPost = async (newpost) => {
  await dbClient
    .db("mpvii")
    .collection("users")
    .updateOne(
      { userid: newpost.userid },
      {
        $push: {
          posts: {
            $each: [
              {
                timestamp: newpost.timestamp,
                body: newpost.body,
                postid: newpost.postid,
              },
            ],
          },
        },
      }
    )
    .then(() => console.log("db: new post addedd successfully"))
    .catch((e) => {
      console.log(`db: error while adding new post: ${e}`);
    });
};

const deletePost = async (userid, postid) => {
  console.log(`deletion requested for user: ${userid}; post: ${postid}`);
  await dbClient
    .db("mpvii")
    .collection("users")
    .updateOne(
      { userid: userid },
      {
        $pull: {
          posts: {
            postid: postid,
          },
        },
      }
    )
    .then(() => console.log("db: post deleted successfully"))
    .catch((e) => {
      console.log(`db: error while deleting new post: ${e}`);
    });
};

const isFriend = async (userid, friend) => {
  // return if 'friend' is already friend of 'userid'
  const userinfo = await dbClient
    .db("mpvii")
    .collection("users")
    .findOne({ userid: userid });
  console.log(
    `isFriend > ${userid}, ${friend}: ${
      userinfo.friends
    } || ${userinfo.friends.includes(friend)}`
  );

  return userinfo.friends.includes(friend);
};

const removeFromRecommendation = (userid, friend) => {
  // remove 'friend' from recommendations of 'userid' if exist
  dbClient
    .db("mpvii")
    .collection("users")
    .updateOne(
      { userid: userid },
      {
        $pull: {
          recommendations: friend,
        },
      }
    )
    .then(() => console.log("db: removed from recommendations successfully"))
    .catch((e) => {
      console.log(
        `db: error while deleting removing from recommendations: ${e}`
      );
    });
};

const addFriend = async (currentuser, friend) => {
  console.log(`addFriend: ${currentuser}, ${friend}`);
  if ((await isFriend(currentuser, friend)) === true) {
    console.log(`Already friends: ${currentuser}, ${friend}`);
    return;
  }
  removeFromRecommendation(currentuser, friend);
  await dbClient
    .db("mpvii")
    .collection("users")
    .updateOne(
      { userid: currentuser },
      {
        $push: {
          friends: {
            $each: [friend],
          },
        },
      }
    )
    .then(() => console.log("db: friend added successfully"))
    .catch((e) => {
      console.log(`db: error while adding friend: ${e}`);
    });
};

const removeFriend = async (currentuser, friend) => {
  console.log(`removeFriend: ${currentuser}, ${friend}`);
  await dbClient
    .db("mpvii")
    .collection("users")
    .updateOne(
      { userid: currentuser },
      {
        $pull: {
          friends: friend,
        },
      }
    )
    .then(() => console.log("db: friend removed successfully"))
    .catch((e) => {
      console.log(`db: error while deleting removing: ${e}`);
    });
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/posts", async (req, res) => {
  const user = await getUsers(Number(req.query.userid)).catch(`ERROR OCCURED`);
  res.send(user.posts); // array
});
app.get("/userinfo", async (req, res) => {
  const user = await getUsers(Number(req.query.userid)).catch(`ERROR OCCURED`);
  let userinfo = {
    username: user.username,
    personality: user.personality,
    age: user.age,
  };
  res.send(userinfo); // object
});
app.get("/username", async (req, res) => {
  const user = await getUsers(Number(req.query.userid)).catch(`ERROR OCCURED`);
  res.send(user.username);
});
app.get("/personality", async (req, res) => {
  const user = await getUsers(Number(req.query.userid)).catch(`ERROR OCCURED`);
  res.send(user.personality);
});
app.get("/friendsandrecommendation", async (req, res) => {
  const user = await getUsers(Number(req.query.userid)).catch(`ERROR OCCURED`);
  res.send([user.friends, user.recommendations]); //array of arrays
  /**
   * in real case scenario, return type will be:
   * [array_of_friends, Object_of_recommendations]
   * where index 0 is list of friends and index 1 is key value pair
   * where key is recommended user and it's value is score.
   *
   * For frontend testing, I've stored recommendations in the DB itself
   * but for real case, recommendations will be computed on demand. For
   * Recommendations, we have four parameters:
   *      Age, Tags, PersonalityType, MutualConnection
   * where first 3 are stored in user's profile itself and
   *  mutual connection will be checked in a hashset that will be created
   * by union of all friends of each friend in this.userid's friendlist.
   *
   * Finally, after this computation, [array_of_friends, Object_of_recommendations]
   * will be constructed and sent to frontend.
   */
});
app.get("/interesttags", async (req, res) => {
  const user = await getUsers(Number(req.query.userid)).catch(`ERROR OCCURED`);
  res.send(user.interesttags); //array
});
app.post("/addnewpost", async (req, res) => {
  console.log(`adding new post:${req.body}`);
  // for (const t in req) console.log(`>> ${t}`);
  await addNewPost(req.body)
    .then(() => {
      console.log("new post added successfully!!");
      res.send("post added successfully!");
    })
    .catch((e) => {
      console.log(`Error while adding new post: ${e}`);
      res.status(400);
    });
});
app.get("/deletepost", async (req, res) => {
  deletePost(Number(req.query.userid), Number(req.query.postid))
    .then(() => {
      console.log("post deleted successfully!!");
      res.send("post deleted successfully!");
    })
    .catch((e) => {
      console.log(`Error while deleting post: ${e}`);
      res.status(400);
    });
});
app.get("/addfriend", async (req, res) => {
  await addFriend(Number(req.query.activeUser), Number(req.query.userid))
    .then(() => {
      console.log("friend added successfully!!");
      res.send("friend added successfully!");
    })
    .catch((e) => {
      console.log(`Error while adding new post: ${e}`);
      res.status(400);
    });
});
app.get("/removefriend", async (req, res) => {
  await removeFriend(Number(req.query.activeUser), Number(req.query.userid))
    .then(() => {
      console.log("friend removed successfully!!");
      res.send("friend removed successfully!");
    })
    .catch((e) => {
      console.log(`Error while adding new post: ${e}`);
      res.status(400);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
