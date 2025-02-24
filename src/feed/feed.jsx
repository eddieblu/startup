import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { PostCard } from './postCard';
import './feed.css';

export function Feed(props) {
  const [userPost, setUserPost] = React.useState(null);
  const [otherPosts, setOtherPosts] = React.useState([]);
  const [streak, setStreak] = React.useState(0);

  // Helper to generate random new posts (placeholder for WebSocket data)
  function generateRandomPost() {
    const randomUser = 'randomUser' + Math.floor(Math.random() * 100000);
    
    
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
    const randomMessage = possibleMessages[Math.floor(Math.random() * possibleMessages.length)];

    const randomHearts = Math.floor(Math.random() * 10);

    return {
      username: randomUser,
      content: randomMessage,
      hearts: randomHearts,
    };
  }


  React.useEffect(() => {
    const storedStreak = localStorage.getItem('streak');
    if (storedStreak) {
      setStreak(parseInt(storedStreak, 10));
    }

    const storedLatestPost = localStorage.getItem('latestPost');
    if (storedLatestPost) {
      setUserPost({
        username: props.userName,
        content: storedLatestPost,
        hearts: 0, // TODO: do hearts logic later
      });
    } else {
      setUserPost(null);
    }

    const existingPosts = [
      {
        username: 'randomUser1',
        content: 'A stranger complimented my outfit :)',
        hearts: 3,
      },
      {
        username: 'randomUser2',
        content: 'Got an A on my Stats Exam (phew)',
        hearts: 2,
      },
    ];
    setOtherPosts(existingPosts);    

    const intervalId = setInterval(() => {
      const newRandomPost = generateRandomPost();
      setOtherPosts((prevPosts) => [...prevPosts, newRandomPost]);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [props.userName]);

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

      <div className="container my-4">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {/* User's post */}
          <div className="col" key="userPost">
            <PostCard
              username={userPost.username}
              content={userPost.content}
              hearts={userPost.hearts}
            />
          </div>

          {/* Other posts */}
          {otherPosts.map((post, idx) => (
            <div className="col" key={idx}>
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