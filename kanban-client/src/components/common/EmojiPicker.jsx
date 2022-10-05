import Picker from '@emoji-mart/react';
import { Box } from '@mui/material';
import React from 'react';

// eslint-disable-next-line react/prop-types
const EmojiPicker = ({ setIcon, onIconChange }) => {
	return (
		<Box
			sx={{
				position: 'absolute',
				top: '110%',
				left: '10px',
				width: 'max-content',
				zIndex: 100,
			}}
		>
			<Picker
				set="facebook"
				defaultSkin={1}
				color="#0F8FF3"
				theme="dark"
				onEmojiSelect={(emoji) => {
					setIcon(emoji.native);
					onIconChange(emoji.native);
				}}
				enableFrequentEmojiSort
			/>
		</Box>
	);
};

export default EmojiPicker;
