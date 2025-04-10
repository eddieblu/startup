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

  React.useEffect(() => {

    fetch(`/api/posts/user/${props.userName}`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.id) {
          setUserHasPosted(true);
          setStreak(data.streak);

          fetch('/api/posts', {
            method: 'GET',
            credentials: 'include'
          })
            .then((res) => res.json())
            .then((allPosts) => {
              setPosts(allPosts);
            })
            .catch(err => console.error('Error fetching all posts:', err));
        } else {
          setStreak(data ? data.streak : 0);
          setUserHasPosted(false);
        }
      })
      .catch((err) => {
        console.error('Error checking user post:', err);
      });
  }, [props.userName]);

  function toggleIsHearted(postId) {
    fetch(`/api/posts/${postId}/heart`, {
      method: 'PATCH',
      credentials: 'include'
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to toggle heart. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((updatedPost) => {
        setPosts((prevPosts) => {
          return prevPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p));
        });
      })
      .catch((err) => {
        console.error('Error toggling heart:', err);
      });
  }

  // Gate: if user has not posted, show message
  if (!userHasPosted) {
    return (
      <main className="body container-fluid text-center">
        <h1>Sunlight Feed</h1>
        <p>Post your sunshine before accessing the feed!</p>
      </main>
    )
  };

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
                onToggleHeart={(postId) => toggleIsHearted(postId)}
              />
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}