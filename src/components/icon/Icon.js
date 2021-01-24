import React from 'react';
import PropTypes from 'prop-types';

const icons = {
    'cross': 'M15 5L5 15 M5 5L15 15',
    'arrow': 'M4.16663 10H15.8333 M10 4.16667L15.8333 10L10 15.8333',
};

const Icon = (props) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d={icons[props.icon]}></path>
    </svg>
);

Icon.propTypes = {
     icon: PropTypes.string.isRequired,
};

export default Icon;