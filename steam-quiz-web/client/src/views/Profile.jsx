import Achievements from '../components/Achievements';
import GamePacks from '../components/GamePacks';
import FriendList from '../components/FriendList';
import FriendForm from '../components/FriendForm';
import Settings from '../components/Settings';
import { useParams } from 'react-router-dom';

const Profile = () => {

    const { user } = useParams();
    return (
        <div>
            <FriendList username={user}/>
            <Achievements username={user}/>
        </div>
    );

}

export default Profile;