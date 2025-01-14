# Sunshine Gratitude

[My Notes](notes.md)

**Sunshine Gratitude** is a daily reflection platform inspired by the beloved hymn “There Is Sunshine in My Soul Today,” encouraging short (up to 150 characters), uplifting gratitude posts in a warm, faith-centered atmosphere. Each new post unlocks a real-time community feed with instant heart reactions, while a sun icon tracks your streak. Entries automatically expire at day’s end for a fresh start every morning, and an admin-only dashboard ensures simple, secure user management.

> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.


## 🚀 Specification Deliverable
For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [ ] Description of key features
- [ ] Description of how you will use each technology
- [ ] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Sunshine Gratitude is an innovative twist on daily gratitude, blending spiritual well-being into a faith-based social network. One post each day unlocks a feed of uplifting entries, sparking real-time encouragement through heart-reacts and streak-driven consistency. Whether you’re looking to cultivate a deeper spiritual routine or find uplifting support from a like-minded community, Sunshine Gratitude is here to guide you toward a brighter, more meaningful life—one day at a time.

### Design

![Design image](placeholder.png)

The following are two separate sequence diagrams to explain the core flows. This first diagram depicts the registration and login process as well as what results from a bad log in and an admin log in. 

```mermaid
sequenceDiagram
    participant U as User
    participant B as Browser (React)
    participant S as Server
    participant DB as Database

    alt Login Successful
        S->>B: Return Auth Token
    else Login Failed
        S->>B: Return Error 
    end
```

This next diagram depicts the core flows of a normal user who will post and interact with the community posts. 

```mermaid
sequenceDiagram
    participant U as User
    participant B as Browser (React)
    participant S as Server
    participant DB as Database

    U->>B: Request Landing Page
    B->>S: GET /
    S->>B: Return HTML/CSS/JS

    U->>B: Enter Daily Gratitude (<150 chars)
    B->>S: POST /api/gratitude
    S->>DB: Store New Post
    DB->>S: Acknowledgment
    S->>B: Return Success (Post Visible)

    B->>S: Subscribe to Feed (WebSocket)
    S->>B: Broadcast Real-Time Feed

    U->>B: Click "Heart" on a Post
    B->>S: (WebSocket) Send "heart" action
    S->>B: Broadcast Updated Heart Count

    U->>B: Choose to "Save" Post to Archive
    B->>S: POST /api/archive
    S->>DB: Update Post to Mark as Saved
    DB->>S: Acknowledgment
    S->>B: Return Success (Post Saved)
```


### Key features

- **Secure login over HTTPS** - Users must register and sign in (HTTPS) for protected access 
- **Daily posting** - Once a day, post your gratitude in 150 characters or fewer to unlock the community feed. 
- **Community feed of posts** - See uplifting entries from everyone who posted that day.
- **Real-time heart reactions** - Users can “heart” others’ entries, which updates live for everyone.
- **Streak tracking** - A sun icon shows how many consecutive days you’ve posted. Each new day of posting increases your sun streak count. 
- **Optional gratitude collection** - Save your post to a personal archive or let it expire at day’s end

  
### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Description here
- **CSS** - Description here
- **React** - Description here
- **Service** - Description here
- **DB/Login** - Description here
- **WebSocket** - Description here

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

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
