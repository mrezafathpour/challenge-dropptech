
"use client";

import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box, Tab, Tabs, Grid, } from '@mui/material';
import Cart from "./cart";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>{children}</Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const getFilteredData = (data, filter = '') => {
    return data.filter(obj =>
        obj.food_pairing.some(food => food.toLowerCase().includes(filter))
    );
}

const AppTab = ({ sortedData, handleRemove }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}
                    aria-label="basic tabs example">
                    <Tab label="Matches with all" {...a11yProps(0)} />
                    <Tab label="Matches with pizza" {...a11yProps(1)} />
                    <Tab label="Matches with burger" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Grid container spacing={3}>
                    {sortedData.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Cart {...item} handleRemove={(id) => handleRemove(id)} />
                        </Grid>
                    ))}
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Grid container spacing={3}>
                    {getFilteredData(sortedData, 'pizza').map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Cart {...item} handleRemove={(id) => handleRemove(id)} />
                        </Grid>
                    ))}
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Grid container spacing={3}>
                    {getFilteredData(sortedData, 'burger').map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Cart {...item} handleRemove={(id) => handleRemove(id)} />
                        </Grid>
                    ))}
                </Grid>
            </CustomTabPanel>
        </Box>
    );
}

export default AppTab;