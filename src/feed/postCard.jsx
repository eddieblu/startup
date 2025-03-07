import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export function PostCard({ post, onToggleHeart }) {
  // Decide heart color
  const heartColor = post.isHeartedByCurrentUser ? 'text-danger' : 'text-secondary';

  function handleHeartClick() {
    onToggleHeart(post.id);
  }

  return (
    <div className="card h-100">
      <div className="card-header">
        <span className="username">@{post.username}</span>
      </div>
      <div className="card-body">
        <p className="card-text">{post.content}</p>
      </div>
      <div className="card-footer d-flex align-items-center">
        <button
          className="btn btn-link p-0 me-2"
          style={{ fontSize: '1.2rem' }}
          onClick={handleHeartClick}
        >
          <FontAwesomeIcon icon={faHeart} className={heartColor} />
        </button>
        <span className="heart-count">{post.hearts}</span>
      </div>
    </div>
  );
}