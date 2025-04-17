import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { PostCard } from './postCard';
import './feed.css';

export function Feed(props) {
  const [posts, setPosts] = React.useState([]);
  const [streak, setStreak] = React.useState(0);
  const [userHasPosted, setUserHasPosted] = React.useState(false);

  React.useEffect(() => {
    fetch(`/api/posts/user/${props.userName}`, { method: 'GET', credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data && data.id) {
          setUserHasPosted(true);
          setStreak(data.streak);

          fetch('/api/posts', { method: 'GET', credentials: 'include' })
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

  React.useEffect(() => {
    // 1. open the socket
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const host = window.location.host;
    const ws = new WebSocket(`${protocol}://${host}/ws`);

    // 2. react to messages
    ws.onmessage = (event) => {
      const { type, post } = JSON.parse(event.data || '{}');

      if (type === 'new-post') {
        // prepend or append – up to you
        setPosts((prev) => [post, ...prev]);
      } else if (type === 'heart' || type === 'edit-post') {
        // Replace the post but keep viewer-specific fields
        setPosts(prev =>
          prev.map(p =>
            p.id === post.id ? { ...post, isHeartedByCurrentUser: p.isHeartedByCurrentUser } : p
          )
        );
      }
    };

    return () => ws.close();            // 3. tidy up on unmount
  }, []);                               // empty deps = open once


  function toggleIsHearted(postId) {
    fetch(`/api/posts/${postId}/heart`, { method: 'PATCH', credentials: 'include' })
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