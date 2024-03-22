import React from 'react';
import styles from './login.module.scss';
import { authURL } from '../../services/spotifyApiService';

const Login: React.FC = () => {
    return (
        <div className={styles.login}>
            <div className={styles.background}></div>
            <a href={authURL}><button className={styles.button}>Login with Spotify</button></a>
        </div>
    );
}

export default Login;
