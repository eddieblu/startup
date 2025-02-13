import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './feed.css';

export function Feed() {
  return (
    <main className="body container-fluid text-center">
      <div className="container-fluid text-center">

        <h1>Sunlight Feed</h1>
        <div id="streak-counter">
          <FontAwesomeIcon
            icon={faSun}
            className="icon-gap"
            style={{ color: 'rgb(255, 208, 0)' }}
          />
          <span id="streak-count">4</span> day streak
        </div>
        <p>
          User: @<span>myusername</span>
        </p>
        <p>
          Thanks for scattering your sunshine with the community. You just made someone's day brighter!
        </p>
      </div>

      <div className="container my-4">
        <div className="row row-cols-1 row-cols-md-3 g-4">

          <div className="col">
            <div className="card h-100">
              <div className="card-header">
                @<span className="username">myusername</span>
              </div>
              <div className="card-body">
                <p className="card-text">
                  So grateful for my morning run and the blue skies!
                </p>
              </div>
              <div className="card-footer d-flex align-items-center">
                <button className="btn btn-link p-0 me-2" style={{ fontSize: '1.2rem' }}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-danger"
                  />
                </button>
                <span className="heart-count">3</span>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100">
              <div className="card-header">
                @<span className="username">username1</span>
              </div>
              <div className="card-body">
                <p className="card-text">
                  A stranger complimented my outfit :)
                </p>
              </div>
              <div className="card-footer d-flex align-items-center">
                <button className="btn btn-link p-0 me-2" style={{ fontSize: '1.2rem' }}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-danger"
                  />                </button>
                <span className="heart-count">3</span>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100">
              <div className="card-header">
                @<span className="username">username2</span>
              </div>
              <div className="card-body">
                <p className="card-text">
                  Got an A on my Stats Exam (phew)
                </p>
              </div>
              <div className="card-footer d-flex align-items-center">
                <button className="btn btn-link p-0 me-2" style={{ fontSize: '1.2rem' }}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-danger"
                  />                </button>
                <span className="heart-count">2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}