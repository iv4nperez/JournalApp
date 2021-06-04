import React , { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Switch
} from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { firebase } from "../firebase/firebase-config";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    useEffect( () => {
      
        firebase.auth().onAuthStateChanged(async ( user ) => {
            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
                dispatch( startLoadingNotes( user.uid ) );
                
               
            }else{
                setIsLoggedIn( false );
            }
            
            setChecking( false );
        })

    },[ dispatch, setChecking ]);

    if ( checking ) {
        return (
            <center>
                <h1 style={{marginTop:'40vh'}}> Please wait...</h1>
            </center>
        )
    }

    return (
        <Router>
            <div >
                <Switch>
                    <PublicRoute   
                        path="/auth" 
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    /> 

                    <PrivateRoute 
                        exact
                        isAuthenticated={ isLoggedIn }
                        path="/" 
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login"  />
                </Switch>
            </div>
        </Router>
    )
}