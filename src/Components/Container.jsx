import React from 'react';

const Container = ({ title, children }) => {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>{title}</h2>
            <div style={styles.content}>
                {children}
            </div>
        </div>
    );
};

const styles = {
    container: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px',
        maxWidth: '600px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    title: {
        marginBottom: '15px',
        fontSize: '1.5em',
        color: '#333',
    },
    content: {
        fontSize: '1em',
        color: '#666',
    }
};

export default Container;
