# Scatter Sunshine: A Community for Daily Positivity

[My Notes](notes.md)

Scatter Sunshine is a daily reflection platform inspired by the beloved hymn “There Is Sunshine in My Soul Today,” encouraging short, uplifting posts in a warm, faith-centered atmosphere. Each new post unlocks a real-time community feed with instant heart reactions, while a sun icon tracks your streak. Entries automatically expire at the day’s end for a fresh start every morning. 


## 🚀 Specification Deliverable

For this deliverable, I did the following. 

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Scatter Sunshine is an innovative twist on daily positivity, blending spiritual well-being into an optimistic social network. One post each day unlocks a feed of cheerful entries, sparking real-time encouragement through heart-reacts and streak-driven consistency. Whether you’re looking to cultivate an empowering routine of looking on the bright side or find uplifting support from a like-minded community, Scatter Sunshine is here to guide you toward a brighter life—one day at a time.


### Design
![Design image](positivityMockUI.jpg)


### Key features

- Secure login over HTTPS
- Daily 150-character positivity posts
- Real-time feed with heart reactions
- Sun icon for streak tracking
- Automatic expiry of daily entries

  
### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Three different views: login/register controls, positivity posting, and positivity feed.
- **CSS** - Complementary colour scheme and responsive design for different screen sizes.
- **JavaScript** – Handles user interactions (clicking “heart," posting positivity). Updates the UI in real-time through state changes.
- **React** - Single page application with routing between views and reactive user controls. 
- **Web Services** - Backend service with endpoints for authentication, submitting and retrieving posts, and real-time reactions. Third party call to get Zen quotes.
- **Authentication** – Register and login users. Users must be authenticated to post, view posts or react.
- **Database** - Stores authentication, positivity posts, and heart-react data. Automatically removes posts at midnight MST. 
- **WebSocket** - Broadcasts new posts and heart-reacts.
  

## 🚀 AWS deliverable

For this deliverable, I did the following. 

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://edwardscs.click).

## 🚀 HTML deliverable

For this deliverable I did the following. 

- [x] **HTML pages** - Three different pages. One for each view. `index.html` (Login/Register), `post.html`, and `feed.html`.
- [x] **Proper HTML element usage** - I researched for relevant elements that I could use. I used header, footer, main, nav, a, input, button, form, textarea, i, and img.
- [x] **Links** - Link in header called "Home" leads to login/register page. The login page automatically links to the post page and the post page automatically links to the feed page. 
- [x] **Text** - Each view has text instructions about the page. User name is displayed on post and feed page. 
- [x] **3rd party API placeholder** - Login/Register page has a place to display a ZEN quote.
- [x] **Images** - Image is displayed on the Login page.
- [x] **Login placeholder** - Placeholder for auth on the login page.
- [x] **DB data placeholder** - Gratitude posts displayed on feed page showing content stored in database.  
- [x] **WebSocket placeholder** - The feed page has placeholders for posts and heart reacts that will update in real-time. 

## 🚀 CSS deliverable

For this deliverable I did the following. 

- [x] **Header, footer, and main content body** - Each component is styled on all pages.
- [x] **Navigation elements** - I dropped the underline and changed the colour for which page is active.
- [x] **Responsive to window resizing** - My app looks great on almost all window sizes and devices.
- [x] **Application elements** - I used good contrast and whitespace.
- [x] **Application text content** - I used consistent font and sizes.
- [x] **Application images** - I styled an image on the Login/Register page. 

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following.

- [x] **Bundled using Vite** - React .jsx code is bundled into .js code in the dist directory using Vite.
- [x] **Components** - Login, Feed, and Post are all reactive components in the App component.
- [x] **Router** - Routing between login, feed and post components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
