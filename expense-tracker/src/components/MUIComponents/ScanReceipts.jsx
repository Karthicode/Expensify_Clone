import * as React from "react";
import { useDataFromStore } from "../../store/state/StateProvider";
import { actions } from "../../store/actions/actions";
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
//import IconButton from '@mui/material/IconButton';
//import PhotoCamera from '@mui/icons-material/PhotoCamera';
//import Stack from '@mui/material/Stack';
import '../../styles/scss/billPage.scss'
import { Input, CardActions, Typography, CardContent, Card, CardActionArea, CardMedia } from "@mui/material"



export const ReceiptsCard = (props) => {

    const { billTitle, billDetails } = props;
    const [{removeBill}, dispatch] = useDataFromStore();
    const [removeItem, setRemoveItem] = useState(false);

    const handleUploadBill = async (response) => {
        const result = response?.data;
        dispatch({
            type: actions.ADD_NEW_BILL,
            data: result
        })
    }

    const handleDelete = (e) => {
       e.preventDefault();
        dispatch({
            type: actions.REMOVE_BILL,
            removeBill: true
        })
    }


    return (
            <Card className="abc" sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image=""
                        alt="bill image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {billTitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {billDetails}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={handleDelete} size="small" color="primary">
                        Remove
                    </Button>
                </CardActions>
            </Card>
    )
}

