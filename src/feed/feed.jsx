import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { PostCard } from './postCard';
import './feed.css';

export function Feed(props) {
  const [posts, setPosts] = React.useState([]);
  const [streak, setStreak] = React.useState(0);
  const [userHasPosted, setUserHasPosted] = React.useState(false);

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

    return {
      id: generateId(),
      username: newPostUser,
      content: newPostMessage,
      hearts: 0,
      isHeartedByCurrentUser: false,
    };
  }

  // Update hearts if post is hearted 
  function toggleIsHearted(postId) {
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((p) => {
        if (p.id == postId) {
          if (p.isHeartedByCurrentUser) {
            return {
              ...p,
              hearts: (p.hearts - 1),
              isHeartedByCurrentUser: false
            }
          } else {
            return {
              ...p,
              hearts: (p.hearts + 1),
              isHeartedByCurrentUser: true
            };
          }
        }
        return p;
      });

      localStorage.setItem('posts', JSON.stringify(updatedPosts));

      // return to update state
      return updatedPosts;
    });
  }

  React.useEffect(() => {
    // Load the streak
    const storedStreak = localStorage.getItem('streak');
    if (storedStreak) {
      setStreak(parseInt(storedStreak, 10));
    }

    // Check for and load existing posts
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      setPosts(parsedPosts);

      const storedUserPost = parsedPosts.find(p => p.username === props.userName);
      setUserHasPosted(!!storedUserPost);
    } 

    // Start interval to generate new posts
    const intervalId = setInterval(() => {
      const newPost = generateNewPost();
      // setPosts((prevPosts) => [...prevPosts, newPost]);
      setPosts((prevPosts) => {
        const updatedPosts = [...prevPosts, newPost];
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        return updatedPosts;
      })
    }, 10000);

    return () => clearInterval(intervalId);
  }, [props.userName]);

  // Gate: if user has not posted, show message
  if (!userHasPosted) {
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
          {posts.map((post) => (
            <div className="col" key={post.id}>
              <PostCard
                post={post}
                onToggleHeart={toggleIsHearted}
              />
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}