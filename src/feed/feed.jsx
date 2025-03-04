import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { PostCard } from './postCard';
import './feed.css';

export function Feed(props) {
  const [userPost, setUserPost] = React.useState(null);
  const [otherPosts, setOtherPosts] = React.useState([]);
  const [streak, setStreak] = React.useState(0);

  // Generate unique id
  function generateId() {
    return uuidv4();
  }

  // Generate random new posts (placeholder for WebSocket data)
  function generateNewPost() {
    const newPostUser = 'user' + Math.floor(Math.random() * 100000);
        
    const possibleMessages = [
      'I discovered a new soda shop!',
      'Just went for a run in the park!',
      'It’s a great day to learn React!',
      'God is so good!!!',
      'WebSockets are awesome!',
      'It’s my birthday today :O',
      'I GOT PAID',
      'A cute guy asked for my number <3',
      'One of my roommates washed all of my dishes',
      'Puppies are just so cuuuute',
      'The Oilers won the hockey game last night!!',
      'Matthew 14:27 "Be of good cheer; it is I; be not afraid."',
      'Our apartment got heart-attacked <33333',
    ];
    const newPostMessage = possibleMessages[Math.floor(Math.random() * possibleMessages.length)];

    const newPostHearts = 0;

    return {
      id: generateId(),
      username: newPostUser,
      content: newPostMessage,
      hearts: newPostHearts, // TODO: add heartedByCurrentUser
    };
  }


  React.useEffect(() => {
    // Load the streak
    const storedStreak = localStorage.getItem('streak');
    if (storedStreak) {
      setStreak(parseInt(storedStreak, 10));
    }

    
    // Create userPost from localStorage if latestPost exists
    const storedLatestPost = localStorage.getItem('latestPost');
    if (storedLatestPost) {
      setUserPost({
        id: generateId(),
        username: props.userName,
        content: storedLatestPost,
        hearts: 0, // TODO: do hearts logic later
      });
    } else {
      setUserPost(null);
    }
    
    // Create existing/placeholder posts
    const existingPosts = [
      {
        id: generateId(),
        username: 'user1',
        content: 'A stranger complimented my outfit :)',
        hearts: 3,
      },
      {
        id: generateId(),
        username: 'user2',
        content: 'Got an A on my Stats Exam (phew)',
        hearts: 2,
      },
    ];
    setOtherPosts(existingPosts);    

    // Start interval to generate new posts
    const intervalId = setInterval(() => {
      const newPost = generateNewPost();
      setOtherPosts((prevPosts) => [...prevPosts, newPost]);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [props.userName]);

  // Gate: if user has not posted, show message
  if (!userPost) {
    return (
      <main className="body container-fluid text-center">
        <h1>Sunlight Feed</h1>
        <p>Post your sunshine before accessing the feed!</p>
      </main>
    )
  }

  return (
    <main className="body container-fluid text-center">
      <h1>Sunlight Feed</h1>
      <p className="label">Thanks for sharing. You just made someone's day brighter!</p>

      {/* Streak + user info row */}
      <div className="header-row">
        <p className="user-info">User: @{props.userName}</p>
        <div id="streak-counter">
          <FontAwesomeIcon icon={faSun} className="icon-gap" style={{ color: 'rgb(255, 208, 0)' }} />
          <span id="streak-count">{streak}</span> day streak
        </div>
      </div>

      {/* Feed */}
      <div className="container my-4">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          
          {/* User's post */}
          <div className="col" key={userPost.id}>
            <PostCard
              username={userPost.username}
              content={userPost.content}
              hearts={userPost.hearts}
            />
          </div>

          {/* Other posts */}
          {otherPosts.map((post) => (
            <div className="col" key={post.id}>
              <PostCard
                username={post.username}
                content={post.content}
                hearts={post.hearts}
              />
            </div>
          ))}

        </div>
      </div>
    </main>
  );
}