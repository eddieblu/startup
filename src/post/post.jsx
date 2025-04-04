import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './post.css';

export function Post(props) {
  const [postContent, setPostContent] = React.useState('');
  const [streak, setStreak] = React.useState(0);
  const [hasPostedToday, setHasPostedToday] = React.useState(false);
  const [postId, setPostId] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    fetch(`/api/posts/user/${props.userName}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) {
          setStreak(data.streak);
          setPostContent(data.content);
          setHasPostedToday(true);
          setPostId(data.id);
        } else {
          setStreak(data ? data.streak : 0);
          setPostContent('');
          setHasPostedToday(false);
          setPostId(null);
        }
      })
      .catch((err => {
        console.error('Error fetching post:', err);
      }));

  }, [props.userName]);

  function handlePostSubmit(e) {
    e.preventDefault();

    if (hasPostedToday && postId) {
      // patch
      fetch(`/api/posts/${postId}/content`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: postContent })
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
          }
          return res.json();
        })
        .then((updatedPost) => {
          // console.log('Updated post:', updatedPost);
          navigate('/feed');
        })
        .catch((err) => {
          console.error('Error updating post:', err);
        });
    } else {
      //post
      fetch(`/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: postContent })
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
          }
          return res.json();
        })
        .then((createdPost) => {
          // console.log('New post created:', createdPost);
          navigate('/feed');
        })
        .catch((err) => {
          console.error('Error creating post:', err);
        });
    }

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