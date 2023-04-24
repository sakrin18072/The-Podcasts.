import './App.css';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom'
import PageNotFound from './components/PageNotFound';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import AdminDashboard from './components/Admin/AdminDashboard';
import CreatePodcast from './components/Admin/CreatePodcast';
import CreateEpisode from './components/Admin/CreateEpisode';
import Podcasts from './components/Admin/Podcasts';
import PodcastDetail from './components/Admin/PodcastDetail';
import UserDashboard from './components/User/UserDashboard';
import CreateUserPodcast from './components/User/CreateUserPodcast';
import CreateUserEpisode from './components/User/CreateUserEpisode';
import MyPodcasts from './components/User/MyPodcasts';
import UserPodcastDetail from './components/User/UserPodcastDetail';
import Podcast from './components/Podcast';
import Search from 'antd/es/transfer/search';
import PrivateRoute from './components/PrivateRoutes/PrivateRoute';
import AdminFavourites from './components/Admin/AdminFavourites';
import UserFavourites from './components/User/UserFavourites';
function App() {
  
  return (
    <Routes>
      <Route path='*' element={<PageNotFound/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/dashboard' element = {<PrivateRoute/>}>
        <Route path='admin' element={<AdminDashboard/>}/>
        <Route path='admin/create-podcast' element={<CreatePodcast/>}/>
        <Route path='admin/create-episode' element={<CreateEpisode/>}/>
        <Route path='admin/favourites' element={<AdminFavourites/>}/>
        <Route path='user/favourites' element={<UserFavourites/>}/>
        <Route path='admin/podcasts' element={<Podcasts/>}/>
        <Route path='user' element={<UserDashboard/>}/>
        <Route path='user/create-podcast' element={<CreateUserPodcast/>}/>
        <Route path='user/create-episode' element={<CreateUserEpisode/>}/>
        <Route path='user/podcasts' element={<MyPodcasts/>}/>
      </Route>
      <Route path='/podcast' element = {<PrivateRoute/>}>
        <Route path='admin/:pid' element={<PodcastDetail/>} />
        <Route path='user/:pid' element={<UserPodcastDetail/>} />
      </Route>
      <Route path='/podcasts' element = {<Podcast/>}/>
    </Routes>
  );
}

export default App;
