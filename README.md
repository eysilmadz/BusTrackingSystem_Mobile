
<p align="center">
<img width="150" height="150" src="https://i.imgur.com/d4Irikd.png">
<h1 align="center">Turkey's Bus Tracking Application: Rota Durak</h1> 
</p>

<h5 align="center">
It has been developed to make urban public transportation systems more integrated and accessible. While providing a user-friendly experience, it allows you to track bus routes, stops, and schedules in real time.
</h5>

<br/>

* [Configuration and Setup](#configuration-and-setup)
* [Key Features](#key-features)
* [Technologies Used](#technologies-used)
    - [Mobile](#mobile)
    - [Backend](#backend)
    - [Database](#database)
* [Running the Project](#running-the-project)
* [How to Contribute](#how-to-contribute)
* [Screenshots](#screenshots)
* [Author](#author)
* [License](#license)

<br/>

## Configuration and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/eysilmadz/BusTrackingSystem_Mobile.git
   cd rota-durak
   ```
   ```bash
   git clone https://github.com/eysilmadz/BusTrackingSystem_Backend.git
   ```

2. **Backend Setup (Spring Boot + Kafka + PostgreSQL via Docker):**

   - Ensure Docker Desktop is running on your machine.
   - Open IntelliJ Terminal inside the backend project directory (e.g. `backend/`).
   - Start required services with Docker Compose:

     ```bash
     docker compose up -d
     ```

   - Check if Kafka and PostgreSQL containers are up:

     ```bash
     docker compose ps
     ```

   - Once Kafka and PostgreSQL are ready, run the backend Spring Boot application via IntelliJ:

     - Use the **Run** option or run main application class.

3. **Frontend Setup (React Native):**

   - Open a terminal in the React Native project root (e.g. `mobile-app/`).
   - Install dependencies (if not done yet):

     ```bash
     npm install
     ```

   - Start the React Native Metro bundler:

     ```bash
     npx react-native start
     ```

   - In a separate terminal, run the app on your emulator or device:

     - For Android:

       ```bash
       npx react-native run-android
       ```

     - For iOS:

       ```bash
       npx react-native run-ios
       ```

> **Important:**  
> Before running the app, run `ipconfig` (Windows) or `ifconfig` (Mac/Linux) to get your machine's IP address.  
> Update the `.env` file in the React Native project root and set:

```bash
API_URL="http://YourIPAddress:port/api"
WS_URL="http://YourIPAddress:port/ws"
GOOGLE_MAPS_API_KEY="YourAPIKey"
```

Replace `YourIPAddress`and `YourAPIKey` with your actual IP address and `port` with the backend WebSocket port (usually 8080 or as configured). Save changes.

<br/>

## Key Features

- 🔐 User registration and login with secure authentication
- 🚌 Real-time bus route and stop tracking using WebSocket
- 🕒 Live schedule updates with Kafka-driven event streaming
- 📍 Interactive map and stop details
- 🔔 Push notifications for route changes and delays
- 🌐 Multi-language support
- 📊 Route statistics and graphical reports
- 📸 Profile photo upload
- 🌙 Dark and light theme options
- ⚡ Offline data caching with AsyncStorage

<br/>

## Technologies Used

### Mobile
---
- [React Native](https://reactnative.dev/) `v0.75.4` – Cross-platform mobile framework
- [React](https://reactjs.org/) `v18.3.1`
- **React Navigation**:
  - [@react-navigation/native](https://reactnavigation.org/) `v6.1.18`
  - [@react-navigation/native-stack](https://reactnavigation.org/docs/native-stack-navigator/) `v6.11.0`
  - [@react-navigation/bottom-tabs](https://reactnavigation.org/docs/bottom-tab-navigator/) `v6.6.1`
  - [@react-navigation/drawer](https://reactnavigation.org/docs/drawer-navigator/) `v6.7.2`
- **WebSocket & STOMP Client**:
  - [@stomp/stompjs](https://www.npmjs.com/package/@stomp/stompjs) `v7.1.1`
  - [sockjs-client](https://www.npmjs.com/package/sockjs-client) `v1.6.1`
- **Networking**:
  - [axios](https://www.npmjs.com/package/axios) `v1.7.7`
- **Storage**:
  - [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/) `v2.1.0`
- **Maps & Location**:
  - [react-native-maps](https://github.com/react-native-maps/react-native-maps) `v1.20.1`
  - [react-native-map-clustering](https://github.com/venits/react-native-map-clustering) `v3.3.1`
  - [react-native-geolocation-service](https://github.com/Agontuk/react-native-geolocation-service) `v5.3.1`
  - [react-native-get-location](https://github.com/gitronald/react-native-get-location) `v5.0.0`
- **Permissions**:
  - [react-native-permissions](https://github.com/zoontek/react-native-permissions) `v5.0.0`
- **Animation & UI**:
  - [lottie-react-native](https://github.com/lottie-react-native/lottie-react-native) `v7.1.0`
  - [lottie-ios](https://github.com/airbnb/lottie-ios) `v3.2.3`
  - [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) `v10.2.0`
- **Date & Time Pickers**:
  - [@react-native-community/datetimepicker](https://github.com/react-native-datetimepicker/datetimepicker) `v8.2.0`
  - [react-native-date-picker](https://github.com/henninghall/react-native-date-picker) `v5.0.12`
- **Utilities**:
  - [date-fns](https://date-fns.org/) `v4.1.0`
  - [formik](https://formik.org/) `v2.4.6`
  - [yup](https://github.com/jquense/yup) `v1.6.1`
  - [react-native-keyboard-controller](https://github.com/kirillzyusko/react-native-keyboard-controller) `v1.14.5`
  - [react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv) `v3.4.11`
  - [@react-native-community/netinfo](https://github.com/react-native-netinfo/react-native-netinfo) `v11.4.1`
- **Others**:
  - [text-encoding](https://www.npmjs.com/package/text-encoding) `v0.7.0`

### Backend
---
- [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Spring Boot](https://spring.io/projects/spring-boot) `v3.4.3` – Backend application framework
- [Spring Web](https://docs.spring.io/spring-framework/reference/web.html) – For RESTful API development
- [Spring WebSocket](https://docs.spring.io/spring-framework/reference/web/websocket.html) – Real-time communication support
- [Spring Kafka](https://spring.io/projects/spring-kafka) – Kafka integration
- [Spring Security](https://spring.io/projects/spring-security) – Authentication and authorization
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa) – ORM for PostgreSQL
- [Spring Validation](https://docs.spring.io/spring-framework/reference/core/validation.html) – Request validation
- [Spring Cache & Redis](https://docs.spring.io/spring-framework/reference/integration/cache.html) – Caching support
- [JWT (jjwt)](https://github.com/jwtk/jjwt) `v0.9.1` – Token-based authentication
- [Lombok](https://projectlombok.org/) `v1.18.24` – Simplified Java code with annotations
- [Apache Commons CSV](https://commons.apache.org/proper/commons-csv/) `v1.9.0` – CSV parsing
- [Univocity Parsers](https://www.univocity.com/pages/parsers-tutorial) `v2.9.1` – High-performance CSV/TSV parser
- [Spring DevTools](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.devtools) – For live reload during development

### Event Streaming
---
- [Apache Kafka](https://kafka.apache.org/) (via Docker Compose) – Used for handling real-time data streams between services

### Containerization & Orchestration
---
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/) – Used to orchestrate Kafka, Zookeeper, and supporting services

### Database
---
- [PostgreSQL](https://www.postgresql.org/) – Relational database used for storing user, route, and trip data

<br/>

## Running the Project

1. Start Docker Desktop.

2. From the backend directory terminal, start Kafka and PostgreSQL:

   ```bash
   docker compose up -d
   ```

3. Verify services are running:

   ```bash
   docker compose ps
   ```

4. Run backend app inside IntelliJ with the run configuration.

5. Start React Native Metro bundler:

   ```bash
   npx react-native start
   ```

6. Launch the mobile app on emulator or device:

   ```bash
   npx react-native run-android
   ```
   or
   ```bash
   npx react-native run-ios
   ```

<br/>

## How to Contribute

Contributions are welcome!

1. Fork the repo.

2. Clone your fork locally.

3. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. Make your changes and commit:

   ```bash
   git add .
   git commit -m "Add your message"
   ```

5. Push to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

6. Open a Pull Request.

<br/>

## Presentation

You can view the project presentation below:

📎 [Download Project Presentation (PPTX)](https://github.com/yourusername/rota-durak/blob/main/presentation/rota-durak-presentation.pptx)

<br/>

## Screenshots

<img src="https://i.imgur.com/h91cVar.png" width="270" alt="Splash Screen" /> &nbsp;
<img src="https://i.imgur.com/DK5gyee.png" width="270" alt="Permission Screen" /> &nbsp;
<img src="https://i.imgur.com/rGyY2xF.png" width="270" alt="Home" /> &nbsp;
<img src="https://i.imgur.com/cAXjRiI.png" width="270" alt="Route" /> &nbsp;
<img src="https://i.imgur.com/AX622Gf.png" width="270" alt="RouteDetail" /> &nbsp;
<img src="https://i.imgur.com/WDnKrdT.png" width="270" alt="movement" /> &nbsp;
<img src="https://i.imgur.com/ZN4DUVb.png" width="270" alt="Login" /> &nbsp;
<img src="https://i.imgur.com/AvUSpUD.png" width="270" alt="Register" /> &nbsp;
<img src="https://i.imgur.com/P5KnYUX.png" width="270" alt="Profile" /> &nbsp;
<img src="https://i.imgur.com/VH8acbH.png" width="270" alt="favRoute" /> &nbsp;
<img src="https://i.imgur.com/lI2gnSQ.png" width="270" alt="favStop" /> &nbsp;
<img src="https://i.imgur.com/8ODb0jF.png" width="270" alt="PopPlace" /> &nbsp;
<img src="https://i.imgur.com/OmLQEqo.png" width="270" alt="howtoget" /> &nbsp;
<img src="https://i.imgur.com/COxUju6.png" width="270" alt="planner" /> &nbsp;
<img src="https://i.imgur.com/BeWJbyD.png" width="270" alt="cardReload" /> &nbsp;
<img src="https://i.imgur.com/tTF6JUt.png" width="270" alt="bankpage" /> &nbsp;
<img src="https://i.imgur.com/RAuzSX0.png" width="270" alt="mappage" /> &nbsp;
<img src="https://i.imgur.com/Ank1dEN.png" width="270" alt="drawer" /> &nbsp;
<img src="https://i.imgur.com/UjAjkuZ.png" width="270" alt="drawer1" /> &nbsp;
<img src="https://i.imgur.com/b82NO9U.png" width="270" alt="drawer2" /> &nbsp;
<img src="https://i.imgur.com/CnKAGQm.png" width="270" alt="drawer3" /> &nbsp;
<img src="https://i.imgur.com/BYT8h6V.png" width="270" alt="drawer4" /> &nbsp;
<br/>

## Author

- Github: [@eysilmadz](https://github.com/eysilmadz)  
- Linkedin: [Eysilmadz](https://linkedin.com/in/eysilmadz)  
- Email: [ceng.esmayildiz@gmail.com](mailto:ceng.esmayildiz@gmail.com)  

<br/>

## License

```
© Copyright 2025 Esma Yıldız
```
---

<p align="center">
ROTA DURAK
</p>

<p align="center">
  <a href="#configuration-and-setup">Configuration and Setup</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#technologies-used">Technologies Used</a> •
  <a href="#running-the-project">Running the Project</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#author">Author</a> •
  <a href="#license">License</a>
</p>

<p align="center">🌟 Don't forget to ⭐ star the repository! 🌟</p>
