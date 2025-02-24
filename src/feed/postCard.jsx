import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export function PostCard({ username, content, hearts }) {
  return (
    <div className="card h-100">
      <div className="card-header">@<span className="username">{username}</span></div>
      <div className="card-body">
        <p className="card-text">{content}</p>
      </div>
      <div className="card-footer d-flex align-items-center">
        <button className="btn btn-link p-0 me-2" style={{ fontSize: '1.2rem' }}>
          <FontAwesomeIcon icon={faHeart} className="text-danger" />
        </button>
        <span className="heart-count">{hearts}</span>
      </div>
    </div>
  );
}