import React, { useEffect, useRef } from 'react';

// eslint-disable-next-line react/prop-types
const CLickAwayListener = ({ children, onClickAway }) => {
	const childrenRef = useRef(null);

	useEffect(() => {
		const handler = (e) => {
			if (childrenRef.current && !childrenRef.current.contains(e.target)) {
				onClickAway();
			}
		};

		window.addEventListener('click', handler);

		return () => {
			window.removeEventListener('click', handler);
		};
	}, []);

	return <div ref={childrenRef}>{children}</div>;
};

export default CLickAwayListener;
