import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { App, URLOpenListenerEvent } from '@capacitor/app';


const AppUrlListener: React.FC<any> = () => {
    const history = useHistory();
    useEffect(() => {
      App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        // Example url: https://beerswift.app/tabs/tab2
        // slug = /tabs/tab2
        const slug = event.url.split('.app').pop();
        if (slug) {
          history.push(slug);
        }
        // If no match, do nothing - let regular routing
        // logic take over
      });

      App.addListener('appStateChange', ({ isActive }) => {
        console.log('App state changed. Is active?', isActive);
      });
    }, [history]);
  
    return null;
  };
  
  export default AppUrlListener;