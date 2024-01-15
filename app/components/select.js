
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AppSelect = ({ sort, setSort }) => {
	const handleChange = (event) => {
		setSort(event.target.value);
	};

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Sort by</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={sort}
					label="Sort by"
					onChange={handleChange}
				>
					<MenuItem value={'name'}>name</MenuItem>
					<MenuItem value={'name reverse'}>reverse name</MenuItem>
					<MenuItem value={'abv'}>abv</MenuItem>
					<MenuItem value={'abv reverse'}>reverse abv</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}

export default AppSelect;