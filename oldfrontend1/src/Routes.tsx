import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home.js';
import NotFound from './containers/NotFound.js';
import Login from './containers/Login.js';
import Signup from './containers/Signup.js';
import NewNote from './containers/NewNote.js';
import Notes from "./containers/Notes.js";
import Settings from './containers/Settings.js';
import AuthenticatedRoute from './components/AuthenticatedRoute.js';
import UnauthenticatedRoute from './components/UnauthenticatedRoute.js';

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
<Route
  path="/login"
  element={
    <UnauthenticatedRoute>
      <Login />
    </UnauthenticatedRoute>
  }
/>
<Route
  path="/signup"
  element={
    <UnauthenticatedRoute>
      <Signup />
    </UnauthenticatedRoute>
  }
/>
<Route
  path="/settings"
  element={
    <AuthenticatedRoute>
      <Settings />
    </AuthenticatedRoute>
  }
/>
<Route
  path="/notes/new"
  element={
    <AuthenticatedRoute>
      <NewNote />
    </AuthenticatedRoute>
  }
/>

<Route
  path="/notes/:id"
  element={
    <AuthenticatedRoute>
      <Notes />
    </AuthenticatedRoute>
  }
/>
      {/* Finally, catch all unmatched routes */}
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}
