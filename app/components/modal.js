import Image from 'next/image';
import { useState } from 'react';
import { Box, Button, Typography, Modal, Stack } from '@mui/material';

const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const lineLimit_style = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "5",
    lineClamp: 5,
    WebkitBoxOrient: "vertical"
}

export default function BasicModal(props) {
    const { image_url, name, tagline, srm, abv, description, inFav, inBasket, handleOnClick } = props;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant={'contained'} onClick={handleOpen}>Details</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modal_style}>
                    <Stack direction={'column'} spacing={2} alignItems={'center'}>
                        <Image
                            src={image_url}
                            width={100}
                            height={200}
                            quality={50}
                            style={{ objectFit: "contain" }}
                            alt={`${name} Beer`}
                        />
                        <Typography variant="h6"
                            fontSize={'1rem'}
                            fontWeight={700}
                        >{name}</Typography>
                        <Typography variant="caption"
                            fontSize={'1rem'}
                            fontWeight={600}
                        >{tagline}</Typography>
                        <Typography variant='body1'>{`abv: ${abv}`}</Typography>
                        <Typography variant='body2' sx={{ ...lineLimit_style }}>{description}</Typography>
                        <Typography variant='body1'>{`price: ${srm ? '$' + srm : 'unknown'}`}</Typography>
                        <Stack direction={'row'} spacing={2} justifyContent={'center'} alignItems={'center'}>
                            <Button variant='contained'
                                onClick={() => handleOnClick('inBasket')}>
                                {inBasket ? "Remove" : "Add"}
                            </Button>
                            <Button onClick={() => handleOnClick('inFav')}>
                                {inFav ? 'liked' : 'like'}
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}