"use client";

import { useEffect, useState } from 'react';
import { Container, Stack, Typography, Grid } from '@mui/material';
import AppTab from "./tab";
import AppSelect from './select';
import ArraySort from '../functions/arraySort';
import ModifiedData from '../functions/modifiedData';
import Link from 'next/link';
import Cart from "../components/cart";

const MainUI = ({ pageName, data }) => {

	const modifiedPageName = String(pageName).toLowerCase();
	const [items, setItems] = useState(ModifiedData(data, modifiedPageName));
	const [state, setState] = useState({
		sort: "",
	});

	useEffect(() => {
		if (state.sort) {
			const newSort = state.sort;
			const sortBy = newSort.split(' ')[0];
			const sortReverse = newSort.indexOf('reverse') > -1 ? true : false;
			setItems(
				ArraySort(items, sortBy, sortReverse)
			);
		}
	}, [state.sort]);

	const handleRemove = (id) => {
		if (modifiedPageName !== 'home') {
			const oldItem = items;
			setItems(oldItem.filter(obj => obj.id !== id));
		}
	}

	return (
		<main>
			<Container>
				<Typography variant="h1"
					fontSize={'3rem'}
					textAlign={'center'}
					sx={{ margin: '2rem 0' }}>
					{pageName}
				</Typography>
				<Stack direction={'row'}
					justifyContent={'center'}
					spacing={3}
					alignItems={'center'}
					margin={'0 0 2rem 0'}>
					<AppSelect
						sort={state.sort}
						setSort={(newSort) =>
							setState(prevState =>
								({ ...prevState, sort: newSort }))}
					/>
					<Link href={'/'}>Home</Link>
					<Link href={'/favorites'}>Favorites</Link>
					<Link href={'/basket'}>Basket</Link>
				</Stack>
				{modifiedPageName === 'home' ?
					<AppTab
						sortedData={items}
						handleRemove={(id) => handleRemove(id)}
					/>
					:
					<Grid container spacing={3}>
						{items.length === 0 ?
							<Grid item xs={12}>
								<Typography variant='body1'
									sx={{
										width: '100%',
										height: 'calc(100vh - 17rem)',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>List is empty</Typography>
							</Grid>
							:
							items.map((item) => (
								<Grid item xs={12} sm={6} md={4} key={item.id}>
									<Cart {...item} handleRemove={(id) => handleRemove(id)} />
								</Grid>
							))}
					</Grid>
				}
			</Container>
		</main>
	)
}

export default MainUI;