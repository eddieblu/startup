import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './feed.css';

export function Feed(props) {
  const [userPost, setUserPost] = React.useState(null);
  const [otherPosts, setOtherPosts] = React.useState([]);
  const [streak, setStreak] = React.useState(0);

  // Helper to generate random new posts (placeholders for WebSocket data)
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

    // Cleanup interval when unmounting
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
          {/* user's post is always first */}
          {userPost && (
            <div className="col" key="userPost">
              <div className="card h-100">
                <div className="card-header">
                  @<span className="username">{userPost.username}</span>
                </div>
                <div className="card-body">
                  <p className="card-text">{userPost.content}</p>
                </div>
                <div className="card-footer d-flex align-items-center">
                  <button className="btn btn-link p-0 me-2" style={{ fontSize: '1.2rem' }}>
                    <FontAwesomeIcon icon={faHeart} className="text-danger" />
                  </button>
                  <span className="heart-count">{userPost.hearts}</span>
                </div>
              </div>
            </div>
          )}


          {/* other posts follow */}
          {otherPosts.map((post, idx) => (
            <div className="col" key={idx}>
              <div className="card h-100">
                <div className="card-header">
                  @<span className="username">{post.username}</span>
                </div>
                <div className="card-body">
                  <p className="card-text">{post.content}</p>
                </div>
                <div className="card-footer d-flex align-items-center">
                  <button className="btn btn-link p-0 me-2" style={{ fontSize: '1.2rem' }}>
                    <FontAwesomeIcon icon={faHeart} className="text-danger" />
                  </button>
                  <span className="heart-count">{post.hearts}</span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>


    </main>
  );
}