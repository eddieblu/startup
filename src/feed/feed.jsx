import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './feed.css';

export function Feed(props) {
  const [postContent, setPostContent] = React.useState('');
  const [streak, setStreak] = React.useState(0);


  React.useEffect(() => {
    const storedLatestPost = localStorage.getItem('latestPost');
    if (storedLatestPost) {
      setPostContent(storedLatestPost);
    }

    const storedStreak = localStorage.getItem('streak');
    if (storedStreak) {
      setStreak(parseInt(storedStreak));
    }
  }, []);

  return (
    <main className="body container-fluid text-center">
      <h1>Sunlight Feed</h1>
      <p className="label">Thanks for sharing. You just made someone's day brighter!</p>

      <div className="header-row">
        <p className="user-info">User: @{props.userName}</p>
        <div id="streak-counter">
          <FontAwesomeIcon icon={faSun} className="icon-gap" style={{ color: 'rgb(255, 208, 0)' }} />
          <span id="streak-count">{streak}</span> day streak
        </div>
      </div>


      <div className="container my-4">
        <div className="row row-cols-1 row-cols-md-3 g-4">

          <div className="col">
            <div className="card h-100">
              <div className="card-header">
                @<span className="username">{props.userName}</span>
              </div>
              <div className="card-body">
                <p className="card-text">
                  {postContent}
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