import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import './post.css';

export function Post() {
  return (
    <main className="container-fluid text-center">
      <div>
        <h1>Share Your Light</h1>
        <div id="streak-counter">
          <FontAwesomeIcon 
            icon={faSun} 
            className="icon-gap"
            style={{ color: 'rgb(255, 208, 0)' }} 
          />
          <span id="streak-count">3</span> day streak
        </div>
        <p>
          User: @<span>myusername</span>
        </p>
      </div>

      <form method="get" action="feed">
        <div className="mb-3">
          <label for="postTextarea" className="form-label">Share your daily post to view sunshine posts from the
            community.</label>
          <textarea className="form-control" id="postTextarea" rows="4" placeholder="How did the sun shine for you today?" maxlength="150"></textarea>
          <div className="form-text">
            Text limit is 150 characters.
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Post</button>
      </form>
    </main>
  );
}