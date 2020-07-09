import * as React from 'react';
import { TaskList } from '../components';

export const Home: React.FC = () => {
    return (
        <div style={{ width: '90%', padding: '50px' }}>
            <TaskList />
        </div>
    );
}



