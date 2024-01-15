import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from "@mui/material";
import { RemoveCookie, AddCookie } from '../functions/cookieManager';
import BasicModal from './modal';

const Cart = (props) => {
    const { id, image_url, name, tagline, inFav, inBasket, handleRemove } = props;
    const [state, setState] = useState({
        inFav: inFav ? true : false,
        inBasket: inBasket ? true : false,
    });

    const oneLineLimit_style = {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: "1",
        lineClamp: 1,
        WebkitBoxOrient: "vertical"
    }

    const handleOnClick = (clicked) => {
        const oldStatus = state[clicked];
        setState(prevState => ({ ...prevState, [clicked]: !oldStatus }));

        if (oldStatus) {
            RemoveCookie(clicked, id, clicked === 'inFav' ? 30 : 7);
            handleRemove(id);
        } else {
            AddCookie(clicked, id, clicked === 'inFav' ? 30 : 7);
        }
    }

    useEffect(() => {

    }, [state]);

    return (
        <Box sx={{
            background: "#ededed",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignItems: 'center',
            padding: '1rem',
        }}
            onClick={() => setState(prevState =>
                ({ ...prevState, isModalActive: !prevState.isModalActive }))}
        >
            <Typography variant="h6"
                fontSize={'1rem'}
                fontWeight={700}
                sx={{
                    ...oneLineLimit_style,
                    margin: '0 0 1rem 0',
                }}
            >{name}</Typography>
            <Image
                src={image_url}
                width={50}
                height={200}
                quality={50}
                alt={`${name} Beer`}
            />
            <Typography variant="caption"
                fontSize={'0.75rem'}
                fontWeight={600}
                sx={{
                    ...oneLineLimit_style,
                    margin: '1rem 0',
                }}
            >{tagline}</Typography>
            <Stack direction={'row'} spacing={1}>
                <BasicModal {...props}
                    inFav={state.inFav}
                    inBasket={state.inBasket}
                    handleOnClick={(clicked) => handleOnClick(clicked)}
                />
            </Stack>
        </Box>
    )
}

export default Cart;