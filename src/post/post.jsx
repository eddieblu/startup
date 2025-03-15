import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import './post.css';

export function Post(props) {
  const [postContent, setPostContent] = React.useState('');
  const [streak, setStreak] = React.useState(0);
  const [hasPostedToday, setHasPostedToday] = React.useState(false);

  // Generate unique id
  function generateId() {
    return uuidv4();
  }

  const navigate = useNavigate();

  React.useEffect(() => {
    const storedStreak = localStorage.getItem('streak');
    if (storedStreak) {
      setStreak(parseInt(storedStreak));
    }

    // TODO: I think instead of storing latestPost, make a fetch from service to retrieve user's 
    // post, and load that, else load empty 
    // GET /api/posts/:id

    const today = new Date().toDateString();
    const storedLastPostDate = localStorage.getItem('lastPostDate');
    const storedLatestPost = localStorage.getItem('latestPost');

    if (storedLastPostDate === today && storedLatestPost) {
      setPostContent(storedLatestPost);
      setHasPostedToday(true);
    }
  }, []);

  function updateStreak() {
    const today = new Date().toDateString();
    const storedLastPostDate = localStorage.getItem('lastPostDate');

    // TODO: potential feature is setting streak to 0 if missed a day of posting
    if (!storedLastPostDate || storedLastPostDate !== today) {
      setStreak(prev => {
        const newStreak = prev + 1;
        localStorage.setItem('streak', newStreak);
        return newStreak;
      });
      localStorage.setItem('lastPostDate', today);
    }
  }

  function handlePostSubmit(e) {
    e.preventDefault();

    const today = new Date().toDateString();
    localStorage.setItem('latestPost', postContent);
    
    if (!hasPostedToday) {
      updateStreak();
      setHasPostedToday(true);
    } else {
      localStorage.setItem('lastPostDate', today);
    }

    // Load existing posts array from localStorage
    let parsedPosts = [];
    const stored = localStorage.getItem('posts');
    if (stored) {
      parsedPosts = JSON.parse(stored);
    }
    
    const firstPost = parsedPosts[0];
    if (firstPost && firstPost.username === props.userName) {
      parsedPosts[0] = {
        ...parsedPosts[0],
        content: postContent,
      };
    } else {
      const userPost = {
        id: generateId(),
        username: props.userName,
        content: postContent,
        hearts: 0,
        isHeartedByCurrentUser: false,
      };
      parsedPosts.unshift(userPost);
    }

    localStorage.setItem('posts', JSON.stringify(parsedPosts));
    
    navigate('/feed');
  }

  return (
    <main className="body container-fluid text-center">
      <h1>Share Your Light</h1>
      <p className="label">Share your daily post to view sunshine posts from the community.</p>

      <div className="header-row">
        <p className="user-info">User: @{props.userName}</p>
        <div id="streak-counter">
          <FontAwesomeIcon icon={faSun} className="icon-gap" style={{ color: 'rgb(255, 208, 0)' }} />
          <span id="streak-count">{streak}</span> day streak
        </div>
      </div>

      <form onSubmit={handlePostSubmit}>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="4"
            maxLength="150"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="How did the sun shine for you today?"
          />
          <div className="form-text">
            Text limit is 150 characters.
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          {hasPostedToday ? 'Update' : 'Post'}
        </button>
      </form>
    </main>
  );
}